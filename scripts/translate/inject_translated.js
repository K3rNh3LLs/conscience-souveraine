#!/usr/bin/env node
/**
 * INJECT_TRANSLATED.JS
 *
 * Prend le JSON original + un fichier de segments traduits,
 * clone la structure JSON et remplace uniquement les valeurs textuelles
 * aux chemins specifies.
 *
 * Verifie l'integrite structurelle (meme nombre d'elements, memes
 * proprietes de formatage).
 *
 * USAGE:
 *   node scripts/translate/inject_translated.js <original.json> <translated_segments.json> <output.json>
 *
 * Le fichier translated_segments.json a le meme format que la sortie
 * de extract_translatable.js, mais avec les champs `text` traduits.
 */

const fs = require('fs');
const path = require('path');

/**
 * Resout un chemin de type "[3].children[0].text" dans un objet
 * et retourne { parent, key } pour permettre l'assignation
 */
function resolvePath(obj, pathStr) {
    // Parser le chemin : "[3].children[0].text" → ["3", "children", "0", "text"]
    const parts = [];
    const regex = /\[(\d+)\]|\.?([a-zA-Z_]\w*)/g;
    let match;
    while ((match = regex.exec(pathStr)) !== null) {
        if (match[1] !== undefined) {
            parts.push(parseInt(match[1], 10));
        } else if (match[2] !== undefined) {
            parts.push(match[2]);
        }
    }

    if (parts.length === 0) return null;

    // Naviguer jusqu'a l'avant-dernier element
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current === null || current === undefined) return null;
        current = current[parts[i]];
    }

    if (current === null || current === undefined) return null;

    return {
        parent: current,
        key: parts[parts.length - 1]
    };
}

/**
 * Verifie que deux elements JSON ont la meme structure
 * (type, style, proprietes de formatage identiques)
 */
function checkStructuralParity(original, translated) {
    const errors = [];

    if (original.length !== translated.length) {
        errors.push(`Nombre d'elements different: original=${original.length}, traduit=${translated.length}`);
        return errors;
    }

    for (let i = 0; i < original.length; i++) {
        const orig = original[i];
        const trans = translated[i];

        if (!orig || !trans) continue;

        if (orig.type !== trans.type) {
            errors.push(`[${i}] Type different: "${orig.type}" vs "${trans.type}"`);
        }

        if (orig.style !== trans.style) {
            errors.push(`[${i}] Style different: "${orig.style}" vs "${trans.style}"`);
        }

        if (orig.type === 'paragraph' && orig.heading !== trans.heading) {
            errors.push(`[${i}] Heading different: "${orig.heading}" vs "${trans.heading}"`);
        }

        // Verifier spacing
        if (JSON.stringify(orig.spacing) !== JSON.stringify(trans.spacing)) {
            errors.push(`[${i}] Spacing different`);
        }

        // Verifier que les children/segments ont le meme nombre d'elements
        if (orig.children && trans.children) {
            if (orig.children.length !== trans.children.length) {
                errors.push(`[${i}] Nombre de children different: ${orig.children.length} vs ${trans.children.length}`);
            }
        }
        if (orig.segments && trans.segments) {
            if (orig.segments.length !== trans.segments.length) {
                errors.push(`[${i}] Nombre de segments different: ${orig.segments.length} vs ${trans.segments.length}`);
            }
        }

        // Tables
        if (orig.type === 'table') {
            if (orig.headers && trans.headers && orig.headers.length !== trans.headers.length) {
                errors.push(`[${i}] Nombre de headers different`);
            }
            if (orig.rows && trans.rows && orig.rows.length !== trans.rows.length) {
                errors.push(`[${i}] Nombre de rows different`);
            }
        }
    }

    return errors;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error('Usage: node inject_translated.js <original.json> <translated_segments.json> <output.json>');
        process.exit(1);
    }

    const originalPath = path.resolve(args[0]);
    const translatedPath = path.resolve(args[1]);
    const outputPath = path.resolve(args[2]);

    if (!fs.existsSync(originalPath)) {
        console.error(`Fichier original non trouve: ${originalPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(translatedPath)) {
        console.error(`Fichier de segments traduits non trouve: ${translatedPath}`);
        process.exit(1);
    }

    // Charger l'original et en faire une copie profonde
    const original = JSON.parse(fs.readFileSync(originalPath, 'utf-8'));
    const output = JSON.parse(JSON.stringify(original)); // deep clone

    // Charger les segments traduits
    const segments = JSON.parse(fs.readFileSync(translatedPath, 'utf-8'));

    if (!Array.isArray(segments)) {
        console.error('Le fichier de segments doit contenir un tableau JSON');
        process.exit(1);
    }

    let injected = 0;
    let skipped = 0;
    let errors = 0;

    for (const segment of segments) {
        if (!segment.path) {
            console.warn('Segment sans chemin, ignore');
            skipped++;
            continue;
        }

        // Si marque doNotTranslate, on saute (le texte original est conserve)
        if (segment.doNotTranslate) {
            skipped++;
            continue;
        }

        const resolved = resolvePath(output, segment.path);
        if (!resolved) {
            console.error(`Chemin non resolvable: ${segment.path}`);
            errors++;
            continue;
        }

        const oldValue = resolved.parent[resolved.key];

        // Verifier que la valeur originale correspond
        // (le chemin existe mais le contenu original a peut-etre change)
        // On ne bloque pas, on avertit juste
        if (typeof oldValue !== 'string' && typeof oldValue !== 'undefined') {
            console.warn(`Chemin ${segment.path}: valeur originale n'est pas une chaine (${typeof oldValue})`);
        }

        // Injecter la traduction
        resolved.parent[resolved.key] = segment.text;
        injected++;
    }

    // Verification structurelle
    const parityErrors = checkStructuralParity(original, output);

    // Ecrire la sortie
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`Injection terminee: ${path.basename(outputPath)}`);
    console.log(`  Segments injectes:  ${injected}`);
    console.log(`  Segments ignores:   ${skipped} (DNT/vides)`);
    console.log(`  Erreurs de chemin:  ${errors}`);

    if (parityErrors.length > 0) {
        console.log(`\n  Alertes de parite structurelle:`);
        parityErrors.forEach(e => console.log(`    - ${e}`));
    } else {
        console.log(`  Parite structurelle: OK`);
    }

    if (errors > 0) {
        process.exit(1);
    }
}

main();
