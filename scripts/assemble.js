/**
 * ASSEMBLE.JS — Assemblage final du Manuel Conscience Souveraine
 * 
 * Charge tous les fichiers JSON de parties (chapters/part*.json),
 * les combine en un seul document docx avec TOC, en-têtes, pieds de page.
 * 
 * USAGE: node scripts/assemble.js
 * OUTPUT: Conscience_Souveraine_Manuel_400p.docx
 * 
 * INSTALLATION: npm install docx
 */

const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, LevelFormat,
    TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
    VerticalAlign, PageNumber, PageBreak, SectionType,
    PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
    TabStopType, TabStopPosition
} = require('docx');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const OUTPUT_FILE = path.join(__dirname, '..', 'Conscience_Souveraine_Manuel_400p.docx');

// Parts à charger dans l'ordre
const PARTS = [
    'preliminaires.json',
    'part1.json',
    'part2.json', 
    'part3.json',
    'part4.json',
    'part5.json',
    'part6.json',
    'annexes.json'
];

// ============================================================================
// STYLES DU DOCUMENT
// ============================================================================

const docStyles = {
    default: {
        document: {
            run: { font: 'Arial', size: 22 } // 11pt par défaut
        }
    },
    paragraphStyles: [
        {
            id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
            run: { size: 36, bold: true, font: 'Arial', color: '1B3A5C' },
            paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 }
        },
        {
            id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
            run: { size: 28, bold: true, font: 'Arial', color: '2E5D8C' },
            paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 }
        },
        {
            id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
            run: { size: 24, bold: true, font: 'Arial', color: '4A7FB5' },
            paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
        }
    ]
};

// Numbering config pour les listes
const numberingConfig = {
    config: [
        {
            reference: 'bullets',
            levels: [{
                level: 0, format: LevelFormat.BULLET, text: '•',
                alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } }
            }]
        },
        {
            reference: 'numbers',
            levels: [{
                level: 0, format: LevelFormat.DECIMAL, text: '%1.',
                alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } }
            }]
        }
    ]
};

// ============================================================================
// CONVERSION JSON → DOCX ELEMENTS
// ============================================================================

const HEADING_MAP = {
    'HEADING_1': HeadingLevel.HEADING_1,
    'HEADING_2': HeadingLevel.HEADING_2,
    'HEADING_3': HeadingLevel.HEADING_3,
};

/**
 * Style map: maps our custom style names to docx-js properties.
 * Our generation scripts produce elements with:
 *   { type: 'paragraph', style: 'PartTitle|ChapterTitle|SectionTitle|...', text: '...' }
 *   { type: 'richParagraph', segments: [{text, bold, italics, ...}] }
 *   { type: 'table', headers: [...], rows: [[...]] }
 *   { type: 'pageBreak' }
 */
const STYLE_MAP = {
    PartTitle: {
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 300 },
        alignment: AlignmentType.CENTER,
        run: { bold: true, size: 40, font: 'Arial', color: '1B3A5C' }
    },
    ChapterTitle: {
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 480, after: 240 },
        run: { bold: true, size: 36, font: 'Arial', color: '1B3A5C' }
    },
    SectionTitle: {
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 360, after: 180 },
        run: { bold: true, size: 28, font: 'Arial', color: '2E5D8C' }
    },
    SubSection: {
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 240, after: 120 },
        run: { bold: true, size: 24, font: 'Arial', color: '4A7FB5' }
    },
    BodyText: {
        spacing: { before: 60, after: 120, line: 276 },
        run: { size: 22, font: 'Arial' }
    },
    Quote: {
        spacing: { before: 120, after: 120, line: 276 },
        indent: { left: 720, right: 720 },
        border: {
            left: { style: BorderStyle.SINGLE, size: 6, color: '2E5D8C' }
        },
        run: { italics: true, size: 22, font: 'Arial', color: '555555' }
    },
    Formula: {
        spacing: { before: 120, after: 120 },
        alignment: AlignmentType.CENTER,
        indent: { left: 720, right: 720 },
        shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
        run: { bold: true, size: 22, font: 'Courier New', color: '333333' }
    },
    NoteBox: {
        spacing: { before: 120, after: 120, line: 276 },
        indent: { left: 360, right: 360 },
        border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '2E5D8C' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '2E5D8C' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '2E5D8C' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '2E5D8C' }
        },
        shading: { fill: 'EDF4FB', type: ShadingType.CLEAR },
        run: { size: 20, font: 'Arial', color: '1B3A5C' }
    }
};

