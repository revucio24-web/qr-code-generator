# -*- coding: utf-8 -*-
"""Statischer Tiefencheck: Links, Manifest, Uebersetzungen, Labels, externe Quellen."""

import io
import json
import os
import re
import urllib.parse

fehler = []
warnung = []


def lies(p):
    return io.open(p, encoding='utf-8').read()


index = lies('index.html')
priv = lies('datenschutz.html')
kontakt = lies('kontakt.html')
i18n = lies('i18n.js')
manifest = json.loads(lies('manifest.json'))

SEITEN = (('index.html', index), ('datenschutz.html', priv), ('kontakt.html', kontakt))

# ---------------------------------------------------------------- 1. Links
print('== 1. Links ==')
for name, html in SEITEN:
    for href in re.findall(r'href="([^"]+)"', html):
        if href.startswith('data:') or '${' in href:
            continue
        if href.startswith('#'):
            continue
        if href.startswith('http'):
            if 'target="_blank"' in html:
                pass
            continue
        if href.startswith('mailto:'):
            adresse = href[7:]
            if '@' not in adresse or ' ' in adresse:
                fehler.append('kaputte mailto: ' + href)
            continue

        ziel, _, anker = href.partition('#')
        ziel = ziel.split('?')[0]
        if ziel and not os.path.exists(ziel):
            fehler.append('%s -> fehlende Datei: %s' % (name, href))
        if anker and ziel:
            inhalt = lies(ziel)
            if 'id="%s"' % anker not in inhalt:
                fehler.append('%s -> Anker #%s fehlt in %s' % (name, anker, ziel))
        print('  ok:', name, '->', href)

# alle <a> mit target=_blank brauchen rel=noopener
for name, html in SEITEN:
    for tag in re.findall(r'<a [^>]*>', html):
        if 'target="_blank"' in tag and 'noopener' not in tag:
            fehler.append('%s: target=_blank ohne rel=noopener -> %s' % (name, tag[:70]))

# ---------------------------------------------------------------- 2. Manifest
print('\n== 2. Manifest ==')
for feld in ('name', 'short_name', 'id', 'start_url', 'scope', 'display',
             'theme_color', 'background_color', 'icons', 'lang'):
    if feld not in manifest:
        fehler.append('Manifest: Pflichtfeld fehlt: ' + feld)

for icon in manifest['icons']:
    if not os.path.exists(icon['src']):
        fehler.append('Icon fehlt: ' + icon['src'])
        continue
    try:
        from PIL import Image
        im = Image.open(icon['src'])
        soll = icon['sizes']
        if '%dx%d' % im.size != soll:
            fehler.append('Icon %s ist %dx%d, angegeben %s' % (icon['src'], im.size[0], im.size[1], soll))
        else:
            print('  ok:', icon['src'], soll, icon['purpose'])
    except ImportError:
        pass

for shot in manifest.get('screenshots', []):
    if not os.path.exists(shot['src']):
        fehler.append('Screenshot fehlt: ' + shot['src'])
        continue
    from PIL import Image
    im = Image.open(shot['src'])
    if '%dx%d' % im.size != shot['sizes']:
        fehler.append('Screenshot %s ist %dx%d, angegeben %s'
                      % (shot['src'], im.size[0], im.size[1], shot['sizes']))
    else:
        print('  ok:', shot['src'], shot['sizes'], shot['form_factor'])

if not any(s['form_factor'] == 'narrow' for s in manifest.get('screenshots', [])):
    warnung.append('kein Hochformat-Screenshot (PWABuilder empfiehlt mindestens einen)')

for sc in manifest.get('shortcuts', []):
    url = sc['url'].split('?')[-1]
    if not url.startswith('type='):
        fehler.append('Shortcut ohne type-Parameter: ' + sc['url'])
    print('  ok: Shortcut', sc['url'])

# ---------------------------------------------------------------- 3. i18n
print('\n== 3. Uebersetzungen ==')
print('  separat geprueft durch _i18ncheck.js (exakte Auswertung der Sprachdatei)')

# ---------------------------------------------------------------- 4. Externe Quellen
print('\n== 4. Externe Ressourcen ==')
extern = []
for name, html in SEITEN:
    for tag in re.findall(r'<(?:script|link|img|iframe|source)[^>]*>', html):
        for url in re.findall(r'(?:src|href)="(https?://[^"]+)"', tag):
            extern.append('%s: %s' % (name, url))
if extern:
    fehler.append('externe Ressource(n): ' + '; '.join(extern))
else:
    print('  ok: keine externen Skripte, Styles, Bilder oder Schriften')

if re.search(r'\beval\s*\(', index):
    fehler.append('eval() im Code')

# ---------------------------------------------------------------- 5. Formularfelder
print('\n== 5. Formularfelder ==')
ids = re.findall(r'<(?:input|select|textarea)[^>]*id="([^"]+)"', index)
ohne = []
for feld_id in ids:
    if feld_id in ('logoFile', 'batchFile'):
        if 'for="%s"' % feld_id not in index:
            ohne.append(feld_id)
        continue
    if ('for="%s"' % feld_id) not in index and ('aria-label' not in
            (re.search(r'<[^>]*id="%s"[^>]*>' % feld_id, index) or [''])[0]):
        ohne.append(feld_id)
if ohne:
    fehler.append('Feld(er) ohne Beschriftung: ' + ', '.join(ohne))
else:
    print('  ok: alle', len(ids), 'Felder haben eine Beschriftung oder ein aria-label')

# ---------------------------------------------------------------- 6. Struktur
print('\n== 6. Struktur ==')
for name, html in SEITEN:
    if html.count('<div') != html.count('</div>'):
        fehler.append('%s: <div> unausgeglichen (%d/%d)' % (name, html.count('<div'), html.count('</div>')))
    if html.count('{') != html.count('}'):
        warnung.append('%s: geschweifte Klammern %d/%d' % (name, html.count('{'), html.count('}')))
    if '\ufeff' in html:
        fehler.append('%s: BOM gefunden' % name)
    if 'Ã' in html or 'â€' in html:
        fehler.append('%s: Mojibake gefunden' % name)
print('  ok: Struktur geprueft')

# ---------------------------------------------------------------- Ergebnis
print('\n===== ERGEBNIS =====')
if fehler:
    print('FEHLER (%d):' % len(fehler))
    for f in fehler:
        print('  ✗', f)
else:
    print('  keine Fehler')

if warnung:
    print('HINWEISE (%d):' % len(warnung))
    for w in warnung:
        print('  !', w)
