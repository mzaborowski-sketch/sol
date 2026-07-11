#!/usr/bin/env python3
"""Build the static PL/EN website without external dependencies.
Run from the project root: python _source/build.py
"""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parent.parent
SRC=ROOT/'_source'
PAGES=json.loads((SRC/'site.json').read_text(encoding='utf-8'))

NAV={
 'pl':[('home','Strona główna','index.html'),('coalition','Koalicja','koalicja.html'),('hub','Polski Hub','hub.html'),('life','Projekt LIFE','life.html'),('groups','Grupy robocze','grupy.html'),('cooperation','Współpraca','wspolpraca.html'),('contact','Kontakt','kontakt.html')],
 'en':[('home','Home','index.html'),('coalition','Coalition','coalition.html'),('hub','Polish Hub','hub.html'),('life','LIFE Project','life.html'),('groups','Working Groups','working-groups.html'),('cooperation','Cooperation','cooperation.html'),('contact','Contact','contact.html')]
}
LABELS={
 'pl':{
  'brand':'Polski Hub Finansowania Efektywności Energetycznej','secretariat':'Sekretariat: KAPE S.A.','skip':'Przejdź do treści','open':'Otwórz menu','close':'Zamknij menu','mainnav':'Nawigacja główna','language':'Wybór języka','home':'Strona główna','onpage':'Na tej stronie','back':'Do góry','breadcrumb':'Okruszki nawigacyjne',
  'footer_secretariat':'Sekretariat Polskiego Hubu','footer_nav':'Nawigacja','footer_sources':'Oficjalne źródła','footer_info':'Informacje o serwisie','privacy':'Prywatność','accessibility':'Dostępność',
  'disclaimer':'Projekt współfinansowany przez Unię Europejską w ramach programu LIFE. Wyrażone poglądy i opinie są wyłącznie poglądami autorów i nie muszą odzwierciedlać stanowiska Unii Europejskiej ani CINEA. Ani Unia Europejska, ani instytucja przyznająca finansowanie nie ponoszą za nie odpowiedzialności.'
 },
 'en':{
  'brand':'Polish Energy Efficiency Financing Hub','secretariat':'Secretariat: KAPE S.A.','skip':'Skip to content','open':'Open menu','close':'Close menu','mainnav':'Main navigation','language':'Language selection','home':'Home','onpage':'On this page','back':'Back to top','breadcrumb':'Breadcrumbs',
  'footer_secretariat':'Polish Hub Secretariat','footer_nav':'Navigation','footer_sources':'Official sources','footer_info':'Website information','privacy':'Privacy','accessibility':'Accessibility',
  'disclaimer':'Co-funded by the European Union under the LIFE programme. Views and opinions expressed are, however, those of the authors only and do not necessarily reflect those of the European Union or CINEA. Neither the European Union nor the granting authority can be held responsible for them.'
 }
}

def rel_prefix(out):
    return '../' if out.startswith('en/') else ''

def relative_to_current(target_out,current_out):
    if current_out.startswith('en/'):
        if target_out.startswith('en/'):
            return target_out[3:]
        return '../'+target_out
    if target_out.startswith('en/'):
        return target_out
    return target_out

def head(meta,pair):
    prefix=rel_prefix(meta['out'])
    pl=PAGES[pair]['out'] if PAGES[pair]['lang']=='pl' else meta['out']
    en=PAGES[pair]['out'] if PAGES[pair]['lang']=='en' else meta['out']
    pl_href=relative_to_current(pl,meta['out'])
    en_href=relative_to_current(en,meta['out'])
    title=meta['title']; desc=meta['desc']
    return f'''<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#ffffff">
<meta name="color-scheme" content="light">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">
<title>{title}</title>
<link rel="alternate" hreflang="pl" href="{pl_href}">
<link rel="alternate" hreflang="en" href="{en_href}">
<link rel="alternate" hreflang="x-default" href="{pl_href}">
<link rel="icon" href="{prefix}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="{prefix}assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="{prefix}assets/css/main.css">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="twitter:card" content="summary">
<script src="{prefix}assets/js/main.js" defer></script>
</head>'''

def header(meta,pid):
    lang=meta['lang']; L=LABELS[lang]; prefix=rel_prefix(meta['out'])
    links=[]
    for key,label,href in NAV[lang]:
        cls=' class="active"' if key==meta['key'] else ''
        current=' aria-current="page"' if key==meta['key'] else ''
        links.append(f'<a{cls}{current} href="{href}">{label}</a>')
    pair=PAGES[meta['pair']]
    pair_href=relative_to_current(pair['out'],meta['out'])
    self_href=meta['out'][3:] if meta['out'].startswith('en/') else meta['out']
    if lang=='pl':
        pl=f'<a class="active" aria-current="true" aria-label="Polski — aktywny język" href="{self_href}"><span class="flag flag-pl" aria-hidden="true"></span><span class="visually-hidden">Polski</span></a>'
        en=f'<a aria-label="English" href="{pair_href}" lang="en"><span class="flag flag-gb" aria-hidden="true"></span><span class="visually-hidden">English</span></a>'
    else:
        pl=f'<a aria-label="Polski" href="{pair_href}" lang="pl"><span class="flag flag-pl" aria-hidden="true"></span><span class="visually-hidden">Polski</span></a>'
        en=f'<a class="active" aria-current="true" aria-label="English — active language" href="{self_href}"><span class="flag flag-gb" aria-hidden="true"></span><span class="visually-hidden">English</span></a>'
    return f'''<a class="skip" href="#main">{L['skip']}</a>
<div class="topline" aria-hidden="true"></div>
<header class="header">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="{L['brand']} — {L['home']}">
      <span aria-hidden="true" class="brand-mark"></span>
      <span class="brand-text"><strong>{L['brand']}</strong><span>{L['secretariat']}</span></span>
    </a>
    <button type="button" aria-expanded="false" aria-controls="main-nav" aria-label="{L['open']}" data-label-open="{L['open']}" data-label-close="{L['close']}" class="menu-btn"><span></span></button>
    <nav id="main-nav" aria-label="{L['mainnav']}" class="nav">{''.join(links)}<span class="lang" role="group" aria-label="{L['language']}">{pl}{en}</span></nav>
  </div>
</header>'''

