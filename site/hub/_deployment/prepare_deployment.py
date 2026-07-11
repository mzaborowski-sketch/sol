#!/usr/bin/env python3
"""Prepare the static website for a specific public domain.
Usage: python _deployment/prepare_deployment.py --base-url https://hub.twoja-domena.pl
Uses only the Python standard library.
"""
from pathlib import Path
from urllib.parse import urljoin
import argparse, html, re

ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    'index.html','koalicja.html','hub.html','life.html','grupy.html','wspolpraca.html','kontakt.html','prywatnosc.html','dostepnosc.html',
    'en/index.html','en/coalition.html','en/hub.html','en/life.html','en/working-groups.html','en/cooperation.html','en/contact.html','en/privacy.html','en/accessibility.html'
]

def public_path(rel: str) -> str:
    if rel == 'index.html': return '/'
    if rel == 'en/index.html': return '/en/'
    return '/' + rel

def normalise_index_url(url: str) -> str:
    if url.endswith('/en/index.html'):
        return url[:-len('index.html')]
    if url.endswith('/index.html'):
        return url[:-len('index.html')]
    return url

ap = argparse.ArgumentParser()
ap.add_argument('--base-url', required=True, help='Public base URL, e.g. https://hub.twoja-domena.pl')
args = ap.parse_args()
base = args.base_url.rstrip('/') + '/'

urls=[]
for rel in PAGES:
    path=ROOT/rel
    text=path.read_text(encoding='utf-8')
    page_url=urljoin(base, public_path(rel).lstrip('/'))
    urls.append(page_url)
    canonical=f'<link rel="canonical" href="{html.escape(page_url, quote=True)}">'
    if re.search(r'<link\s+rel="canonical"[^>]*>', text):
        text=re.sub(r'<link\s+rel="canonical"[^>]*>', canonical, text, count=1)
    else:
        text=text.replace('</title>', '</title>\n'+canonical, 1)
    # Make hreflang links absolute, resolving them from the current public page URL.
    def repl(m):
        before, href, after=m.group(1),m.group(2),m.group(3)
        return before + html.escape(normalise_index_url(urljoin(page_url, href)), quote=True) + after
    text=re.sub(r'(<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href=")([^"]+)("[^>]*>)', repl, text)
    path.write_text(text,encoding='utf-8')

sitemap=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for url in urls: sitemap.append(f'  <url><loc>{html.escape(url)}</loc></url>')
sitemap.append('</urlset>')
(ROOT/'sitemap.xml').write_text('\n'.join(sitemap)+'\n',encoding='utf-8')
(ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {urljoin(base,"sitemap.xml")}\n',encoding='utf-8')
print(f'Prepared {len(PAGES)} pages for {base}')
