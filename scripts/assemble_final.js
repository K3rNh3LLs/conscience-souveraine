"use strict";

const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, LevelFormat,
    TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
    VerticalAlign, PageNumber, PageBreak, SectionType,
} = require('docx');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const OUTPUT_FILE_MANUEL = path.join(__dirname, '..', 'Conscience_Souveraine_Manuel_400p_Final.docx');
const OUTPUT_FILE_ESSAI = path.join(__dirname, '..', 'Conscience_Souveraine_Essai_Trois_Piliers_Final.docx');

// Fichiers JSON à charger pour chaque livre
const MANUEL_PARTS = [
    'preliminaires.json',
    'part1.json',
    'part2.json',
    'part3.json',
    'part4.json',
    'part5.json',
    'part6.json',
    'annexes.json'
];

const ESSAI_PARTS = [
    'Conscience_Souveraine_Essai_Trois_Piliers.json'
];

// ============================================================================
// STYLES DU DOCUMENT (identique à l'original)
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
        },
    ]
};

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
// CONVERSION JSON → DOCX ELEMENTS (identique à l'original)
// ============================================================================

const HEADING_MAP = {
    'HEADING_1': HeadingLevel.HEADING_1,
    'HEADING_2': HeadingLevel.HEADING_2,
    'HEADING_3': HeadingLevel.HEADING_3,
};

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

function jsonToDocx(element) {
    if (!element || !element.type) return null;

    switch (element.type) {
        case 'paragraph': {
            const opts = {};

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

            if ((!opts.children || opts.children.length === 0) && element.text) {
                opts.children = [new TextRun({ text: element.text, size: 22, font: 'Arial' })];
            }

            return new Paragraph(opts);
        }

        case 'richParagraph': {
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

async function assembleManuel(outputFile, title) {
    console.log(`🔧 Assemblage de ${title}`);
    console.log('='.repeat(60));

    // Charger les préliminaires séparément pour splitter avant/après TDM
    const prelimPath = path.join(CHAPTERS_DIR, 'preliminaires.json');
    const prelimJson = JSON.parse(fs.readFileSync(prelimPath, 'utf-8'));
    console.log(`  ✅ preliminaires.json — ${prelimJson.length} éléments`);

    // Trouver le point de split : le premier HEADING_1 (Licence UBLinx)
    // Tout avant = page de titre + dédicace (va AVANT la TDM)
    // Tout après = licence, préface, guide (va APRÈS la TDM)
    let splitIdx = prelimJson.length;
    for (let i = 0; i < prelimJson.length; i++) {
        if (prelimJson[i].heading === 'HEADING_1') {
            splitIdx = i;
            break;
        }
    }

    const preTocElements = prelimJson.slice(0, splitIdx);
    const postTocPrelim = prelimJson.slice(splitIdx);
    console.log(`  📐 Split préliminaires: ${preTocElements.length} avant TDM, ${postTocPrelim.length} après TDM`);

    // Charger les parties restantes (incluant l'autocritique avant les annexes)
    const contentParts = ['part1.json', 'part2.json', 'part3.json', 'part4.json', 'part5.json', 'part6.json', 'autocritique.json', 'annexes.json'];
    const contentElements = [];

    for (const partFile of contentParts) {
        const filepath = path.join(CHAPTERS_DIR, partFile);
        if (!fs.existsSync(filepath)) {
            console.log(`  ⏭️  ${partFile} — non trouvé, ignoré`);
            continue;
        }
        const json = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        console.log(`  ✅ ${partFile} — ${json.length} éléments`);
        contentElements.push(...json);
    }

    // Convertir en éléments docx
    const preTocDocx = preTocElements.map(jsonToDocx).filter(e => e !== null);
    const postTocDocx = [...postTocPrelim, ...contentElements].map(jsonToDocx).filter(e => e !== null);
    const totalDocx = preTocDocx.length + postTocDocx.length;

    console.log(`\n📄 Éléments docx: ${totalDocx} (${preTocDocx.length} avant TDM + ${postTocDocx.length} après TDM)`);

    // Ordre final : Page de titre → Dédicace → TDM → Licence → Préface → Contenu
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
                            text: title,
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
                // 1. Page de titre + Dédicace
                ...preTocDocx,
                // 2. Table des matières
                new TableOfContents("Table des matières", {
                    hyperlink: true,
                    headingStyleRange: "1-3"
                }),
                new Paragraph({ children: [new PageBreak()] }),
                // 3. Licence, Préface, Guide, puis Parties I-VI + Annexes
                ...postTocDocx
            ]
        }]
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFile, buffer);

    const sizeKB = Math.round(buffer.length / 1024);
    const estimatedPages = Math.round(totalDocx / 3);

    console.log(`\n✅ ${title} généré: ${outputFile}`);
    console.log(`   Taille: ${sizeKB} KB`);
    console.log(`   Éléments: ${totalDocx}`);
    console.log(`   Pages estimées: ~${estimatedPages}`);
}

// Générer le Manuel
async function generateBooks() {
    try {
        await assembleManuel(OUTPUT_FILE_MANUEL, "Conscience Souveraine — Manuel Complet");
        console.log('\n📝 Note: L\'Essai est assemblé via book2/scripts/assemble_book2.js');
    } catch (err) {
        console.error('❌ Erreur:', err);
        process.exit(1);
    }
}

generateBooks();