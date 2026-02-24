/**
 * ASSEMBLE_BOOK2.JS — Assemblage de l'essai narratif "Conscience Souveraine"
 *
 * Livre 2 : Les Trois Piliers de la Souveraineté
 * (HYPERVORTEX / Gen_Home / UBLinx)
 *
 * Format: US Letter, Georgia corps, Arial titres
 * Footer: "David Berthelotte • Conscience Souveraine • UBLinx Protected • 2026"
 *
 * USAGE: node book2/scripts/assemble_book2.js
 */

const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, LevelFormat,
    TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
    VerticalAlign, PageNumber, PageBreak, SectionType
} = require('docx');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const OUTPUT_FILE = path.join(__dirname, '..', '..', 'Conscience_Souveraine_Essai_Trois_Piliers.docx');

// Sections à charger dans l'ordre
const SECTIONS = [
    'prologue.json',
    'acte1.json',
    'acte2.json',
    'acte3.json',
    'acte4.json',
    'epilogue.json'
];

// ============================================================================
// STYLE MAP — Format narratif (Georgia corps, Arial titres)
// ============================================================================

const STYLE_MAP = {
    // Titres d'Actes — grand, centré, Arial
    ActTitle: {
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 800, after: 400 },
        alignment: AlignmentType.CENTER,
        run: { bold: true, size: 44, font: 'Arial', color: '2C1810' }
    },
    // Sous-titre d'Acte (ex: "La Souveraineté Énergétique")
    ActSubtitle: {
        spacing: { before: 100, after: 600 },
        alignment: AlignmentType.CENTER,
        run: { italics: true, size: 28, font: 'Georgia', color: '8B4513' }
    },
    // Titre de chapitre
    ChapterTitle: {
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 600, after: 300 },
        run: { bold: true, size: 32, font: 'Arial', color: '2C1810' }
    },
    // Section dans un chapitre
    SectionTitle: {
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 360, after: 180 },
        run: { bold: true, size: 26, font: 'Arial', color: '4A3728' }
    },
    // Sous-section
    SubSection: {
        spacing: { before: 240, after: 120 },
        run: { bold: true, size: 24, font: 'Arial', color: '6B4F3A' }
    },
    // Corps de texte narratif — Georgia, plus grand, interligne confortable
    BodyText: {
        spacing: { before: 0, after: 180, line: 312 }, // 1.3 interligne
        run: { size: 24, font: 'Georgia' } // 12pt Georgia
    },
    // Scène d'ouverture — italique, légèrement en retrait
    SceneText: {
        spacing: { before: 120, after: 180, line: 312 },
        indent: { left: 360, right: 360 },
        run: { italics: true, size: 24, font: 'Georgia', color: '333333' }
    },
    // Citation/réflexion en exergue
    Quote: {
        spacing: { before: 240, after: 240, line: 312 },
        indent: { left: 720, right: 720 },
        border: {
            left: { style: BorderStyle.SINGLE, size: 8, color: '8B4513' }
        },
        run: { italics: true, size: 24, font: 'Georgia', color: '555555' }
    },
    // Thèse / citation importante centrée
    Thesis: {
        spacing: { before: 360, after: 360, line: 312 },
        indent: { left: 720, right: 720 },
        alignment: AlignmentType.CENTER,
        run: { bold: true, italics: true, size: 26, font: 'Georgia', color: '2C1810' }
    },
    // Donnée technique (rare, juste quand nécessaire)
    TechNote: {
        spacing: { before: 120, after: 120, line: 276 },
        indent: { left: 360, right: 360 },
        shading: { fill: 'F5F0EB', type: ShadingType.CLEAR },
        border: {
            left: { style: BorderStyle.SINGLE, size: 4, color: '8B4513' }
        },
        run: { size: 22, font: 'Arial', color: '4A3728' }
    },
    // Note d'autocritique / avertissement
    CritiqueBox: {
        spacing: { before: 180, after: 180, line: 276 },
        indent: { left: 360, right: 360 },
        border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'CC0000' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '999999' }
        },
        shading: { fill: 'FFF5F5', type: ShadingType.CLEAR },
        run: { size: 22, font: 'Georgia', color: '660000' }
    },
    // Question au lecteur
    ReaderQuestion: {
        spacing: { before: 240, after: 240, line: 312 },
        alignment: AlignmentType.CENTER,
        run: { italics: true, size: 26, font: 'Georgia', color: '2C1810' }
    },
    // Séparateur (astérisques ou espace)
    Separator: {
        spacing: { before: 240, after: 240 },
        alignment: AlignmentType.CENTER,
        run: { size: 24, font: 'Georgia', color: '999999' }
    },
    // Épigraphe en début de chapitre
    Epigraph: {
        spacing: { before: 120, after: 360, line: 276 },
        alignment: AlignmentType.RIGHT,
        indent: { left: 3600 },
        run: { italics: true, size: 22, font: 'Georgia', color: '888888' }
    }
};