/**
 * Convertit un élément JSON en élément docx-js
 * Handles both the legacy format (with children array) and our custom format (with style + text).
 */
function jsonToDocx(element) {
    if (!element || !element.type) return null;

    switch (element.type) {
        case 'paragraph': {
            const opts = {};

            // ------- Custom style-based format (from our generate scripts) -------
            if (element.style && STYLE_MAP[element.style]) {
                const s = STYLE_MAP[element.style];

                if (s.heading) opts.heading = s.heading;
                if (s.spacing) opts.spacing = s.spacing;
                if (s.alignment) opts.alignment = s.alignment;
                if (s.indent) opts.indent = s.indent;
                if (s.border) {
                    opts.border = {};
                    for (const side of ['top', 'bottom', 'left', 'right']) {
                        if (s.border[side]) opts.border[side] = s.border[side];
                    }
                }
                if (s.shading) opts.shading = s.shading;

                if (element.pageBreakBefore) opts.pageBreakBefore = true;

                // Build text run from element.text
                opts.children = [new TextRun({
                    text: element.text || '',
                    ...(s.run || {})
                })];

                return new Paragraph(opts);
            }

            // ------- Legacy format (with heading + children array) -------
            if (element.heading && HEADING_MAP[element.heading]) {
                opts.heading = HEADING_MAP[element.heading];
            }
            if (element.spacing) opts.spacing = element.spacing;
            if (element.alignment) {
                opts.alignment = AlignmentType[element.alignment] || AlignmentType.LEFT;
            }
            if (element.indent) opts.indent = element.indent;
            if (element.border) {
                opts.border = {};
                for (const side of ['top', 'bottom', 'left', 'right']) {
                    if (element.border[side]) {
                        opts.border[side] = {
                            style: BorderStyle[element.border[side].style] || BorderStyle.SINGLE,
                            size: element.border[side].size || 1,
                            color: element.border[side].color || '000000'
                        };
                    }
                }
            }
            if (element.pageBreakBefore) opts.pageBreakBefore = true;
            if (element.numbering) opts.numbering = element.numbering;

            // Children (TextRuns)
            opts.children = (element.children || []).map(child => {
                if (child.type === 'text') {
                    return new TextRun({
                        text: child.text || '',
                        bold: child.bold || false,
                        italics: child.italics || false,
                        size: child.size || 22,
                        font: child.font || 'Arial',
                        color: child.color || undefined,
                        underline: child.underline ? {} : undefined,
                        superScript: child.superScript || false,
                        subScript: child.subScript || false,
                    });
                }
                return new TextRun({ text: '' });
            });

            // Fallback: if we have text but no children, create a simple text run
            if ((!opts.children || opts.children.length === 0) && element.text) {
                opts.children = [new TextRun({ text: element.text, size: 22, font: 'Arial' })];
            }

            return new Paragraph(opts);
        }

        case 'richParagraph': {
            // Custom format with segments array
            const children = (element.segments || []).map(seg => new TextRun({
                text: seg.text || '',
                bold: seg.bold || false,
                italics: seg.italics || false,
                size: seg.size || 22,
                font: seg.font || 'Arial',
                color: seg.color || undefined,
                underline: seg.underline ? {} : undefined,
            }));
            return new Paragraph({
                spacing: { before: 60, after: 120, line: 276 },
                children
            });
        }

        case 'pageBreak': {
            return new Paragraph({
                children: [new PageBreak()]
            });
        }

        case 'table': {
            const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
            const borders = { top: border, bottom: border, left: border, right: border };
            const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

            const tableRows = [];
            const widths = element.columnWidths || [];
            const totalWidth = element.width || 9026;

            // Header row
            if (element.headers && element.headers.length > 0) {
                tableRows.push(new TableRow({
                    tableHeader: true,
                    children: element.headers.map((h, i) => new TableCell({
                        borders,
                        width: { size: widths[i] || Math.floor(totalWidth / element.headers.length), type: WidthType.DXA },
                        shading: { fill: '1B3A5C', type: ShadingType.CLEAR },
                        margins: cellMargins,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: String(h), bold: true, color: 'FFFFFF', size: 20, font: 'Arial' })]
                        })]
                    }))
                }));
            }

            // Data rows
            if (element.rows) {
                element.rows.forEach((row, rowIdx) => {
                    tableRows.push(new TableRow({
                        children: row.map((cell, i) => new TableCell({
                            borders,
                            width: { size: widths[i] || Math.floor(totalWidth / row.length), type: WidthType.DXA },
                            shading: rowIdx % 2 === 0
                                ? { fill: 'F2F7FB', type: ShadingType.CLEAR }
                                : { fill: 'FFFFFF', type: ShadingType.CLEAR },
                            margins: cellMargins,
                            children: [new Paragraph({
                                children: [new TextRun({ text: String(cell), size: 20, font: 'Arial' })]
                            })]
                        }))
                    }));
                });
            }

            if (tableRows.length === 0) return null;

            return new Table({
                width: { size: totalWidth, type: WidthType.DXA },
                columnWidths: widths,
                rows: tableRows
            });
        }

        default:
            console.warn(`Unknown element type: ${element.type}`);
            return null;
    }
}

