// scripts/sync-notion-docs.mjs
// Regenerates docs/*.md from source + upserts to Notion on merge to main.
// Env: NOTION_API_KEY, NOTION_PARENT_PAGE_ID
// Run: node scripts/sync-notion-docs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

const parentPageId = process.env.NOTION_PARENT_PAGE_ID || '3d7cee05-b4c6-805e-bba9-f17ecf12c0d4';
const apiKey = process.env.NOTION_API_KEY || '';

function sh(cmd) {
  try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8' }).trim(); }
  catch { return ''; }
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; }
}

// --- 1. Collect live project facts ---
const pkg = readJson(path.join(ROOT, 'package.json'));
const meta = readJson(path.join(ROOT, 'metadata.json'));
const sha = sh('git rev-parse --short HEAD') || 'local';
const log = sh('git log --oneline -8') || 'no git history';
const indexStat = fs.existsSync(path.join(ROOT, 'index.html'))
  ? fs.statSync(path.join(ROOT, 'index.html')).size : 0;
const date = new Date().toISOString().slice(0, 10);
const footer = `\n\n_Last synced: ${date} UTC from \`main@${sha}\` via GitHub Actions_`;

function withFooter(file) {
  const p = path.join(DOCS_DIR, file);
  if (!fs.existsSync(p)) return null;
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(/\n_Last synced:.*$/m, '').trim() + '\n' + footer + '\n';
  fs.writeFileSync(p, txt);
  return txt;
}

// Refresh footers (keeps docs versioned in git)
const files = [
  '01-overview.md',
  '02-architecture.md',
  '03-features.md',
  '04-environment.md',
  '05-setup-deployment.md',
  '06-auto-sync.md',
];
const titleMap = {
  '01-overview.md': '01 Overview & Quickstart',
  '02-architecture.md': '02 Architecture & Voxel Engine',
  '03-features.md': '03 Features - Views, Actions, Flight',
  '04-environment.md': '04 Environment - Carrier and Runway',
  '05-setup-deployment.md': '05 Setup, Dev and Deployment',
  '06-auto-sync.md': '06 Auto-Sync - GitHub Actions to Notion',
};

console.log(`Project: ${meta.name || pkg.name} | sha=${sha} | index.html=${indexStat}B`);
console.log('Recent commits:\n' + log);

const contents = {};
for (const f of files) {
  const txt = withFooter(f);
  if (txt) contents[f] = txt;
}

// --- 2. Push to Notion (skip if no key, e.g. local run) ---
if (!apiKey) {
  console.log('NOTION_API_KEY missing — docs regenerated locally only. Set repo secrets to push to Notion.');
  process.exit(0);
}

async function notion(pathname, method = 'GET', body) {
  const res = await fetch(`${NOTION_API}${pathname}`, {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Notion ${method} ${pathname} ${res.status}: ${t.slice(0, 500)}`);
  }
  return res.json();
}

// Markdown -> Notion blocks (simple: headings, bullets, code, paragraphs, chunked at 2000 chars)
function mdToBlocks(md) {
  const blocks = [];
  const lines = md.split('\n');
  let codeBuf = null;
  for (const line of lines) {
    const codeFence = line.trim().startsWith('```');
    if (codeFence) {
      if (codeBuf === null) { codeBuf = []; }
      else {
        blocks.push({
          object: 'block', type: 'code',
          code: { language: 'plain text', rich_text: [{ type: 'text', text: { content: codeBuf.join('\n').slice(0, 1900) } }] },
        });
        codeBuf = null;
      }
      continue;
    }
    if (codeBuf !== null) { codeBuf.push(line); continue; }
    if (line.startsWith('# ')) blocks.push({ object: 'block', type: 'heading_1', heading_1: { rich_text: [{ type: 'text', text: { content: line.slice(2).slice(0, 2000) } }] } });
    else if (line.startsWith('## ')) blocks.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: line.slice(3).slice(0, 2000) } }] } });
    else if (line.startsWith('### ')) blocks.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: line.slice(4).slice(0, 2000) } }] } });
    else if (/^[-*] /.test(line)) blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.slice(2).slice(0, 2000) } }] } });
    else if (/^\d+\. /.test(line)) blocks.push({ object: 'block', type: 'numbered_list_item', numbered_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\. /, '').slice(0, 2000) } }] } });
    else if (line.trim() === '' || line.trim() === '---') continue;
    else if (line.trim().startsWith('>')) blocks.push({ object: 'block', type: 'quote', quote: { rich_text: [{ type: 'text', text: { content: line.replace(/^>\s?/, '').slice(0, 2000) } }] } });
    else blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: line.slice(0, 2000) } }] } });
  }
  return blocks.slice(0, 100);
}

for (const [file, title] of Object.entries(titleMap)) {
  const md = contents[file];
  if (!md) continue;
  // Search existing child by title under parent
  const search = await notion('/search', 'POST', {
    query: title, filter: { property: 'object', value: 'page' }, page_size: 10,
  });
  let target = (search.results || []).find(r =>
    r?.properties?.title?.title?.[0]?.plain_text === title ||
    r?.properties?.title?.title?.map(t => t.plain_text).join('') === title);

  if (!target) {
    console.log(`Creating Notion page: ${title}`);
    target = await notion('/pages', 'POST', {
      parent: { page_id: parentPageId },
      properties: { title: { title: [{ text: { content: title } }] } },
    });
  } else {
    console.log(`Updating Notion page: ${title} (${target.id})`);
  }
  // Replace content: fetch existing blocks, delete, append new
  const existing = await notion(`/blocks/${target.id}/children?page_size=100`);
  for (const b of existing.results || []) {
    try { await notion(`/blocks/${b.id}`, 'DELETE'); } catch {}
  }
  const newBlocks = mdToBlocks(md);
  for (let i = 0; i < newBlocks.length; i += 50) {
    await notion(`/blocks/${target.id}/children`, 'PATCH', { children: newBlocks.slice(i, i + 50) });
  }
}

console.log('Notion sync complete.');