// ============================================================================
// CONVERSION JSON → DOCX ELEMENTS
// ============================================================================

function jsonToDocx(element) {
    if (!element || !element.type) return null;

    switch (element.type) {
        case 'paragraph': {
            const opts = {};

            // Custom style-based format
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

                opts.children = [new TextRun({
                    text: element.text || '',
                    ...(s.run || {})
                })];

                return new Paragraph(opts);
            }

            // Fallback for plain paragraphs
            if (element.text) {
                opts.spacing = { before: 0, after: 180, line: 312 };
                opts.children = [new TextRun({ text: element.text, size: 24, font: 'Georgia' })];
            }

            return new Paragraph(opts);
        }

        case 'richParagraph': {
            const baseStyle = element.style && STYLE_MAP[element.style] ? STYLE_MAP[element.style] : {};
            const children = (element.segments || []).map(seg => new TextRun({
                text: seg.text || '',
                bold: seg.bold || (baseStyle.run && baseStyle.run.bold) || false,
                italics: seg.italics || (baseStyle.run && baseStyle.run.italics) || false,
                size: seg.size || (baseStyle.run && baseStyle.run.size) || 24,
                font: seg.font || (baseStyle.run && baseStyle.run.font) || 'Georgia',
                color: seg.color || (baseStyle.run && baseStyle.run.color) || undefined,
                underline: seg.underline ? {} : undefined,
            }));
            const opts = {
                spacing: baseStyle.spacing || { before: 0, after: 180, line: 312 },
                children
            };
            if (baseStyle.indent) opts.indent = baseStyle.indent;
            if (baseStyle.alignment) opts.alignment = baseStyle.alignment;
            return new Paragraph(opts);
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
            const totalWidth = element.width || 9360; // US Letter width

            if (element.headers && element.headers.length > 0) {
                tableRows.push(new TableRow({
                    tableHeader: true,
                    children: element.headers.map((h, i) => new TableCell({
                        borders,
                        width: { size: widths[i] || Math.floor(totalWidth / element.headers.length), type: WidthType.DXA },
                        shading: { fill: '2C1810', type: ShadingType.CLEAR },
                        margins: cellMargins,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: String(h), bold: true, color: 'FFFFFF', size: 22, font: 'Arial' })]
                        })]
                    }))
                }));
            }

            if (element.rows) {
                element.rows.forEach((row, rowIdx) => {
                    tableRows.push(new TableRow({
                        children: row.map((cell, i) => new TableCell({
                            borders,
                            width: { size: widths[i] || Math.floor(totalWidth / row.length), type: WidthType.DXA },
                            shading: rowIdx % 2 === 0
                                ? { fill: 'F5F0EB', type: ShadingType.CLEAR }
                                : { fill: 'FFFFFF', type: ShadingType.CLEAR },
                            margins: cellMargins,
                            children: [new Paragraph({
                                children: [new TextRun({ text: String(cell), size: 22, font: 'Georgia' })]
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
    console.log('📖 Assemblage de l\'Essai Narratif — Les Trois Piliers de la Souveraineté');
    console.log('='.repeat(70));

    const allElements = [];
    let totalElements = 0;

    for (const sectionFile of SECTIONS) {
        const filepath = path.join(CHAPTERS_DIR, sectionFile);
        if (!fs.existsSync(filepath)) {
            console.log(`  ⏭️  ${sectionFile} — non trouvé, ignoré`);
            continue;
        }

        const json = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        console.log(`  ✅ ${sectionFile} — ${json.length} éléments`);
        allElements.push(...json);
        totalElements += json.length;
    }

    console.log(`\n📊 Total: ${totalElements} éléments`);

    const docxElements = allElements
        .map(jsonToDocx)
        .filter(e => e !== null);

    console.log(`📄 Éléments docx: ${docxElements.length}`);

    // Page de couverture
    const coverPage = [
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: 'CONSCIENCE SOUVERAINE',
                bold: true, size: 56, font: 'Arial', color: '2C1810'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [new TextRun({
                text: '_______________',
                size: 28, font: 'Georgia', color: '8B4513'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [new TextRun({
                text: 'Les Trois Piliers de la Souveraineté',
                italics: true, size: 32, font: 'Georgia', color: '4A3728'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [new TextRun({
                text: 'Énergie • Intelligence • Réseau',
                size: 24, font: 'Georgia', color: '8B4513'
            })]
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: 'David Berthelotte',
                bold: true, size: 28, font: 'Arial', color: '2C1810'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: 'Québec, Canada • 2026',
                size: 22, font: 'Georgia', color: '666666'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: 'Licence UBLinx Open Innovation v1.0',
                italics: true, size: 20, font: 'Georgia', color: '888888'
            })]
        }),
        new Paragraph({ children: [new PageBreak()] }),
    ];

    // US Letter: 12240 x 15840 twips (8.5 x 11 inches)
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: 'Georgia', size: 24 } // 12pt Georgia par défaut
                }
            },
            paragraphStyles: [
                {
                    id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                    run: { size: 44, bold: true, font: 'Arial', color: '2C1810' },
                    paragraph: { spacing: { before: 800, after: 400 }, outlineLevel: 0 }
                },
                {
                    id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                    run: { size: 32, bold: true, font: 'Arial', color: '2C1810' },
                    paragraph: { spacing: { before: 600, after: 300 }, outlineLevel: 1 }
                },
                {
                    id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                    run: { size: 26, bold: true, font: 'Arial', color: '4A3728' },
                    paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 2 }
                }
            ]
        },
        numbering: {
            config: [{
                reference: 'bullets',
                levels: [{
                    level: 0, format: LevelFormat.BULLET, text: '•',
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } }
                }]
            }]
        },
        sections: [{
            properties: {
                page: {
                    size: { width: 12240, height: 15840 }, // US Letter
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch
                }
            },
            headers: {
                default: new Header({
                    children: [new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [new TextRun({
                            text: 'Conscience Souveraine — Les Trois Piliers',
                            italics: true, size: 18, font: 'Georgia', color: '999999'
                        })]
                    })]
                })
            },
            footers: {
                default: new Footer({
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: 'David Berthelotte ', size: 16, font: 'Georgia', color: '999999' }),
                            new TextRun({ text: '• Conscience Souveraine • UBLinx Protected • 2026 — ', size: 16, font: 'Georgia', color: '999999' }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Georgia', color: '999999' }),
                        ]
                    })]
                })
            },
            children: [
                ...coverPage,
                // Table des matières
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

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(OUTPUT_FILE, buffer);

    const sizeKB = Math.round(buffer.length / 1024);

    console.log(`\n✅ Essai généré: ${OUTPUT_FILE}`);
    console.log(`   Taille: ${sizeKB} KB`);
    console.log(`   Éléments: ${docxElements.length}`);
}

assemble().catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