// ============================================================================
// ASSEMBLAGE
// ============================================================================

async function assemble() {
    console.log('🔧 Assemblage du Manuel Conscience Souveraine');
    console.log('='.repeat(60));
    
    // Charger toutes les parties
    const allElements = [];
    let totalElements = 0;
    
    for (const partFile of PARTS) {
        const filepath = path.join(CHAPTERS_DIR, partFile);
        if (!fs.existsSync(filepath)) {
            console.log(`  ⏭️  ${partFile} — non trouvé, ignoré`);
            continue;
        }
        
        const json = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        console.log(`  ✅ ${partFile} — ${json.length} éléments`);
        allElements.push(...json);
        totalElements += json.length;
    }
    
    console.log(`\n📊 Total: ${totalElements} éléments`);
    
    // Convertir en éléments docx-js
    const docxElements = allElements
        .map(jsonToDocx)
        .filter(e => e !== null);
    
    console.log(`📄 Éléments docx: ${docxElements.length}`);
    
    // Créer le document
    const doc = new Document({
        styles: docStyles,
        numbering: numberingConfig,
        sections: [{
            properties: {
                page: {
                    size: { width: 11906, height: 16838 }, // A4
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
                }
            },
            headers: {
                default: new Header({
                    children: [new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [new TextRun({
                            text: 'Conscience Souveraine — Manuel Complet',
                            italics: true, size: 16, font: 'Arial', color: '999999'
                        })]
                    })]
                })
            },
            footers: {
                default: new Footer({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: '— ', size: 16, font: 'Arial', color: '999999' }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Arial', color: '999999' }),
                            new TextRun({ text: ' —', size: 16, font: 'Arial', color: '999999' }),
                        ]
                    })]
                })
            },
            children: [
                // Table des matières (sera mise à jour par Word/LibreOffice)
                new TableOfContents("Table des matières", {
                    hyperlink: true,
                    headingStyleRange: "1-3"
                }),
                new Paragraph({ children: [new PageBreak()] }),
                // Contenu assemblé
                ...docxElements
            ]
        }]
    });
    
    // Générer le fichier
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(OUTPUT_FILE, buffer);
    
    const sizeKB = Math.round(buffer.length / 1024);
    const estimatedPages = Math.round(docxElements.filter(e => e instanceof Paragraph).length / 3);
    
    console.log(`\n✅ Manuel généré: ${OUTPUT_FILE}`);
    console.log(`   Taille: ${sizeKB} KB`);
    console.log(`   Éléments: ${docxElements.length}`);
    console.log(`   Pages estimées: ~${estimatedPages}`);
}

assemble().catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
