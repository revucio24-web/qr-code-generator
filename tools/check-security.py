# -*- coding: utf-8 -*-
"""Sicherheits-Schnellpruefung fuer Revu QR (read-only)."""

import io
import os
import re

DATEIEN = ['index.html', 'i18n.js', 'datenschutz.html', 'kontakt.html', 'sw.js', 'manifest.json',
           'tools/check-i18n.js', 'tools/check-links.py']
CODE = [f for f in DATEIEN if f.endswith(('.html', '.js', '.py'))]

befund = []
hinweis = []

print('== 1. Zugangsdaten im Repo ==')
MUSTER = {
    'API-Key/Token': r'(api[_-]?key|secret|token|bearer)\s*[:=]\s*["\'][A-Za-z0-9_\-]{16,}',
    'AWS': r'AKIA[0-9A-Z]{16}',
    'GitHub-Token': r'gh[pousr]_[A-Za-z0-9]{20,}',
    'Private Key': r'BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY',
    'Passwort-Zuweisung': r'(password|passwd|pwd)\s*[:=]\s*["\'][^"\'\n]{6,}["\']',
    'E-Mail-Klartext': r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',
}
for f in DATEIEN:
    if not os.path.exists(f):
        continue
    text = io.open(f, encoding='utf-8').read()
    for name, muster in MUSTER.items():
        for treffer in re.findall(muster, text, re.IGNORECASE):
            if name == 'E-Mail-Klartext':
                continue  # gewollt: Kontaktadresse
            wert = str(treffer)
            # Beschriftungen wie 'Password:' sind keine Zugangsdaten
            if name == 'Passwort-Zuweisung' and wert.rstrip().endswith(':'):
                continue
            befund.append('%s: moeglicher %s -> %s' % (f, name, wert[:40]))
print('  geprueft:', len(DATEIEN), 'Dateien')
print('  Klartext-E-Mail (gewollt):', sum(
    len(re.findall(MUSTER['E-Mail-Klartext'], io.open(f, encoding='utf-8').read()))
    for f in DATEIEN if os.path.exists(f)), 'Vorkommen')

print('== 2. Gefaehrliche Konstrukte ==')
ERLAUBT = ('tools/',)  # Entwicklerwerkzeuge, werden von der App nicht geladen
for f in CODE:
    if f.startswith(ERLAUBT):
        continue
    text = io.open(f, encoding='utf-8').read()
    for name, muster in {
        'eval()': r'\beval\s*\(',
        'new Function': r'new\s+Function\s*\(',
        'document.write': r'document\.write',
        'srcdoc': r'srcdoc',
        'setTimeout(String)': r'setTimeout\s*\(\s*["\']',
    }.items():
        for treffer in re.findall(muster, text):
            befund.append('%s: %s -> %s' % (f, name, str(treffer)[:50]))

# http:// nur melden, wenn es eine echte Adresse ist (XML-Namensraeume zaehlen nicht)
for f in CODE:
    text = io.open(f, encoding='utf-8').read()
    for treffer in re.findall(r'http://[^\s"\'<>),]+', text):
        if treffer.startswith('http://www.w3.org/'):
            continue
        befund.append('%s: unverschluesselte Adresse -> %s' % (f, treffer[:50]))
print('  geprueft:', len(CODE), 'Dateien (ohne tools/)')

print('\n== 3. innerHTML / HTML-Injektion ==')
for f in CODE:
    text = io.open(f, encoding='utf-8').read()
    zeilen = text.split('\n')
    for i, zeile in enumerate(zeilen, 1):
        if 'innerHTML' in zeile:
            print('  %s:%d  %s' % (f, i, zeile.strip()[:95]))

print('\n== 4. Netzwerkziele im Code ==')
alle = ''
for f in CODE:
    alle += io.open(f, encoding='utf-8').read()
ziele = set(re.findall(r'https?://[^\s"\'<>)]+', alle))
for z in sorted(ziele):
    print('  ', z)

print('\n== 5. localStorage ==')
for f in CODE:
    text = io.open(f, encoding='utf-8').read()
    for treffer in set(re.findall(r'localStorage\.\w+\(([^)]*)\)', text)):
        print('  %s: %s' % (f, treffer.strip()[:60]))

print('\n== 6. Fremdherkunft im Service Worker ==')
sw = io.open('sw.js', encoding='utf-8').read()
if 'url.origin !== self.location.origin' in sw:
    print('  ok: fremde Herkuenfte werden nicht abgefangen')
else:
    befund.append('Service Worker prueft die Herkunft nicht')

print('\n===== ERGEBNIS =====')
if befund:
    print('BEFUNDE (%d):' % len(befund))
    for b in befund:
        print('  ✗', b)
else:
    print('  keine sicherheitsrelevanten Befunde')
