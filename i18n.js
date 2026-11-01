/* =====================================================================
   Revu QR – Sprachdatei (Deutsch / Englisch)
   ---------------------------------------------------------------------
   Reine Oberflächentexte. Es werden keine Daten übertragen und keine
   externen Ressourcen geladen.

   Benutzung:
     t('key')                  -> Text in der aktuellen Sprache
     t('key', { n: 5 })        -> Platzhalter {n} ersetzen
     setLang('en')             -> Sprache wechseln + Oberfläche anpassen

   Elemente im HTML werden über Attribute übersetzt:
     data-i18n="key"           -> textContent
     data-i18n-html="key"      -> innerHTML (nur für eigene, sichere Texte)
     data-i18n-ph="key"        -> placeholder
     data-i18n-title="key"     -> title
     data-i18n-aria="key"      -> aria-label
   ===================================================================== */

const I18N = {
    de: {
        /* --- Kopf / Rahmen --- */
        'app.title': 'Revu QR – QR-Code Generator',
        'app.metaDesc': 'QR-Codes erstellen mit vCard, WiFi, E-Mail und Logo – inklusive SVG-Export, Eckenfarben und Druckbogen. Alles läuft lokal im Browser, ohne Datenübertragung.',
        'app.tagline': 'QR-Codes erstellen – kostenlos, ohne Konto, ohne Server.',
        'tabs.aria': 'Bereiche',
        'tab.content': 'Inhalt',
        'tab.design': 'Design',
        'tab.logo': 'Logo',
        'tab.batch': 'Stapel',

        /* --- Inhalt --- */
        'type.label': 'QR-Code Typ:',
        'type.text': 'Text/URL',
        'type.vcard': 'vCard (Kontakt)',
        'type.wifi': 'WiFi (SSID + Passwort)',
        'type.email': 'E-Mail',
        'type.phone': 'Telefonnummer',
        'type.sms': 'SMS',
        'text.label': 'Text oder URL:',
        'text.ph': 'z.B. https://meine-website.de',

        'vc.first': 'Vorname:',
        'vc.firstPh': 'Max',
        'vc.last': 'Nachname:',
        'vc.lastPh': 'Mustermann',
        'vc.tel': 'Telefon:',
        'vc.telPh': '+49 123 456789',
        'vc.email': 'E-Mail:',
        'vc.emailPh': 'max@example.com',
        'vc.org': 'Firma:',
        'vc.orgPh': 'Musterfirma GmbH',
        'vc.url': 'Webadresse:',
        'vc.urlPh': 'https://meine-website.de',
        'vc.errorName': 'Bitte mindestens Vor- oder Nachname ausfüllen',
        'vc.errorEmail': 'Bitte eine gültige E-Mail-Adresse eingeben',
        'vc.hint': 'Wird als vCard 3.0 gespeichert – Kontakte lassen sich direkt im Adressbuch ablegen.',

        'wifi.ssid': 'Netzwerkname (SSID):',
        'wifi.ssidPh': 'MeinWLAN',
        'wifi.ssidError': 'SSID darf nicht leer sein',
        'wifi.pw': 'Passwort:',
        'wifi.pwPh': 'geheim123',
        'wifi.pwNoPass': 'nicht nötig (offenes Netz)',
        'wifi.pwShow': 'Passwort anzeigen',
        'wifi.enc': 'Verschlüsselung:',
        'wifi.wpa': 'WPA/WPA2',
        'wifi.wep': 'WEP',
        'wifi.none': 'Keine',

        'email.label': 'E-Mail-Adresse:',
        'email.ph': 'info@example.com',
        'email.error': 'Ungültige E-Mail-Adresse',
        'email.subject': 'Betreff (optional):',
        'email.subjectPh': 'Hallo',
        'email.body': 'Nachricht (optional):',
        'email.bodyPh': 'Nachricht...',

        'phone.label': 'Telefonnummer:',
        'phone.ph': '+49 123 456789',
        'phone.error': 'Telefonnummer darf nicht leer sein',
        'sms.phone': 'Telefonnummer:',
        'sms.phoneError': 'Telefonnummer darf nicht leer sein',
        'sms.msg': 'Nachricht:',
        'sms.msgPh': 'Hallo!',

        /* --- Design --- */
        'design.colors': 'Farben:',
        'design.dark': 'Dunkel (Module):',
        'design.light': 'Hell (Hintergrund):',
        'design.presets': 'Farb-Presets:',
        'preset.classic': 'Klassisch',
        'preset.purple': 'Lila',
        'preset.red': 'Rot',
        'preset.green': 'Grün',
        'preset.dark': 'Dunkel',
        'preset.orange': 'Orange',
        'preset.ariaPrefix': 'Preset',
        'design.size': 'Größe:',
        'design.ec': 'Fehlerkorrektur:',
        'ec.L': 'Niedrig (7%)',
        'ec.M': 'Mittel (15%)',
        'ec.Q': 'Hoch (25%)',
        'ec.H': 'Sehr hoch (30%) – empfohlen für Logos',
        'design.transparent': 'Transparenter Hintergrund',
        'design.dontAsk': 'Bei transparentem Hintergrund nicht mehr nachfragen',
        'design.transparentHint': 'PNG und SVG behalten die Transparenz. Der Code ist dann nur auf hellem Untergrund lesbar.',
        'design.corners': 'Ecken (Finder-Muster) anders einfärben',
        'design.cornerColor': 'Ecken-Farbe:',
        'design.cornerSplit': 'Ecken einzeln färben',
        'design.tl': 'oben links:',
        'design.tr': 'oben rechts:',
        'design.bl': 'unten links:',
        'design.module': 'Modul-Stil:',
        'module.square': 'Quadrat (max. Lesbarkeit)',
        'module.dots': 'Abgerundet (weicher)',
        'design.persist': 'Einstellungen auf diesem Gerät speichern',
        'design.persistHint': 'Nur Design-Einstellungen (Farben, Größe, Fehlerkorrektur) – keine Inhalte, keine Passwörter.',
        'design.clear': 'Gespeicherte Daten löschen',

        /* --- Logo --- */
        'logo.upload': 'Logo hochladen:',
        'logo.dropTitle': 'Logo hierher ziehen',
        'logo.dropHint': 'oder klicken zum Auswählen (PNG/JPG, max. 5 MB)',
        'logo.dropAria': 'Logo hierher ziehen oder auswählen',
        'logo.remove': 'Logo entfernen',
        'logo.alt': 'Logo Vorschau',
        'logo.size': 'Logo-Größe:',
        'logo.bg': 'Hintergrund hinter Logo (passend zur Hintergrundfarbe)',
        'logo.shadow': 'Schatten um Logo',

        /* --- Stapel --- */
        'batch.label': 'Eine Zeile = ein QR-Code',
        'batch.ph': 'https://beispiel.de;startseite\nhttps://beispiel.de/kontakt;kontakt\nhttps://beispiel.de/impressum',
        'batch.hint': 'Format: <code>Inhalt;dateiname</code> – der Dateiname ist optional.',
        'batch.file': '… oder CSV-Datei wählen:',
        'batch.svg': 'Zusätzlich SVG-Dateien erzeugen',
        'batch.btn': '📦 ZIP mit QR-Codes erstellen',
        'batch.info': 'Maximal 200 Zeilen pro Durchlauf. Es gelten die Design-Einstellungen.',
        'batch.loaded': 'Datei geladen: {name}',
        'batch.readError': 'Datei konnte nicht gelesen werden.',
        'batch.empty': 'Bitte mindestens eine Zeile eingeben.',
        'batch.tooMany': 'Maximal 200 Zeilen pro Durchlauf (aktuell {n}).',
        'batch.noZip': '✗ ZIP-Bibliothek nicht verfügbar (offline noch nicht geladen).',
        'batch.noZipLib': '✗ ZIP-Bibliothek fehlt.',
        'batch.working': 'erstelle {n} Codes …',
        'batch.done': '{n} Codes erstellt',
        'batch.doneOne': '1 Code erstellt',
        'batch.skipped': ', {n} übersprungen (Inhalt zu lang)',
        'batch.error': '✗ Fehler: {msg}',

        /* --- Ergebnis --- */
        'btn.generate': '✨ QR-Code generieren',
        'btn.generating': '⏳ Generiere...',
        'canvas.aria': 'Generierter QR-Code',
        'result.png': '⬇️ PNG',
        'result.svg': '⬇️ SVG (verlustfrei)',
        'result.test': '🔍 Code testen',
        'result.print': '🖨️ Druckbogen (A4)',
        'export.label': 'PNG-Auflösung beim Download:',
        'export.512': '512 px',
        'export.1024': '1024 px',
        'export.2048': '2048 px (Druck)',
        'export.preview': 'Wie Vorschau',
        'exportInfo': 'Vorschau: {px} × {px} px · PNG-Download: {dl} · SVG ist beliebig skalierbar',
        'resHint': 'Hinweis: Für diese Datenmenge wurde die Auflösung auf {px} px erhöht (mindestens 2 px pro Modul), damit der Code scanbar bleibt. Für Druck bitte SVG verwenden.',

        /* --- Tipps / Fuß --- */
        'tips.title': '💡 Tipps:',
        'tips.1': 'Logo sollte quadratisch sein (z.B. 200x200px)',
        'tips.2': 'Hohe Fehlerkorrektur = Logo kann größer sein',
        'tips.3': 'vCard: mindestens Vor- oder Nachname angeben',
        'tips.4': 'SVG eignet sich für Druck, Plakate und beliebige Skalierung',
        'tips.5': 'Alle Daten bleiben lokal – nichts wird gesendet',
        'footer.offline': '✓ offline verfügbar',
        'footer.privacy': 'Alle Berechnungen laufen in Ihrem Browser. Es werden keine Daten übertragen.',
        'footer.source': 'Quellcode',
        'footer.license': 'AGPL-3.0',
        'footer.privacyLink': 'Datenschutz',
        'footer.contact': 'Kontakt',
        'lang.switch': 'Sprache wechseln',
        'lang.de': 'Deutsch',
        'lang.en': 'English',

        /* --- Lesbarkeits-Banner --- */
        'warn.title': 'Hinweis zur Lesbarkeit',
        'warn.transparent': 'Transparenter Hintergrund: Der Code ist nur auf hellem Untergrund lesbar.',
        'warn.contrastVeryLow': 'Kontrast sehr gering ({r}:1) – der Code wird vermutlich nicht gelesen.',
        'warn.contrastLow': 'Kontrast niedrig ({r}:1) – empfohlen sind mindestens 5:1.',
        'warn.cornerWeak': 'Ecken-Farbe zu schwach ({r}:1) – Finder-Muster brauchen mindestens 4,5:1.',
        'warn.logoEC': 'Logo bei niedriger Fehlerkorrektur – bitte „Sehr hoch (30 %)“ wählen.',
        'warn.overflow': 'Mit dieser Einstellung passt der Inhalt nicht mehr in den QR-Code – bitte Fehlerkorrektur reduzieren oder Inhalt kürzen.',

        /* --- Dialoge --- */
        'alert.noText': 'Bitte gib einen Text oder eine URL ein!',
        'alert.libMissing': 'Fehler: QR-Bibliothek konnte nicht geladen werden (qrcode.js fehlt).',
        'alert.sameColors': '⚠️ Dunkel- und Hellfarbe sind identisch!\nDer QR-Code wäre unsichtbar und nicht scannbar.',
        'alert.contrastLow': '⚠️ Der Kontrast zwischen den Farben ist zu gering (Verhältnis {r}:1).\n\nEin QR-Code braucht einen starken Unterschied zwischen dunkel und hell, sonst erkennen Kameras ihn nicht.',
        'alert.contrastConfirm': 'Der Kontrast ist niedrig ({r}:1).\nEmpfohlen sind mindestens 5:1.\n\nTrotzdem fortfahren?',
        'alert.transparentConfirm': 'Transparenter Hintergrund:\nDer Code ist nur auf einem hellen Untergrund lesbar. Auf dunklen Fotos oder farbigen Flächen scannt er nicht.\n\nFortfahren?',
        'alert.cornerConfirm': 'Die Ecken-Farbe hat nur {r}:1 Kontrast zum Hintergrund.\nFinder-Muster brauchen mindestens 4,5:1, sonst erkennen Scanner den Code evtl. nicht.\n\nTrotzdem fortfahren?',
        'alert.logoECConfirm': '⚠️ Achtung: Ein Logo braucht hohe Fehlerkorrektur, sonst scannt der QR-Code evtl. nicht!\n\nEmpfehlung: Fehlerkorrektur „Sehr hoch (30%)“\n\nTrotzdem mit „{ec}-Stufe“ fortfahren?',
        'alert.tooLong': 'Der Inhalt ist zu lang für einen QR-Code.{hint}\n\nTipp: Felder kürzen oder Fehlerkorrektur reduzieren.',
        'alert.tooLongHint': '\n\nMit Fehlerkorrektur „{level}“ würde der Inhalt passen.',
        'alert.renderError': 'Fehler beim Rendern: {msg}',
        'alert.needQR': 'Bitte generiere zuerst einen QR-Code!',
        'alert.exportOverflow': 'Der Inhalt passt nicht zur gewählten Fehlerkorrektur.\nBitte Stufe reduzieren oder Inhalt kürzen.',
        'alert.exportFailed': 'Export fehlgeschlagen: {msg}',
        'alert.notImage': 'Bitte wähle eine Bilddatei!',
        'alert.svgNotSupported': 'SVG-Logos werden nicht unterstützt. Bitte PNG oder JPG verwenden.',
        'alert.logoTooBig': 'Logo darf max. 5MB groß sein!',
        'alert.logoLoadFailed': 'Logo konnte nicht geladen werden!',

        /* --- Selbsttest --- */
        'test.none': 'Bitte zuerst einen Code erzeugen.',
        'test.checking': 'prüfe …',
        'test.noDecoder': '✗ Decoder nicht verfügbar (offline noch nicht geladen)',
        'test.ok': '✓ lesbar (geprüft mit lokalem Decoder)',
        'test.fail': '✗ nicht lesbar – bitte Kontrast/Farben prüfen',
        'test.error': '✗ Test fehlgeschlagen: {msg}',

        /* --- Druck --- */
        'print.alt': 'QR-Code {i}'
    },

    en: {
        'app.title': 'Revu QR – QR Code Generator',
        'app.metaDesc': 'Create QR codes with vCard, WiFi, email and logo – including SVG export, corner colours and a print sheet. Everything runs locally in your browser, with no data transmission.',
        'app.tagline': 'Create QR codes – free, no account, no server.',
        'tabs.aria': 'Sections',
        'tab.content': 'Content',
        'tab.design': 'Design',
        'tab.logo': 'Logo',
        'tab.batch': 'Batch',

        'type.label': 'QR code type:',
        'type.text': 'Text/URL',
        'type.vcard': 'vCard (contact)',
        'type.wifi': 'WiFi (SSID + password)',
        'type.email': 'Email',
        'type.phone': 'Phone number',
        'type.sms': 'SMS',
        'text.label': 'Text or URL:',
        'text.ph': 'e.g. https://my-website.com',

        'vc.first': 'First name:',
        'vc.firstPh': 'John',
        'vc.last': 'Last name:',
        'vc.lastPh': 'Doe',
        'vc.tel': 'Phone:',
        'vc.telPh': '+1 555 0100',
        'vc.email': 'Email:',
        'vc.emailPh': 'john@example.com',
        'vc.org': 'Company:',
        'vc.orgPh': 'Example Inc.',
        'vc.url': 'Website:',
        'vc.urlPh': 'https://my-website.com',
        'vc.errorName': 'Please enter at least a first or last name',
        'vc.errorEmail': 'Please enter a valid email address',
        'vc.hint': 'Saved as vCard 3.0 – contacts can be added to the address book directly.',

        'wifi.ssid': 'Network name (SSID):',
        'wifi.ssidPh': 'MyWiFi',
        'wifi.ssidError': 'SSID must not be empty',
        'wifi.pw': 'Password:',
        'wifi.pwPh': 'secret123',
        'wifi.pwNoPass': 'not needed (open network)',
        'wifi.pwShow': 'Show password',
        'wifi.enc': 'Encryption:',
        'wifi.wpa': 'WPA/WPA2',
        'wifi.wep': 'WEP',
        'wifi.none': 'None',

        'email.label': 'Email address:',
        'email.ph': 'info@example.com',
        'email.error': 'Invalid email address',
        'email.subject': 'Subject (optional):',
        'email.subjectPh': 'Hello',
        'email.body': 'Message (optional):',
        'email.bodyPh': 'Message...',

        'phone.label': 'Phone number:',
        'phone.ph': '+1 555 0100',
        'phone.error': 'Phone number must not be empty',
        'sms.phone': 'Phone number:',
        'sms.phoneError': 'Phone number must not be empty',
        'sms.msg': 'Message:',
        'sms.msgPh': 'Hello!',

        'design.colors': 'Colours:',
        'design.dark': 'Dark (modules):',
        'design.light': 'Light (background):',
        'design.presets': 'Colour presets:',
        'preset.classic': 'Classic',
        'preset.purple': 'Purple',
        'preset.red': 'Red',
        'preset.green': 'Green',
        'preset.dark': 'Dark',
        'preset.orange': 'Orange',
        'preset.ariaPrefix': 'Preset',
        'design.size': 'Size:',
        'design.ec': 'Error correction:',
        'ec.L': 'Low (7%)',
        'ec.M': 'Medium (15%)',
        'ec.Q': 'High (25%)',
        'ec.H': 'Very high (30%) – recommended for logos',
        'design.transparent': 'Transparent background',
        'design.dontAsk': "Don't ask again for transparent backgrounds",
        'design.transparentHint': 'PNG and SVG keep the transparency. The code is then only readable on a light background.',
        'design.corners': 'Colour the corners (finder patterns) differently',
        'design.cornerColor': 'Corner colour:',
        'design.cornerSplit': 'Colour corners individually',
        'design.tl': 'top left:',
        'design.tr': 'top right:',
        'design.bl': 'bottom left:',
        'design.module': 'Module style:',
        'module.square': 'Square (best readability)',
        'module.dots': 'Rounded (softer)',
        'design.persist': 'Save settings on this device',
        'design.persistHint': 'Design settings only (colours, size, error correction) – no content, no passwords.',
        'design.clear': 'Delete saved data',

        'logo.upload': 'Upload logo:',
        'logo.dropTitle': 'Drag your logo here',
        'logo.dropHint': 'or click to choose (PNG/JPG, max. 5 MB)',
        'logo.dropAria': 'Drag logo here or choose a file',
        'logo.remove': 'Remove logo',
        'logo.alt': 'Logo preview',
        'logo.size': 'Logo size:',
        'logo.bg': 'Background behind logo (matches the background colour)',
        'logo.shadow': 'Shadow around logo',

        'batch.label': 'One line = one QR code',
        'batch.ph': 'https://example.com;home\nhttps://example.com/contact;contact\nhttps://example.com/legal',
        'batch.hint': 'Format: <code>content;filename</code> – the filename is optional.',
        'batch.file': '… or choose a CSV file:',
        'batch.svg': 'Also create SVG files',
        'batch.btn': '📦 Create ZIP with QR codes',
        'batch.info': 'Up to 200 lines per run. The design settings apply.',
        'batch.loaded': 'File loaded: {name}',
        'batch.readError': 'The file could not be read.',
        'batch.empty': 'Please enter at least one line.',
        'batch.tooMany': 'Up to 200 lines per run (currently {n}).',
        'batch.noZip': '✗ ZIP library not available (not loaded offline yet).',
        'batch.noZipLib': '✗ ZIP library missing.',
        'batch.working': 'creating {n} codes …',
        'batch.done': '{n} codes created',
        'batch.doneOne': '1 code created',
        'batch.skipped': ', {n} skipped (content too long)',
        'batch.error': '✗ Error: {msg}',

        'btn.generate': '✨ Generate QR code',
        'btn.generating': '⏳ Generating...',
        'canvas.aria': 'Generated QR code',
        'result.png': '⬇️ PNG',
        'result.svg': '⬇️ SVG (lossless)',
        'result.test': '🔍 Test code',
        'result.print': '🖨️ Print sheet (A4)',
        'export.label': 'PNG resolution on download:',
        'export.512': '512 px',
        'export.1024': '1024 px',
        'export.2048': '2048 px (print)',
        'export.preview': 'Same as preview',
        'exportInfo': 'Preview: {px} × {px} px · PNG download: {dl} · SVG scales to any size',
        'resHint': 'Note: for this amount of data the resolution was raised to {px} px (at least 2 px per module) so the code stays scannable. For print, please use SVG.',

        'tips.title': '💡 Tips:',
        'tips.1': 'The logo should be square (e.g. 200x200px)',
        'tips.2': 'Higher error correction = the logo can be larger',
        'tips.3': 'vCard: enter at least a first or last name',
        'tips.4': 'SVG is ideal for print, posters and any scaling',
        'tips.5': 'All data stays local – nothing is sent anywhere',
        'footer.offline': '✓ available offline',
        'footer.privacy': 'Everything runs in your browser. No data is transmitted.',
        'footer.source': 'Source code',
        'footer.license': 'AGPL-3.0',
        'footer.privacyLink': 'Privacy',
        'footer.contact': 'Contact',
        'lang.switch': 'Change language',
        'lang.de': 'Deutsch',
        'lang.en': 'English',

        'warn.title': 'Readability notice',
        'warn.transparent': 'Transparent background: the code is only readable on a light surface.',
        'warn.contrastVeryLow': 'Contrast is very low ({r}:1) – the code will probably not be read.',
        'warn.contrastLow': 'Contrast is low ({r}:1) – at least 5:1 is recommended.',
        'warn.cornerWeak': 'Corner colour too weak ({r}:1) – finder patterns need at least 4.5:1.',
        'warn.logoEC': 'Logo with low error correction – please choose “Very high (30%)”.',
        'warn.overflow': 'With this setting the content no longer fits into the QR code – please reduce error correction or shorten the content.',

        'alert.noText': 'Please enter a text or a URL!',
        'alert.libMissing': 'Error: the QR library could not be loaded (qrcode.js missing).',
        'alert.sameColors': '⚠️ Dark and light colour are identical!\nThe QR code would be invisible and unscannable.',
        'alert.contrastLow': '⚠️ The contrast between the colours is too low (ratio {r}:1).\n\nA QR code needs a strong difference between dark and light, otherwise cameras will not detect it.',
        'alert.contrastConfirm': 'The contrast is low ({r}:1).\nAt least 5:1 is recommended.\n\nContinue anyway?',
        'alert.transparentConfirm': 'Transparent background:\nThe code is only readable on a light surface. On dark photos or coloured surfaces it will not scan.\n\nContinue?',
        'alert.cornerConfirm': 'The corner colour has only {r}:1 contrast to the background.\nFinder patterns need at least 4.5:1, otherwise scanners may not detect the code.\n\nContinue anyway?',
        'alert.logoECConfirm': '⚠️ Note: a logo needs high error correction, otherwise the QR code may not scan!\n\nRecommended: error correction “Very high (30%)”\n\nContinue with level “{ec}” anyway?',
        'alert.tooLong': 'The content is too long for a QR code.{hint}\n\nTip: shorten the fields or reduce error correction.',
        'alert.tooLongHint': '\n\nWith error correction “{level}” the content would fit.',
        'alert.renderError': 'Rendering failed: {msg}',
        'alert.needQR': 'Please generate a QR code first!',
        'alert.exportOverflow': 'The content does not fit the selected error correction.\nPlease lower the level or shorten the content.',
        'alert.exportFailed': 'Export failed: {msg}',
        'alert.notImage': 'Please choose an image file!',
        'alert.svgNotSupported': 'SVG logos are not supported. Please use PNG or JPG.',
        'alert.logoTooBig': 'The logo may be 5 MB at most!',
        'alert.logoLoadFailed': 'The logo could not be loaded!',

        'test.none': 'Please generate a code first.',
        'test.checking': 'checking …',
        'test.noDecoder': '✗ Decoder not available (not loaded offline yet)',
        'test.ok': '✓ readable (checked with local decoder)',
        'test.fail': '✗ not readable – please check contrast/colours',
        'test.error': '✗ Test failed: {msg}',

        'print.alt': 'QR code {i}'
    }
};

