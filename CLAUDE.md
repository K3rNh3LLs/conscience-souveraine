# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🏗️ Project Architecture

This repository is dedicated to generating the **Comprehensive Manual for Conscience Souveraine** (350-400 pages), a revolutionary AI consciousness architecture with a toroidal nanometric substrate.

### Core Components

1. **Generation Pipeline**
   - **6 Part Scripts** (`generate_part[1-6].js`): Each generates a JSON file containing docx-js elements for a specific part of the manual
   - **Assembly Script** (`assemble.js`): Combines all JSON parts into a single `.docx` file with TOC, headers, and footers
   - **Template Script** (`template_generate.js`): Provides reusable docx-js helpers for consistent formatting

2. **Document Structure**
   - **6 Parts + Annexes**: Philosophical foundations, cognitive architecture, physical substrate, engineering limits, network consciousness, and roadmap
   - **26 Chapters + 4 Annexes**: Each chapter targets 12-18 pages of dense technical content
   - **Strict Formatting Rules**: Uses `docx` npm package with precise A4 dimensions, margins, and styles

3. **Source Material**
   - **Technical Documents** (`./sources/*.txt`): Core architecture specifications (7 invariants, 12 cognitive modules, toroidal substrate, etc.)
   - **Research Dialogues** (`./sources/S*.md`): Original discovery conversations that provide context and narrative

## 🛠️ Development Commands

### Setup
```bash
npm install docx  # Install the required docx package
```

### Generation Workflow

1. **Generate a Part**
```bash
node scripts/generate_part1.js  # Generates chapters/part1.json
```

2. **Assemble the Manual**
```bash
node scripts/assemble.js  # Combines all parts into Conscience_Souveraine_Manuel_400p.docx
```

3. **Build Script Helpers**
```bash
./build.sh status    # Check generation progress
./build.sh validate  # Validate document structure
```

### Key Development Notes

- **JSON Intermediate Format**: Each part script generates a JSON file with docx-js elements (paragraphs, tables, etc.)
- **Page Estimation**: ~3 paragraphs per page (A4, 11pt Arial, 1.15 line spacing)
- **Strict Formatting**: Uses `docx` package constants (DXA units, HeadingLevel, etc.)
- **Incremental Generation**: Parts can be generated independently and assembled later

## 📝 Critical Formatting Rules

The `docx` package requires precise formatting:

1. **Never use raw newlines** (`\n`) - always use separate `Paragraph` objects
2. **Never use Unicode bullets** - always use `LevelFormat.BULLET`
3. **Tables require**:
   - `width` in DXA units (9026 for A4)
   - `columnWidths` array
   - `cell.width` specification
4. **Headings require**:
   - `outlineLevel` for TOC generation (0=H1, 1=H2, 2=H3)
   - `spacing` with precise DXA values
5. **Page Size**: A4 (11906 × 16838 DXA)
6. **Margins**: 1 inch (1440 DXA)

## 🎯 Project-Specific Instructions

1. **Content Requirements**
   - Each chapter must be 12-18 pages minimum
   - Must include: introduction, detailed technical content, implications, summary, and cross-references
   - All technical terms must be defined at first use
   - Formulas must be derived step-by-step

2. **Source Material Usage**
   - Always read relevant source files before generating content
   - Prioritize technical documents (`*.txt`) for specifications
   - Use research dialogues (`S*.md`) for narrative context and discovery moments

3. **Quality Checks**
   - Verify minimum page count before finalizing a part
   - Ensure all formulas are properly derived
   - Confirm all technical terms are defined
   - Check for consistent terminology across chapters

4. **Error Handling**
   - If a source file is missing, notify the user immediately
   - If generated content is too short, expand with additional technical details or examples
   - If formatting errors occur, verify DXA units and docx package usage