/**
 * TEMPLATE : Génération d'une partie du Manuel Conscience Souveraine
 * 
 * Ce template montre la structure que chaque generate_partN.js doit suivre.
 * Chaque script de partie produit un fichier JSON contenant les sections docx-js.
 * Le script assemble.js les réunit en un seul .docx.
 * 
 * USAGE: node scripts/generate_partN.js
 * OUTPUT: chapters/partN.json
 * 
 * INSTALLATION PRÉALABLE: npm install docx
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const PART_NUMBER = 0; // Changer pour chaque partie (1-6)
const PART_TITLE = "TEMPLATE";
const OUTPUT_FILE = path.join(__dirname, '..', 'chapters', `part${PART_NUMBER}.json`);

// ============================================================================
// HELPERS - Fonctions réutilisables
// ============================================================================

/**
 * Crée un paragraphe de titre de partie (page de garde)
 */
function partTitle(text) {
    return {
        type: 'paragraph',
        heading: 'HEADING_1',
        spacing: { before: 4800, after: 600 },
        alignment: 'CENTER',
        children: [{ type: 'text', text, bold: true, size: 48, font: 'Arial' }]
    };
}

/**
 * Crée un titre de chapitre (Heading 1)
 */
function chapterTitle(number, text) {
    return {
        type: 'paragraph',
        heading: 'HEADING_1',
        spacing: { before: 480, after: 240 },
        pageBreakBefore: true,
        children: [{ type: 'text', text: `Chapitre ${number} — ${text}`, bold: true, size: 36, font: 'Arial' }]
    };
}

/**
 * Crée un sous-titre de section (Heading 2)
 */
function sectionTitle(number, text) {
    return {
        type: 'paragraph',
        heading: 'HEADING_2',
        spacing: { before: 360, after: 180 },
        children: [{ type: 'text', text: `${number} ${text}`, bold: true, size: 28, font: 'Arial' }]
    };
}

/**
 * Crée un sous-sous-titre (Heading 3)
 */
function subSectionTitle(number, text) {
    return {
        type: 'paragraph',
        heading: 'HEADING_3',
        spacing: { before: 240, after: 120 },
        children: [{ type: 'text', text: `${number} ${text}`, bold: true, size: 24, font: 'Arial' }]
    };
}

/**
 * Crée un paragraphe de corps de texte
 * IMPORTANT : Pour du texte avec mise en forme mixte (gras partiel, italique),
 * utiliser la version avec children[] de TextRun multiples.
 */
function bodyText(text) {
    return {
        type: 'paragraph',
        spacing: { after: 120, line: 276 }, // 1.15 interligne = 276 twips
        children: [{ type: 'text', text, size: 22, font: 'Arial' }] // 11pt
    };
}

/**
 * Crée un paragraphe avec mise en forme mixte
 * @param {Array} runs - [{text, bold, italic, size, font}]
 */
function richText(runs) {
    return {
        type: 'paragraph',
        spacing: { after: 120, line: 276 },
        children: runs.map(r => ({
            type: 'text',
            text: r.text,
            bold: r.bold || false,
            italics: r.italic || false,
            size: r.size || 22,
            font: r.font || 'Arial'
        }))
    };
}

/**
 * Crée une citation en retrait
 */
function quote(text) {
    return {
        type: 'paragraph',
        spacing: { after: 120, line: 276 },
        indent: { left: 720, right: 720 },
        children: [{ type: 'text', text, italics: true, size: 22, font: 'Arial' }]
    };
}

/**
 * Crée un saut de page
 */
function pageBreak() {
    return { type: 'pageBreak' };
}

/**
 * Crée un tableau simple
 * @param {string[]} headers - En-têtes de colonnes
 * @param {string[][]} rows - Lignes de données
 * @param {number[]} widths - Largeurs en DXA (doivent sommer à 9026 pour A4)
 */
function simpleTable(headers, rows, widths) {
    return {
        type: 'table',
        width: 9026,
        columnWidths: widths,
        headers,
        rows
    };
}

/**
 * Crée un encadré "Note importante"
 */
function noteBox(text) {
    return {
        type: 'paragraph',
        spacing: { before: 240, after: 240 },
        border: {
            top: { style: 'SINGLE', size: 1, color: '2E75B6' },
            bottom: { style: 'SINGLE', size: 1, color: '2E75B6' },
            left: { style: 'SINGLE', size: 6, color: '2E75B6' },
            right: { style: 'SINGLE', size: 1, color: '2E75B6' },
        },
        indent: { left: 360, right: 360 },
        children: [
            { type: 'text', text: '💡 Note : ', bold: true, size: 22, font: 'Arial' },
            { type: 'text', text, size: 22, font: 'Arial' }
        ]
    };
}

/**
 * Crée un bloc de formule (centré, plus grand)
 */
function formula(text) {
    return {
        type: 'paragraph',
        spacing: { before: 240, after: 240 },
        alignment: 'CENTER',
        children: [{ type: 'text', text, italics: true, size: 24, font: 'Cambria Math' }]
    };
}

// ============================================================================
// CONTENU DE LA PARTIE
// ============================================================================

function generateContent() {
    const elements = [];
    
    // Page de garde de la partie
    elements.push(partTitle(`PARTIE ${PART_NUMBER}`));
    elements.push(bodyText(PART_TITLE));
    elements.push(pageBreak());
    
    // --- CHAPITRE N ---
    // elements.push(chapterTitle(N, "Titre du Chapitre"));
    // elements.push(sectionTitle("N.1", "Première Section"));
    // elements.push(bodyText("Contenu développé..."));
    // ... etc
    
    return elements;
}

// ============================================================================
// EXÉCUTION
// ============================================================================

const content = generateContent();

// Créer le dossier chapters si nécessaire
const chaptersDir = path.join(__dirname, '..', 'chapters');
if (!fs.existsSync(chaptersDir)) {
    fs.mkdirSync(chaptersDir, { recursive: true });
}

// Écrire le JSON intermédiaire
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));

console.log(`✅ Part ${PART_NUMBER} generated: ${content.length} elements`);
console.log(`   Output: ${OUTPUT_FILE}`);
console.log(`   Estimated pages: ~${Math.round(content.filter(e => e.type === 'paragraph').length / 3)}`);
