#!/usr/bin/env node
/**
 * inject_illustrations.js
 *
 * Injects image references into the chapter JSON files for the Conscience Souveraine manual.
 * Each image element is inserted after the appropriate heading found by keyword search.
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.resolve(__dirname, '..', 'chapters');

// Helper: extract text from an element regardless of format
function getElementText(el) {
    if (!el) return '';
    // Style-based format (part5): has el.text directly
    if (typeof el.text === 'string') return el.text;
    // Legacy format (parts 1-4, 6): has el.children array
    if (Array.isArray(el.children)) {
        return el.children.map(c => c.text || '').join(' ');
    }
    return '';
}

// Helper: check if element is a heading
function isHeading(el) {
    if (!el) return false;
    // Legacy format
    if (el.heading && el.heading.startsWith('HEADING_')) return true;
    // Style-based format
    if (el.style && (el.style === 'ChapterTitle' || el.style === 'SectionTitle' || el.style === 'SubSection' || el.style === 'PartTitle')) return true;
    return false;
}

// Helper: check if element is body text (not a heading, table, etc.)
function isBodyText(el) {
    if (!el) return false;
    if (el.type !== 'paragraph') return false;
    if (isHeading(el)) return false;
    if (el.style === 'BodyText') return true;
    // Legacy format: paragraph without heading property, with children containing text
    if (!el.heading && !el.style && Array.isArray(el.children)) {
        const text = getElementText(el);
        return text.length > 0;
    }
    return false;
}

/**
 * Find insertion index after a heading matching keywords.
 * Searches for a heading containing ANY of the keywords (case-insensitive).
 * Returns the index AFTER the first body text paragraph following that heading,
 * or right after the heading if no body text follows.
 *
 * @param {Array} elements - The JSON elements array
 * @param {string[]} keywords - Keywords to search for in heading text
 * @param {number} defaultIndex - Fallback index if no match found
 * @returns {number} insertion index
 */
function findInsertionPoint(elements, keywords, defaultIndex) {
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!isHeading(el)) continue;

        const text = getElementText(el).toLowerCase();
        const matched = keywords.some(kw => text.includes(kw.toLowerCase()));
        if (!matched) continue;

        // Found the heading. Insert after the first body text paragraph following it.
        for (let j = i + 1; j < elements.length && j <= i + 3; j++) {
            if (isBodyText(elements[j])) {
                console.log(`    Found heading at index ${i}: "${getElementText(el).substring(0, 60)}..."`);
                console.log(`    Inserting after body text at index ${j}`);
                return j + 1;
            }
        }
        // No body text found within 3 elements, insert right after heading
        console.log(`    Found heading at index ${i}: "${getElementText(el).substring(0, 60)}..."`);
        console.log(`    Inserting right after heading at index ${i + 1}`);
        return i + 1;
    }

    console.log(`    Keywords not found, using default index ${defaultIndex}`);
    return defaultIndex;
}

function makeImageElement(filename, caption) {
    return {
        type: 'image',
        path: `illustrations/${filename}`,
        width: 600,
        height: 420,
        alignment: 'CENTER',
        caption: caption
    };
}

// Configuration: which illustrations go where
const injections = [
    {
        file: 'part1.json',
        images: [
            {
                filename: '02_sept_invariants.png',
                caption: 'Figure 1 — Les Sept Invariants de la Conscience Souveraine',
                keywords: ['sept invariant', 'les sept invariant', 'invariant i'],
                defaultOffset: 5 // after part title area
            }
        ]
    },
    {
        file: 'part2.json',
        images: [
            {
                filename: '03_douze_modules.png',
                caption: 'Figure 2 — Les Douze Modules Cognitifs',
                keywords: ['12 modules', 'douze modules', 'vue d\'ensemble', 'vue générale'],
                defaultOffset: 5
            },
            {
                filename: '04_chaine_serielle.png',
                caption: 'Figure 3 — La Chaîne de Traitement Sérielle',
                keywords: ['pipeline', 'traitement sériel', 'chaîne', 'raisonnement, évaluation', 'chapitre 8'],
                defaultOffset: 50
            }
        ]
    },
    {
        file: 'part3.json',
        images: [
            {
                filename: '01_substrat_toroidal.png',
                caption: 'Figure 4 — Le Substrat Toroïdal',
                keywords: ['géométrie toroïdale', 'cerveau physique', 'chapitre 10'],
                defaultOffset: 5
            },
            {
                filename: '05_couches_concentriques.png',
                caption: 'Figure 5 — Les Cinq Couches Concentriques du Tore',
                keywords: ['couches concentriques', 'cinq couches', 'anatomie du tore'],
                defaultOffset: 30
            }
        ]
    },
    {
        file: 'part4.json',
        images: [
            {
                filename: '08_gradient_densite.png',
                caption: 'Figure 6 — Le Gradient de Densité',
                keywords: ['gradient de densité', 'chapitre 15', 'optimisation centrifuge'],
                defaultOffset: 5
            },
            {
                filename: '06_halbach_levitation.png',
                caption: 'Figure 7 — La Lévitation par Array de Halbach',
                keywords: ['halbach', 'lévitation', 'chapitre 16'],
                defaultOffset: 40
            },
            {
                filename: '07_mediums_sensoriels.png',
                caption: 'Figure 8 — Les Cinq Médiums Sensoriels',
                keywords: ['médiums', 'cinq médiums', 'interface avec le monde', 'chapitre 17'],
                defaultOffset: 80
            }
        ]
    },
    {
        file: 'part5.json',
        images: [
            {
                filename: '09_reseau_tores.png',
                caption: 'Figure 9 — Le Réseau Inter-Tores',
                keywords: ['interconnexion inter-tores', 'réseau', 'chapitre 19'],
                defaultOffset: 5
            }
        ]
    },
    {
        file: 'part6.json',
        images: [
            {
                filename: '10_roadmap_trl.png',
                caption: 'Figure 10 — Évaluation TRL et Feuille de Route',
                keywords: ['trl', 'évaluation trl', 'chapitre 23', 'état de l\'art'],
                defaultOffset: 5
            }
        ]
    }
];

// Main execution
console.log('=== Injection des illustrations dans les fichiers JSON ===\n');

let totalInjected = 0;

for (const config of injections) {
    const filePath = path.join(CHAPTERS_DIR, config.file);

    if (!fs.existsSync(filePath)) {
        console.log(`[SKIP] ${config.file} — fichier non trouvé`);
        continue;
    }

    console.log(`[PROCESSING] ${config.file}`);
    const elements = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Track cumulative offset as we insert elements
    let offset = 0;

    for (const img of config.images) {
        console.log(`  Image: ${img.filename}`);

        // Check if already injected (avoid duplicates)
        const alreadyExists = elements.some(el =>
            el.type === 'image' && el.path && el.path.includes(img.filename)
        );
        if (alreadyExists) {
            console.log(`    Already injected, skipping.`);
            continue;
        }

        const insertIdx = findInsertionPoint(
            elements,
            img.keywords,
            Math.min(img.defaultOffset + offset, elements.length)
        );

        const imageEl = makeImageElement(img.filename, img.caption);
        elements.splice(insertIdx, 0, imageEl);
        offset++;
        totalInjected++;

        console.log(`    Inserted at index ${insertIdx}`);
    }

    fs.writeFileSync(filePath, JSON.stringify(elements, null, 2), 'utf-8');
    console.log(`  Saved ${config.file}\n`);
}

console.log(`=== Terminé : ${totalInjected} illustrations injectées ===`);
