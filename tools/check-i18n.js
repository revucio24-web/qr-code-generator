// Prueft die Sprachdatei exakt: gleiche Schluessel in DE und EN, alle
// im HTML/JS benutzten Schluessel vorhanden, Platzhalter identisch.
const fs = require('fs');

const i18nCode = fs.readFileSync('i18n.js', 'utf8');
const I18N = new Function(i18nCode + '\nreturn I18N;')();

const index = fs.readFileSync('index.html', 'utf8');
const priv = fs.readFileSync('datenschutz.html', 'utf8');

const de = Object.keys(I18N.de);
const en = Object.keys(I18N.en);

const nurDe = de.filter((k) => !(k in I18N.en));
const nurEn = en.filter((k) => !(k in I18N.de));

// benutzte Schluessel einsammeln
const benutzt = new Set();
for (const html of [index, priv]) {
    for (const attr of ['data-i18n', 'data-i18n-html', 'data-i18n-ph', 'data-i18n-title', 'data-i18n-aria']) {
        const re = new RegExp(attr + '="([^"]+)"', 'g');
        let m;
        while ((m = re.exec(html))) benutzt.add(m[1]);
    }
}
const codeOnly = (index + i18nCode)
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

{
    const re = /\bt\('([^']+)'/g;
    let m;
    while ((m = re.exec(codeOnly))) {
        if (!m[1].endsWith('.')) benutzt.add(m[1]);
    }
}
// dynamisch zusammengesetzt
benutzt.add('lang.de');
benutzt.add('lang.en');
// type.<wert> dynamisch
for (const t of ['text', 'vcard', 'wifi', 'email', 'phone', 'sms']) benutzt.add('type.' + t);
benutzt.delete('type.');

const fehlend = [...benutzt].filter((k) => !(k in I18N.de) || !(k in I18N.en));
const unbenutzt = de.filter((k) => !benutzt.has(k));

// Platzhalter vergleichen
const falschePlatzhalter = [];
for (const k of de) {
    if (!(k in I18N.en)) continue;
    const a = (I18N.de[k].match(/\{(\w+)\}/g) || []).sort().join(',');
    const b = (I18N.en[k].match(/\{(\w+)\}/g) || []).sort().join(',');
    if (a !== b) falschePlatzhalter.push(k + ': DE[' + a + '] EN[' + b + ']');
}

// leere Werte
const leer = de.filter((k) => !String(I18N.de[k]).trim() || (k in I18N.en && !String(I18N.en[k]).trim()));

console.log('Schluessel: DE', de.length, '| EN', en.length);
console.log('nur in DE:', nurDe.length ? nurDe.join(', ') : 'keine');
console.log('nur in EN:', nurEn.length ? nurEn.join(', ') : 'keine');
console.log('benutzt aber fehlend:', fehlend.length ? fehlend.join(', ') : 'keine');
console.log('unbenutzt:', unbenutzt.length ? unbenutzt.join(', ') : 'keine');
console.log('Platzhalter ungleich:', falschePlatzhalter.length ? falschePlatzhalter.join(' | ') : 'keine');
console.log('leere Texte:', leer.length ? leer.join(', ') : 'keine');

const problem = nurDe.length || nurEn.length || fehlend.length || falschePlatzhalter.length || leer.length;
console.log(problem ? '\n=> FEHLER gefunden' : '\n=> Sprachdatei in Ordnung');
