/**
 * ASSEMBLE_BOOK2.JS — Assemblage de l'essai narratif "Conscience Souveraine"
 *
 * Livre 2 : Les Trois Piliers de la Souveraineté
 * (HYPERVORTEX / Gen_Home / UBLinx)
 *
 * Format: US Letter, Georgia corps, Arial titres
 * Footer: "David Berthelotte • Conscience Souveraine • UBLinx Protected • 2026"
 *
 * USAGE: node book2/scripts/assemble_book2.js [--lang fr|en|es]
 */

const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, LevelFormat,
    TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
    VerticalAlign, PageNumber, PageBreak, SectionType,
    ImageRun
} = require('docx');

// ============================================================================
// CONFIGURATION
// ============================================================================

// Parse --lang argument (default: fr)
const langArg = process.argv.find(a => a === '--lang');
const LANG = langArg ? process.argv[process.argv.indexOf(langArg) + 1] || 'fr' : 'fr';
if (!['fr', 'en', 'es'].includes(LANG)) {
    console.error(`Langue non supportee: ${LANG}. Utiliser fr, en ou es.`);
    process.exit(1);
}

// Charger les chaines localisees
const STRINGS_PATH = path.join(__dirname, '..', '..', 'i18n', `strings_${LANG}.json`);
let strings = {};
if (fs.existsSync(STRINGS_PATH)) {
    strings = JSON.parse(fs.readFileSync(STRINGS_PATH, 'utf-8'));
}

const CHAPTERS_DIR = LANG === 'fr'
    ? path.join(__dirname, '..', 'chapters')
    : path.join(__dirname, '..', 'chapters', LANG);
