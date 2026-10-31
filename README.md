# 📱 QR-Code Generator Pro

Kostenloser, rein clientseitiger QR-Code-Generator mit vCard, SVG-Export und
farbigen Finder-Mustern. **Kein Backend, keine externen Requests** – alle Daten
bleiben im Browser.

## Features

- ✅ 6 QR-Typen: Text/URL, **vCard (Kontakt)**, WiFi, E-Mail, Telefon, SMS
- ✅ **vCard 3.0** mit korrektem Escaping (`; , \`), CRLF-Zeilen und UTF-8
- ✅ **SVG-Export** (echtes Vektorformat, verlustfrei für Druck/Plakate)
- ✅ PNG-Export mit wählbarer Auflösung (128–512 px)
- ✅ **Transparenter Hintergrund** (PNG + SVG behalten Alpha)
- ✅ **Separate Farbe für die drei Finder-Muster** (Ecken)
- ✅ Logo-Upload mit Größe, Hintergrund und Schatten
- ✅ Eigene Farben + 6 Presets + Kontrastprüfung (WCAG)
- ✅ Fehlerkorrektur L/M/Q/H, automatische Kapazitätsprüfung
- ✅ Responsive: Desktop, Tablet, Handy (ab 320 px getestet)
- ✅ Barrierefrei: Tastaturbedienung, ARIA, sichtbarer Fokus

## Datenschutz

- `qrcode.js` liegt **lokal** im Repo (kein CDN, kein Trackingeintrag)
- Keine Analytics, keine externen Fonts, keine API-Aufrufe
- Bilder werden nur per `FileReader` lokal verarbeitet

## Verwendung

1. `index.html` im Browser öffnen (oder über GitHub Pages)
2. Typ wählen und Felder füllen
3. Design anpassen (Farben, Transparenz, Ecken, Logo)
4. „QR-Code generieren" → als PNG oder SVG herunterladen

## Technik

- Reines HTML/CSS/JavaScript, keine Build-Tools
- [`qrcode-generator`](https://github.com/kazuhikoarase/qrcode-generator) 1.4.4 (MIT), lokal
- Eigener Canvas- und SVG-Renderer → volle Kontrolle über Farben und Ecken
- UTF-8-Bytemodus (wichtig für Umlaute in vCards)

## Hinweise

- Transparenter Hintergrund: nur auf hellem Untergrund scannbar
- Logo + niedrige Fehlerkorrektur: App warnt vorher
- vCard mit vielen Feldern kann die QR-Kapazität sprengen (App nennt eine passende EC-Stufe)

## Live

https://revucio24-web.github.io/qr-code-generator/

## Lizenz

Dieses Projekt steht unter der **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Siehe [LICENSE](LICENSE).

Kurz gesagt: Nutzen und Verändern ist erlaubt. Wer die Software (auch als Webdienst)
weitergibt, muss den Quellcode ebenfalls unter AGPL-3.0 offenlegen.

## Datenschutz

- Keine Übertragung von Nutzereingaben, Logos oder erzeugten Codes
- Keine Analytics, keine Cookies, keine Werbung
- Alle Bibliotheken liegen lokal im Repository (kein CDN)
- Nach dem ersten Besuch ist die App per Service Worker vollständig offline nutzbar
