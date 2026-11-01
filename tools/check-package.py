# -*- coding: utf-8 -*-
"""Prueft das MSIX-Paket so, wie es Windows vor der Installation tut:
Blockmap-Hashes, Pflichtdateien, Manifest-Verweise."""

import base64
import hashlib
import io
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

PAKET = 'Revu QR.msixbundle'
fehler = []
ok = []

BUNDLE_NS = '{http://schemas.microsoft.com/appx/2013/bundle}'
BLOCK_NS = '{http://schemas.microsoft.com/appx/2010/blockmap}'


def blockmap_pruefen(appx_bytes, name):
    """Rechnet die SHA-256-Hashes der Blockmap nach."""
    z = zipfile.ZipFile(io.BytesIO(appx_bytes))
    if 'AppxBlockMap.xml' not in z.namelist():
        fehler.append('%s: AppxBlockMap.xml fehlt' % name)
        return
    root = ET.fromstring(z.read('AppxBlockMap.xml'))
    dateien = root.findall(BLOCK_NS + 'File')
    geprueft = 0
    abweichung = []

    for f in dateien:
        datei = f.get('Name').replace('\\', '/')
        soll = [b.get('Hash') for b in f.findall(BLOCK_NS + 'Block')]
        if datei not in z.namelist():
            fehler.append('%s: Blockmap nennt fehlende Datei %s' % (name, datei))
            continue
        daten = z.read(datei)
        ist = []
        for i in range(0, len(daten), 65536):
            ist.append(base64.b64encode(hashlib.sha256(daten[i:i + 65536]).digest()).decode())
        if ist != soll:
            abweichung.append(datei)
        geprueft += 1

    if abweichung:
        fehler.append('%s: Hash passt nicht bei %d Datei(en): %s'
                      % (name, len(abweichung), ', '.join(abweichung[:5])))
    else:
        ok.append('%s: %d Dateien mit Blockmap-Hash stimmen' % (name, geprueft))


print('== 1. Paket oeffnen ==')
z = zipfile.ZipFile(PAKET)
namen = z.namelist()
ok.append('Bundle enthaelt %d Eintraege' % len(namen))

for pflicht in ('AppxMetadata/AppxBundleManifest.xml', 'AppxBlockMap.xml', '[Content_Types].xml'):
    if pflicht in namen:
        ok.append('vorhanden: ' + pflicht)
    else:
        fehler.append('fehlt: ' + pflicht)

print('\n== 2. Bundle-Manifest ==')
bm = z.read('AppxMetadata/AppxBundleManifest.xml').decode('utf-8')
identity = re.search(r'<Identity Name="([^"]+)" Publisher="([^"]+)" Version="([^"]+)"', bm)
if identity:
    ok.append('Identity: %s | %s | %s' % identity.groups())
else:
    fehler.append('Identity im Bundle-Manifest nicht gefunden')

sprachen = re.findall(r'Resource Language="([^"]+)"', bm)
ok.append('Sprachen im Bundle: ' + ', '.join(sprachen))

print('\n== 3. Inneres Appx ==')
appx_name = [n for n in namen if n.endswith('.appx')]
if not appx_name:
    fehler.append('kein .appx im Bundle')
    sys.exit(1)
appx_bytes = z.read(appx_name[0])
a = zipfile.ZipFile(io.BytesIO(appx_bytes))

m = a.read('AppxManifest.xml').decode('utf-8')
felder = {
    'Anzeigename': re.search(r'<DisplayName>([^<]+)</DisplayName>', m),
    'Herausgeber-Anzeigename': re.search(r'<PublisherDisplayName>([^<]+)</PublisherDisplayName>', m),
    'Startadresse': re.search(r'app-fallback-url=([^ ]+)', m),
}
for k, v in felder.items():
    if v:
        ok.append('%s: %s' % (k, v.group(1)))
    else:
        fehler.append('%s fehlt im Appx-Manifest' % k)

# Icons, auf die das Manifest verweist, muessen existieren
m_norm = m.replace('\\', '/')
verweise = set(re.findall(r'Images/([A-Za-z0-9_.\-]+)\.png', m_norm))
vorhanden = set()
for n in a.namelist():
    treffer = re.match(r'Images/([A-Za-z0-9_.\-]+)\.png$', n.replace('\\', '/'))
    if treffer:
        vorhanden.add(treffer.group(1))
fehlend = sorted(v for v in verweise
                 if not any(k == v or k.startswith(v + '.') for k in vorhanden))
if not verweise:
    fehler.append('keine Icon-Verweise im Manifest gefunden (Pruefung waere wertlos)')
elif fehlend:
    fehler.append('Icon-Verweise ohne Datei: ' + ', '.join(fehlend))
else:
    # Windows loest z. B. "Square44x44Logo" auf "Square44x44Logo.scale-200.png" auf
    ok.append('alle %d Icon-Verweise im Manifest vorhanden (%d Bilddateien im Paket)'
              % (len(verweise), len(vorhanden)))

# Blockmap des Appx nachrechnen
blockmap_pruefen(appx_bytes, 'Appx')

print('\n== 4. Aufraeumen ==')
if not any(n.startswith('/') or '..' in n for n in namen):
    ok.append('keine absoluten Pfade oder ..-Ausbrueche im Archiv')
else:
    fehler.append('verdaechtige Pfade im Archiv')

print('\n===== ERGEBNIS =====')
for o in ok:
    print('  ✓', o)
if fehler:
    print('\nFEHLER:')
    for f in fehler:
        print('  ✗', f)
else:
    print('\n  keine Fehler – Paket strukturell intakt')
