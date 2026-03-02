#!/usr/bin/env node
/**
 * VALIDATE_TRANSLATION.JS
 *
 * Verifie apres injection :
 *   - Parite structurelle (types, styles, spacing identiques)
 *   - Termes proteges preserves (codes modules, formules, noms propres)
 *   - Coherence terminologique avec le glossaire traduit
 *   - Ratio de longueur raisonnable (60%-180% de l'original)
 *
 * USAGE:
 *   node scripts/translate/validate_translation.js <original.json> <translated.json> [--lang en|es] [--glossary path]
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const DNT_PATH = path.join(__dirname, '..', '..', 'i18n', 'do_not_translate.json');
const LENGTH_RATIO_MIN = 0.60;
const LENGTH_RATIO_MAX = 1.80;

// ============================================================================
// CHARGEMENT DES DONNEES DE REFERENCE
// ============================================================================

function loadDntTerms() {
    if (!fs.existsSync(DNT_PATH)) return new Set();
    const config = JSON.parse(fs.readFileSync(DNT_PATH, 'utf-8'));
    const terms = new Set();
    for (const key of Object.keys(config)) {
        if (key.startsWith('_') || key.endsWith('_regex') || key.endsWith('_patterns')) continue;
        const arr = config[key];
        if (Array.isArray(arr)) {
            arr.forEach(t => terms.add(t));
        }
    }
    return terms;
}

function loadGlossary(glossaryPath) {
    if (!glossaryPath || !fs.existsSync(glossaryPath)) return null;
    return JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'));
}

// ============================================================================
// EXTRACTION DE TEXTE
// ============================================================================

function extractAllText(elements) {
    const texts = [];

    elements.forEach((el, idx) => {
        if (!el || !el.type) return;

        switch (el.type) {
            case 'paragraph':
                if (el.text) texts.push({ path: `[${idx}].text`, text: el.text, style: el.style });
                if (el.children) {
                    el.children.forEach((c, ci) => {
                        if (c.text) texts.push({ path: `[${idx}].children[${ci}].text`, text: c.text });
                    });
                }
                break;
            case 'richParagraph':
                if (el.segments) {
                    el.segments.forEach((s, si) => {
                        if (s.text) texts.push({ path: `[${idx}].segments[${si}].text`, text: s.text });
                    });
                }
                break;
            case 'table':
                if (el.headers) el.headers.forEach((h, hi) => {
                    if (h) texts.push({ path: `[${idx}].headers[${hi}]`, text: String(h) });
                });
                if (el.rows) el.rows.forEach((row, ri) => {
                    row.forEach((cell, ci) => {
                        if (cell) texts.push({ path: `[${idx}].rows[${ri}][${ci}]`, text: String(cell) });
                    });
                });
                break;
            case 'image':
                if (el.caption) texts.push({ path: `[${idx}].caption`, text: el.caption });
                break;
        }
    });

    return texts;
}

// ============================================================================
// VALIDATIONS
// ============================================================================

function validateStructure(original, translated) {
    const errors = [];

    if (original.length !== translated.length) {
        errors.push({
            level: 'ERROR',
            msg: `Nombre d'elements different: original=${original.length}, traduit=${translated.length}`
        });
        return errors;
    }

    for (let i = 0; i < original.length; i++) {
        const o = original[i];
        const t = translated[i];

        if (!o && !t) continue;
        if (!o || !t) {
            errors.push({ level: 'ERROR', msg: `[${i}] Element manquant` });
            continue;
        }

        if (o.type !== t.type) {
            errors.push({ level: 'ERROR', msg: `[${i}] Type: "${o.type}" → "${t.type}"` });
        }
        if (o.style !== t.style) {
            errors.push({ level: 'ERROR', msg: `[${i}] Style: "${o.style}" → "${t.style}"` });
        }
        if (o.heading !== t.heading) {
            errors.push({ level: 'ERROR', msg: `[${i}] Heading modifie` });
        }
        if (JSON.stringify(o.spacing) !== JSON.stringify(t.spacing)) {
            errors.push({ level: 'ERROR', msg: `[${i}] Spacing modifie` });
        }
        if (o.pageBreakBefore !== t.pageBreakBefore) {
            errors.push({ level: 'ERROR', msg: `[${i}] pageBreakBefore modifie` });
        }

        // Structure interne
        if (o.children && t.children && o.children.length !== t.children.length) {
            errors.push({ level: 'ERROR', msg: `[${i}] Nombre de children: ${o.children.length} → ${t.children.length}` });
        }
        if (o.segments && t.segments && o.segments.length !== t.segments.length) {
            errors.push({ level: 'ERROR', msg: `[${i}] Nombre de segments: ${o.segments.length} → ${t.segments.length}` });
        }

        // Formatage des children preserve
        if (o.children && t.children) {
            const len = Math.min(o.children.length, t.children.length);
            for (let j = 0; j < len; j++) {
                const oc = o.children[j];
                const tc = t.children[j];
                if (oc.bold !== tc.bold) errors.push({ level: 'WARN', msg: `[${i}].children[${j}] bold modifie` });
                if (oc.italics !== tc.italics) errors.push({ level: 'WARN', msg: `[${i}].children[${j}] italics modifie` });
                if (oc.size !== tc.size) errors.push({ level: 'WARN', msg: `[${i}].children[${j}] size modifie` });
            }
        }
    }

    return errors;
}

function validateProtectedTerms(originalTexts, translatedTexts, dntTerms) {
    const errors = [];

    for (let i = 0; i < originalTexts.length && i < translatedTexts.length; i++) {
        const origText = originalTexts[i].text;
        const transText = translatedTexts[i].text;

        for (const term of dntTerms) {
            if (origText.includes(term) && !transText.includes(term)) {
                errors.push({
                    level: 'WARN',
                    msg: `Terme protege "${term}" absent de la traduction a ${originalTexts[i].path}`
                });
            }
        }
    }

    return errors;
}

function validateLengthRatios(originalTexts, translatedTexts) {
    const errors = [];
    let totalOrigLen = 0;
    let totalTransLen = 0;

    for (let i = 0; i < originalTexts.length && i < translatedTexts.length; i++) {
        const origLen = originalTexts[i].text.length;
        const transLen = translatedTexts[i].text.length;
        totalOrigLen += origLen;
        totalTransLen += transLen;

        if (origLen > 50) { // seulement pour les segments significatifs
            const ratio = transLen / origLen;
            if (ratio < LENGTH_RATIO_MIN || ratio > LENGTH_RATIO_MAX) {
                errors.push({
                    level: 'WARN',
                    msg: `Ratio longueur ${ratio.toFixed(2)} a ${originalTexts[i].path} (${origLen}→${transLen} chars)`
                });
            }
        }
    }

    const globalRatio = totalOrigLen > 0 ? totalTransLen / totalOrigLen : 1;
    if (globalRatio < LENGTH_RATIO_MIN || globalRatio > LENGTH_RATIO_MAX) {
        errors.push({
            level: 'WARN',
            msg: `Ratio global de longueur: ${globalRatio.toFixed(2)} (${totalOrigLen}→${totalTransLen} chars)`
        });
    }

    return errors;
}

function validateGlossaryConsistency(translatedTexts, glossary) {
    if (!glossary || !glossary.terms) return [];
    const errors = [];

    // Joindre tout le texte traduit
    const fullText = translatedTexts.map(t => t.text).join(' ');

    for (const entry of glossary.terms) {
        if (entry.translated_term) {
            // Verifier que le terme traduit est utilise de facon coherente
            const termCount = (fullText.match(new RegExp(escapeRegex(entry.translated_term), 'gi')) || []).length;
            if (termCount === 0 && entry.original_term) {
                // Le terme original est-il present ? (indique un oubli de traduction)
                const origCount = (fullText.match(new RegExp(escapeRegex(entry.original_term), 'gi')) || []).length;
                if (origCount > 0) {
                    errors.push({
                        level: 'WARN',
                        msg: `Terme FR "${entry.original_term}" trouve ${origCount} fois mais traduit "${entry.translated_term}" absent`
                    });
                }
            }
        }
    }

    return errors;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('Usage: node validate_translation.js <original.json> <translated.json> [--lang en|es] [--glossary path]');
        process.exit(1);
    }

    const originalPath = path.resolve(args[0]);
    const translatedPath = path.resolve(args[1]);

    // Options
    let lang = 'en';
    let glossaryPath = null;

    for (let i = 2; i < args.length; i++) {
        if (args[i] === '--lang' && args[i + 1]) { lang = args[++i]; }
        if (args[i] === '--glossary' && args[i + 1]) { glossaryPath = path.resolve(args[++i]); }
    }

    // Auto-detect glossary
    if (!glossaryPath) {
        const autoGlossary = path.join(__dirname, '..', '..', 'i18n', `glossary_${lang}.json`);
        if (fs.existsSync(autoGlossary)) glossaryPath = autoGlossary;
    }

    if (!fs.existsSync(originalPath)) {
        console.error(`Fichier original non trouve: ${originalPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(translatedPath)) {
        console.error(`Fichier traduit non trouve: ${translatedPath}`);
        process.exit(1);
    }

    const original = JSON.parse(fs.readFileSync(originalPath, 'utf-8'));
    const translated = JSON.parse(fs.readFileSync(translatedPath, 'utf-8'));
    const dntTerms = loadDntTerms();
    const glossary = loadGlossary(glossaryPath);

    console.log(`Validation: ${path.basename(translatedPath)} (${lang.toUpperCase()})`);
    console.log('='.repeat(60));

    // 1. Parite structurelle
    const structErrors = validateStructure(original, translated);

    // 2. Extraire les textes
    const origTexts = extractAllText(original);
    const transTexts = extractAllText(translated);

    // 3. Termes proteges
    const dntErrors = validateProtectedTerms(origTexts, transTexts, dntTerms);

    // 4. Ratios de longueur
    const lenErrors = validateLengthRatios(origTexts, transTexts);

    // 5. Coherence glossaire
    const glossErrors = validateGlossaryConsistency(transTexts, glossary);

    // Bilan
    const allErrors = [...structErrors, ...dntErrors, ...lenErrors, ...glossErrors];
    const errorCount = allErrors.filter(e => e.level === 'ERROR').length;
    const warnCount = allErrors.filter(e => e.level === 'WARN').length;

    if (allErrors.length === 0) {
        console.log('\n  Toutes les validations passent.');
    } else {
        if (errorCount > 0) {
            console.log(`\n  ERREURS (${errorCount}):`);
            allErrors.filter(e => e.level === 'ERROR').forEach(e => console.log(`    [ERR] ${e.msg}`));
        }
        if (warnCount > 0) {
            console.log(`\n  AVERTISSEMENTS (${warnCount}):`);
            allErrors.filter(e => e.level === 'WARN').forEach(e => console.log(`    [WARN] ${e.msg}`));
        }
    }

    console.log(`\nResume: ${errorCount} erreur(s), ${warnCount} avertissement(s)`);
    console.log(`  Segments originaux: ${origTexts.length}`);
    console.log(`  Segments traduits:  ${transTexts.length}`);

    if (glossary) {
        console.log(`  Glossaire:          ${glossaryPath} (${glossary.terms ? glossary.terms.length : 0} termes)`);
    }

    if (errorCount > 0) {
        process.exit(1);
    }
}

main();
