#!/usr/bin/env node
/**
 * EXTRACT_TRANSLATABLE.JS
 *
 * Parcourt un fichier JSON de chapitre et extrait tous les segments
 * de texte traduisibles dans un fichier plat, en preservant les chemins
 * de structure pour la reinjection.
 *
 * Gere les formats :
 *   - Format A (legacy) : element.children[].text
 *   - Format B (style)  : element.text
 *   - richParagraph     : element.segments[].text
 *   - table             : element.headers[] et element.rows[][]
 *   - image             : element.caption
 *
 * USAGE:
 *   node scripts/translate/extract_translatable.js <input.json> [output.json]
 *
 * OUTPUT: fichier JSON avec tableau de { path, text, doNotTranslate }
 */

const fs = require('fs');
const path = require('path');

// Charger la liste des termes proteges
const DNT_PATH = path.join(__dirname, '..', '..', 'i18n', 'do_not_translate.json');
let dntConfig = {};
if (fs.existsSync(DNT_PATH)) {
    dntConfig = JSON.parse(fs.readFileSync(DNT_PATH, 'utf-8'));
}

// Construire un Set de tous les termes exacts a ne pas traduire
const dntTerms = new Set();
for (const key of Object.keys(dntConfig)) {
    if (key.startsWith('_')) continue; // skip comments
    if (key.endsWith('_regex') || key.endsWith('_patterns')) continue; // skip patterns
    const arr = dntConfig[key];
    if (Array.isArray(arr)) {
        arr.forEach(t => dntTerms.add(t));
    }
}

// Construire les regex de detection
const dntRegexes = [];
for (const key of Object.keys(dntConfig)) {
    if (key.endsWith('_regex') || key.endsWith('_patterns')) {
        const arr = dntConfig[key];
        if (Array.isArray(arr)) {
            arr.forEach(pattern => {
                try { dntRegexes.push(new RegExp(pattern)); } catch(e) { /* ignore invalid */ }
            });
        }
    }
}

/**
 * Determine si un segment de texte ne doit PAS etre traduit
 * (formule pure, reference biblio, etc.)
 */
function shouldNotTranslate(text) {
    if (!text || typeof text !== 'string') return true;
    const trimmed = text.trim();
    if (trimmed.length === 0) return true;

    // Texte qui EST un terme protege exact
    if (dntTerms.has(trimmed)) return true;

    // Texte purement numerique ou ponctuation
    if (/^[\d\s.,;:!?()[\]{}<>/*+\-=_|\\@#$%^&~`'"]+$/.test(trimmed)) return true;

    // Separateurs visuels (astérisques, tirets, etc.)
    if (/^[*•\-—–=_~.·\s]+$/.test(trimmed)) return true;
    if (/^_{3,}$/.test(trimmed)) return true;

    return false;
}

/**
 * Determine si un element est un style de formule / code
 */
function isFormulaStyle(element) {
    return element.style === 'Formula' || element.style === 'TechNote';
}

/**
 * Parcourt recursivement la structure JSON et extrait les segments traduisibles
 */
function extractSegments(elements) {
    const segments = [];

    elements.forEach((element, idx) => {
        if (!element || !element.type) return;

        switch (element.type) {
            case 'paragraph': {
                // Format B (style-based) : element.text
                if (element.text !== undefined && element.text !== null) {
                    const dnt = shouldNotTranslate(element.text) || isFormulaStyle(element);
                    segments.push({
                        path: `[${idx}].text`,
                        text: element.text,
                        style: element.style || null,
                        doNotTranslate: dnt
                    });
                }

                // Format A (legacy) : element.children[].text
                if (element.children && Array.isArray(element.children)) {
                    element.children.forEach((child, childIdx) => {
                        if (child.text !== undefined && child.text !== null) {
                            const dnt = shouldNotTranslate(child.text);
                            segments.push({
                                path: `[${idx}].children[${childIdx}].text`,
                                text: child.text,
                                style: element.style || element.heading || null,
                                doNotTranslate: dnt
                            });
                        }
                    });
                }
                break;
            }

            case 'richParagraph': {
                if (element.segments && Array.isArray(element.segments)) {
                    element.segments.forEach((seg, segIdx) => {
                        if (seg.text !== undefined && seg.text !== null) {
                            const dnt = shouldNotTranslate(seg.text);
                            segments.push({
                                path: `[${idx}].segments[${segIdx}].text`,
                                text: seg.text,
                                style: element.style || 'richParagraph',
                                doNotTranslate: dnt
                            });
                        }
                    });
                }
                break;
            }

            case 'table': {
                // En-tetes
                if (element.headers && Array.isArray(element.headers)) {
                    element.headers.forEach((h, hIdx) => {
                        if (h && typeof h === 'string') {
                            const dnt = shouldNotTranslate(h);
                            segments.push({
                                path: `[${idx}].headers[${hIdx}]`,
                                text: h,
                                style: 'table_header',
                                doNotTranslate: dnt
                            });
                        }
                    });
                }

                // Lignes
                if (element.rows && Array.isArray(element.rows)) {
                    element.rows.forEach((row, rowIdx) => {
                        if (Array.isArray(row)) {
                            row.forEach((cell, cellIdx) => {
                                if (cell && typeof cell === 'string') {
                                    const dnt = shouldNotTranslate(cell);
                                    segments.push({
                                        path: `[${idx}].rows[${rowIdx}][${cellIdx}]`,
                                        text: cell,
                                        style: 'table_cell',
                                        doNotTranslate: dnt
                                    });
                                }
                            });
                        }
                    });
                }
                break;
            }

            case 'image': {
                if (element.caption) {
                    const dnt = shouldNotTranslate(element.caption);
                    segments.push({
                        path: `[${idx}].caption`,
                        text: element.caption,
                        style: 'image_caption',
                        doNotTranslate: dnt
                    });
                }
                break;
            }

            // pageBreak, etc. — rien a extraire
            default:
                break;
        }
    });

    return segments;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: node extract_translatable.js <input.json> [output.json]');
        process.exit(1);
    }

    const inputPath = path.resolve(args[0]);
    if (!fs.existsSync(inputPath)) {
        console.error(`Fichier non trouve: ${inputPath}`);
        process.exit(1);
    }

    const elements = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    if (!Array.isArray(elements)) {
        console.error('Le fichier doit contenir un tableau JSON');
        process.exit(1);
    }

    const segments = extractSegments(elements);

    const translatable = segments.filter(s => !s.doNotTranslate);
    const protected_ = segments.filter(s => s.doNotTranslate);

    // Generer la sortie
    const outputPath = args[1]
        ? path.resolve(args[1])
        : inputPath.replace('.json', '_translatable.json');

    fs.writeFileSync(outputPath, JSON.stringify(segments, null, 2), 'utf-8');

    console.log(`Extraction terminee: ${path.basename(inputPath)}`);
    console.log(`  Total segments:     ${segments.length}`);
    console.log(`  A traduire:         ${translatable.length}`);
    console.log(`  Proteges (DNT):     ${protected_.length}`);
    console.log(`  Sortie:             ${outputPath}`);
}

main();
