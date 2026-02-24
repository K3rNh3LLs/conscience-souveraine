"use strict";

const mammoth = require("mammoth");

async function extractText(docxPath) {
  try {
    const result = await mammoth.extractRawText({ path: docxPath });
    console.log(result.value);
  } catch (error) {
    console.error("Erreur lors de l'extraction du texte:", error);
  }
}

const docxPath = process.argv[2];
if (!docxPath) {
  console.error("Usage: node extract_text_mammoth.js <docx_file>");
  process.exit(1);
}

extractText(docxPath);