def breadcrumbs(meta):
    if meta['key']=='home': return ''
    L=LABELS[meta['lang']]
    page_name={'pl':{'coalition':'Koalicja','hub':'Polski Hub','life':'Projekt LIFE','groups':'Grupy robocze','cooperation':'Współpraca','contact':'Kontakt','privacy':'Prywatność','accessibility':'Dostępność'},'en':{'coalition':'Coalition','hub':'Polish Hub','life':'LIFE Project','groups':'Working Groups','cooperation':'Cooperation','contact':'Contact','privacy':'Privacy','accessibility':'Accessibility'}}[meta['lang']][meta['key']]
    return f'<nav class="breadcrumbs" aria-label="{L["breadcrumb"]}"><ol><li><a href="index.html">{L["home"]}</a></li><li aria-current="page">{page_name}</li></ol></nav>'

def inpage(meta):
    if meta['key']=='home' or not meta.get('toc'): return ''
    L=LABELS[meta['lang']]
    links=''.join(f'<a href="#{x["id"]}">{x["label"]}</a>' for x in meta['toc'])
    return f'<div class="inpage-wrap"><nav class="inpage" aria-label="{L["onpage"]}"><strong>{L["onpage"]}:</strong>{links}</nav></div>'

def footer(meta):
    lang=meta['lang']; L=LABELS[lang]
    navlinks=''.join(f'<li><a href="{href}">{label}</a></li>' for _,label,href in NAV[lang])
    if lang=='pl':
        privacy='prywatnosc.html'; access='dostepnosc.html'; kape='https://kape.gov.pl/'; kape_label='KAPE S.A.'
    else:
        privacy='privacy.html'; access='accessibility.html'; kape='https://kape.gov.pl/about-us'; kape_label='KAPE S.A.'
    return f'''<footer class="footer">
  <div class="footer-grid">
    <div><h2>{L['footer_secretariat']}</h2><p><strong>Krajowa Agencja Poszanowania Energii S.A. (KAPE)</strong></p><p>{L['disclaimer']}</p></div>
    <div><h2>{L['footer_nav']}</h2><ul>{navlinks}</ul></div>
    <div><h2>{L['footer_sources']}</h2><ul><li><a href="https://energy.ec.europa.eu/topics/energy-efficiency/financing/european-energy-efficiency-financing-coalition_en" lang="en">European Energy Efficiency Financing Coalition</a></li><li><a href="https://cinea.ec.europa.eu/programmes/life/clean-energy-transition_en" lang="en">LIFE Clean Energy Transition</a></li><li><a href="{kape}">{kape_label}</a></li></ul><h2 class="footer-subhead">{L['footer_info']}</h2><ul><li><a href="{privacy}">{L['privacy']}</a></li><li><a href="{access}">{L['accessibility']}</a></li></ul></div>
  </div>
  <div class="footer-bottom"><small>EEFINH · LIFE24-CET-EEFINH · 101250182</small><small>© KAPE S.A.</small></div>
</footer>
<button type="button" aria-label="{L['back']}" aria-hidden="true" tabindex="-1" class="backtop"><span aria-hidden="true">↑</span></button>'''

def build_page(pid,meta):
    body=(SRC/'content'/f'{pid}.html').read_text(encoding='utf-8')
    # Add breadcrumb inside page hero
    crumb=breadcrumbs(meta)
    if crumb:
        needle='<section class="page-hero"><div class="container">'
        body=body.replace(needle,needle+crumb,1)
    # Add in-page navigation after the page hero
    ip=inpage(meta)
    if ip:
        end=body.find('</section>')
        if end!=-1:
            end+=len('</section>')
            body=body[:end]+ip+body[end:]
    html=f'''<!doctype html>
<html lang="{meta['lang']}">
{head(meta,meta['pair'])}
<body>
{header(meta,pid)}
<main id="main" tabindex="-1">{body}</main>
{footer(meta)}
</body>
</html>'''
    out=ROOT/meta['out']; out.parent.mkdir(parents=True,exist_ok=True); out.write_text(html,encoding='utf-8')

for pid,meta in PAGES.items():
    build_page(pid,meta)
print(f'Built {len(PAGES)} pages')

# Build a lightweight bilingual 404 page.
meta404={'out':'404.html','lang':'pl','key':'404','title':'Nie znaleziono strony | Polski Hub','desc':'Nie znaleziono wskazanej strony.','pair':'en-home'}
body404='''<section class="page-hero"><div class="container"><div class="eyebrow">Błąd 404 · Page not found</div><h1>Nie znaleziono strony</h1><p class="lead">Sprawdź adres albo przejdź do strony głównej. You can also continue in English.</p><div class="buttons"><a class="btn primary" href="index.html">Strona główna</a><a class="btn secondary" href="en/index.html" lang="en">English home</a></div></div></section>'''
html404=f'''<!doctype html><html lang="pl">{head(meta404,'en-home')}<body>{header(meta404,'404')}<main id="main" tabindex="-1">{body404}</main>{footer(meta404)}</body></html>'''
(ROOT/'404.html').write_text(html404,encoding='utf-8')
print('Built 404 page')
