# Revu QR

Kostenloser, rein clientseitiger QR-Code-Generator mit vCard, SVG-Export,
eigenen Eckenfarben und Druckbogen. **Kein Backend, keine externen Requests,
kein Konto** – alle Daten bleiben im Browser.

Deutsch und Englisch, umschaltbar über DE/EN oben rechts.

## Features

- ✅ 6 QR-Typen: Text/URL, **vCard (Kontakt)**, WiFi, E-Mail, Telefon, SMS
- ✅ **vCard 3.0** mit korrektem Escaping (`; , \`), CRLF-Zeilen und UTF-8
- ✅ **SVG-Export** (echtes Vektorformat, verlustfrei für Druck/Plakate)
- ✅ PNG-Export mit wählbarer Auflösung (512 / 1024 / 2048 px oder Vorschau)
- ✅ **Transparenter Hintergrund** (PNG + SVG behalten Alpha)
- ✅ **Separate Farbe für die drei Finder-Muster** (einzeln oder gemeinsam)
- ✅ Logo per Datei-Dialog **oder Drag & Drop**, mit Größe, Hintergrund, Schatten
- ✅ Eigene Farben + 6 Presets + Kontrastprüfung (WCAG)
- ✅ **Stille Live-Vorschau**: Änderungen erscheinen sofort, ohne Dialoge
- ✅ **Warnbanner** statt Popups bei schwachem Kontrast oder Kapazitätsproblemen
- ✅ Fehlerkorrektur L/M/Q/H, automatische Kapazitätsprüfung
- ✅ **Druckbogen A4** (12 Codes pro Seite)
- ✅ **Stapelverarbeitung**: Zeilen oder CSV → ZIP mit PNG (+ optional SVG)
- ✅ **Selbsttest**: lokaler Decoder prüft, ob der erzeugte Code lesbar ist
- ✅ **PWA**: installierbar, nach dem ersten Besuch vollständig offline
- ✅ Responsive: Desktop, Tablet, Handy (ab 320 px getestet)
- ✅ Barrierefrei: Tastaturbedienung, ARIA, sichtbarer Fokus (Lighthouse 100/100/100)

## Verwendung

1. `index.html` im Browser öffnen (oder über GitHub Pages)
2. Typ wählen und Felder füllen
3. Design anpassen (Farben, Transparenz, Ecken, Logo) – die Vorschau folgt live
4. „QR-Code generieren" → als PNG oder SVG herunterladen

Direktaufruf eines Typs: `?type=vcard`, `?type=wifi`, `?type=email`,
`?type=phone`, `?type=sms`, `?type=text` (auch als Store-Verknüpfung).

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die App (HTML, CSS, Logik, Renderer) |
| `i18n.js` | Oberflächentexte Deutsch/Englisch |
| `datenschutz.html` | Datenschutzerklärung (DE/EN) |
| `qrcode.min.js` | QR-Encoder `qrcode-generator` 1.4.4 (MIT), lokal |
| `jsqr.min.js` | Decoder für den Selbsttest (Apache-2.0), wird erst beim Klick geladen |
| `jszip.min.js` | ZIP für die Stapelverarbeitung (MIT), wird erst beim Klick geladen |
| `sw.js` | Service Worker (offline) |
| `manifest.json` | PWA-Manifest (Name, Icons, Screenshots, Shortcuts) |
| `icons/` | App-Icons inkl. `maskable`-Variante mit Safe-Zone |
| `screenshots/` | Store-Screenshots 1366 × 768 |

## Technik

- Reines HTML/CSS/JavaScript, keine Build-Tools, keine Abhängigkeiten zur Laufzeit
- [`qrcode-generator`](https://github.com/kazuhikoarase/qrcode-generator) 1.4.4 (MIT), lokal
- Eigener Canvas- und SVG-Renderer → volle Kontrolle über Farben und Ecken
- UTF-8-Bytemodus (wichtig für Umlaute in vCards)
- Übersetzungen über `data-i18n`-Attribute + `t()`; Zahlen werden sprachgerecht
  formatiert (DE `1,2:1` · EN `1.2:1`)

## Hinweise

- Transparenter Hintergrund: nur auf hellem Untergrund scannbar
- Logo + niedrige Fehlerkorrektur: App warnt vorher im Banner
- vCard mit vielen Feldern kann die QR-Kapazität sprengen (App nennt eine passende EC-Stufe)
- Offline funktioniert nach dem **ersten** Besuch; `jsqr.min.js` und `jszip.min.js`
  werden erst beim ersten Klick nachgeladen

## Live

https://revucio24-web.github.io/qr-code-generator/

## Store-Veröffentlichung

Geplant für den **Microsoft Store** (PWABuilder → MSIX), danach Google Play
(Trusted Web Activity). Benötigt:

- Manifest mit `id`, Icons (inkl. `maskable`), Screenshots, Shortcuts ✔
- Service Worker + HTTPS ✔
- Datenschutzseite als URL ✔
- Für Play zusätzlich `.well-known/assetlinks.json` auf der Domain-Wurzel

## Lizenz

Dieses Projekt steht unter der **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Siehe [LICENSE](LICENSE).

Kurz gesagt: Nutzen und Verändern ist erlaubt. Wer die Software (auch als Webdienst)
weitergibt, muss den Quellcode ebenfalls unter AGPL-3.0 offenlegen.

## Datenschutz

- Keine Übertragung von Nutzereingaben, Logos oder erzeugten Codes
- Keine Analytics, keine Cookies, keine Werbung, keine externen Fonts
- Alle Bibliotheken liegen lokal im Repository (kein CDN)
- Lokal gespeichert werden nur die Sprachwahl und – bei aktivem Opt-in –
  Design-Einstellungen (nie Inhalte oder Passwörter)
- Nach dem ersten Besuch ist die App per Service Worker vollständig offline nutzbar
- Details: [datenschutz.html](datenschutz.html)

## Änderungen

### v3.0
- Name **Revu QR**, zweisprachige Oberfläche (Deutsch/Englisch)
- Datenschutzseite, Store-Icons (`maskable`), Screenshots, Manifest-Shortcuts
- Service Worker legt Dokumente unter der tatsächlichen Adresse ab
  (vorher überschrieb `datenschutz.html` den Eintrag von `index.html`)

### v2.1
- Ecken einfarbig oder **einzeln** färbbar, Modul-Stil Quadrat/abgerundet
- PNG-Export bis 2048 px, Druckbogen A4, Stapelverarbeitung als ZIP
- Selbsttest mit lokalem Decoder, Einstellungen optional speichern

### v2.0
- Stille Live-Vorschau mit Warnbanner statt Dialogflut
- Drag & Drop für Logos, Logo-Schatten auch im SVG-Export