const OUTPUT_FILE = path.join(__dirname, '..', '..', strings.output_file_book2 || 'Conscience_Souveraine_Essai_Trois_Piliers.docx');

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

        case 'image': {
            const imgPath = path.resolve(__dirname, '..', '..', element.path);
            if (!fs.existsSync(imgPath)) {
                console.warn(`Image non trouvée: ${imgPath}`);
                return null;
            }

            const imageData = fs.readFileSync(imgPath);
            const imgWidth = element.width || 500;
            const imgHeight = element.height || 350;
            const alignment = AlignmentType[element.alignment] || AlignmentType.CENTER;

            const elements = [];

            elements.push(new Paragraph({
                alignment,
                spacing: { before: 240, after: element.caption ? 60 : 240 },
                children: [
                    new ImageRun({
                        data: imageData,
                        transformation: { width: imgWidth, height: imgHeight },
                        type: 'png'
                    })
                ]
            }));

            if (element.caption) {
                elements.push(new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 60, after: 240 },
                    children: [new TextRun({
                        text: element.caption,
                        italics: true,
                        size: 18,
                        font: 'Georgia',
                        color: '666666'
                    })]
                }));
            }

            return elements;
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

    // ---- Charger le prologue séparément pour extraire la dédicace ----
    const prologuePath = path.join(CHAPTERS_DIR, 'prologue.json');
    const prologueJson = JSON.parse(fs.readFileSync(prologuePath, 'utf-8'));
    console.log(`  ✅ prologue.json — ${prologueJson.length} éléments`);

    // Le prologue commence par : titre (ActTitle) + sous-titre (ActSubtitle) + pageBreak
    // puis la dédicace, puis pageBreak, puis le contenu du prologue.
    // On saute le titre (doublon avec la couverture) et on extrait la dédicace.

    // Trouver le premier pageBreak (fin du titre dupliqué)
    let firstPageBreakIdx = -1;
    for (let i = 0; i < prologueJson.length; i++) {
        if (prologueJson[i].type === 'pageBreak') { firstPageBreakIdx = i; break; }
    }

    // Trouver le deuxième pageBreak (fin de la dédicace)
    let secondPageBreakIdx = -1;
    for (let i = firstPageBreakIdx + 1; i < prologueJson.length; i++) {
        if (prologueJson[i].type === 'pageBreak') { secondPageBreakIdx = i; break; }
    }

    // Dédicace = éléments entre le premier et le deuxième pageBreak (exclus)
    const dedicaceElements = prologueJson.slice(firstPageBreakIdx + 1, secondPageBreakIdx + 1); // inclut le pageBreak final
    // Contenu du prologue = tout après le deuxième pageBreak
    const prologueContent = prologueJson.slice(secondPageBreakIdx + 1);

    console.log(`  📐 Prologue split: ${dedicaceElements.length} éléments dédicace, ${prologueContent.length} éléments contenu`);

    // ---- Charger les autres sections (incluant l'interlude autocritique avant l'épilogue) ----
    const otherSections = ['acte1.json', 'acte2.json', 'acte3.json', 'acte4.json', 'autocritique_essai.json', 'epilogue.json'];
    const contentElements = [...prologueContent];

    for (const sectionFile of otherSections) {
        const filepath = path.join(CHAPTERS_DIR, sectionFile);
        if (!fs.existsSync(filepath)) {
            console.log(`  ⏭️  ${sectionFile} — non trouvé, ignoré`);
            continue;
        }
        const json = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        console.log(`  ✅ ${sectionFile} — ${json.length} éléments`);
        contentElements.push(...json);
    }

    // Convertir en éléments docx
    const dedicaceDocx = dedicaceElements.map(jsonToDocx).filter(e => e !== null).flat();
    const contentDocx = contentElements.map(jsonToDocx).filter(e => e !== null).flat();
    const totalDocx = dedicaceDocx.length + contentDocx.length;

    console.log(`\n📄 Éléments docx: ${totalDocx} (${dedicaceDocx.length} dédicace + ${contentDocx.length} contenu)`);

    // Page de couverture
    const coverPage = [
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: strings.cover_title || 'CONSCIENCE SOUVERAINE',
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
                text: strings.cover_subtitle || 'Les Trois Piliers de la Souveraineté',
                italics: true, size: 32, font: 'Georgia', color: '4A3728'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [new TextRun({
                text: strings.cover_pillars || 'Énergie • Intelligence • Réseau',
                size: 24, font: 'Georgia', color: '8B4513'
            })]
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: strings.cover_author || 'David Berthelotte',
                bold: true, size: 28, font: 'Arial', color: '2C1810'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: strings.cover_location || 'Québec, Canada • 2026',
                size: 22, font: 'Georgia', color: '666666'
            })]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({
                text: strings.cover_license || 'Licence UBLinx Open Innovation v1.0',
                italics: true, size: 20, font: 'Georgia', color: '888888'
            })]
        }),
        new Paragraph({ children: [new PageBreak()] }),
    ];

    // US Letter: 12240 x 15840 twips (8.5 x 11 inches)
    // Ordre : Couverture → Dédicace → Table des matières → Contenu
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
                            text: strings.header_book2 || 'Conscience Souveraine — Les Trois Piliers',
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
                            new TextRun({ text: (strings.footer_book2 || 'David Berthelotte • Conscience Souveraine • UBLinx Protected • 2026') + ' — ', size: 16, font: 'Georgia', color: '999999' }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Georgia', color: '999999' }),
                        ]
                    })]
                })
            },
            children: [
                // 1. Page de couverture
                ...coverPage,
                // 2. Dédicace (extraite du prologue)
                ...dedicaceDocx,
                // 3. Table des matières
                new TableOfContents(strings.toc_title_book2 || "Table des matières", {
                    hyperlink: true,
                    headingStyleRange: "1-2"
                }),
                new Paragraph({ children: [new PageBreak()] }),
                // 4. Contenu (prologue + actes + épilogue)
                ...contentDocx
            ]
        }]
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(OUTPUT_FILE, buffer);

    const sizeKB = Math.round(buffer.length / 1024);

    console.log(`\n✅ Essai généré: ${OUTPUT_FILE}`);
    console.log(`   Taille: ${sizeKB} KB`);
    console.log(`   Éléments: ${totalDocx}`);
}

assemble().catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
});