/* ================= Sprache ================= */

const LANG_KEY = 'revuqr.lang';
let LANG = 'de';

function langFromBrowser() {
    const nav = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
    return nav.indexOf('de') === 0 ? 'de' : 'en';
}

function t(key, vars) {
    const table = I18N[LANG] || I18N.de;
    let text = table[key];
    if (text === undefined) text = I18N.de[key];
    if (text === undefined) return key;           // fehlender Schlüssel bleibt sichtbar
    if (vars) {
        Object.keys(vars).forEach((k) => {
            text = text.split('{' + k + '}').join(String(vars[k]));
        });
    }
    return text;
}

// Zahl mit passendem Dezimaltrennzeichen (DE: 1,2 · EN: 1.2)
function num(value, digits) {
    const n = Number(value).toFixed(digits === undefined ? 1 : digits);
    return LANG === 'de' ? n.replace('.', ',') : n;
}

function applyLangToDom() {
    document.documentElement.lang = LANG;
    document.title = t('app.title');

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('app.metaDesc'));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
        el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
}

function setLang(lang, remember) {
    LANG = (lang === 'en') ? 'en' : 'de';

    if (remember !== false) {
        try { localStorage.setItem(LANG_KEY, LANG); } catch (e) { /* privater Modus */ }
    }

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
        const active = btn.getAttribute('data-lang-btn') === LANG;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    applyLangToDom();

    // Dynamische Teile (Vorschau-Infos, Banner, Stapel-Info) neu aufbauen
    if (typeof window.afterLangChange === 'function') window.afterLangChange();
}

function initLang() {
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { saved = null; }
    const start = (saved === 'de' || saved === 'en') ? saved : langFromBrowser();
    setLang(start, false);
}

// initLang() wird am Ende des Hauptskripts aufgerufen – dort steht das DOM
// bereits vollständig, und es gibt kein kurzes Aufblitzen der falschen Sprache.
