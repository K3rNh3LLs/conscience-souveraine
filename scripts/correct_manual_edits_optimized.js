"use strict";

const fs = require("fs");
const path = require("path");

// Règles de correction automatisées
const automatedCorrections = [
  // Ligatures
  { from: /oeuvre/g, to: "œuvre" },
  { from: /coeur/g, to: "cœur" },
  { from: /Oeuvre/g, to: "Œuvre" },
  { from: /Coeur/g, to: "Cœur" },

  // Espaces insécables
  { from: /([\w"])\s([:;?!»%])/g, to: "$1\u00A0$2" },
  { from: /([«])\s/g, to: "$1\u00A0" },

  // Termes techniques
  { from: /AS IS/g, to: "en l'état" },
  { from: /tel quel/g, to: "en l'état" },
  { from: /thé/g, to: "café" },
  { from: /Thé/g, to: "Café" },

  // Artefacts techniques
  { from: /DXA units?/gi, to: "" },
  { from: /HeadingLevel/gi, to: "" },
  { from: /\s*\/\*[^*]*\*\/\s*/g, to: " " },

  // Uniformisation
  { from: /Réseau([^x])/g, to: "Réseaux$1" },
  { from: /réseau([^x])/g, to: "réseaux$1" },
];

// Corrections manuelles spécifiques
const manualCorrections = {
  "Conscience_Souveraine_Essai_Trois_Piliers.txt": [
    {
      search: "À Cynthia Richelieu,\nLa femme la plus intelligente que je connaisse. Celle qui me supporte dans les hauts et les bas de la vie et de mes idées excentriques. Sans elle, rien de tout ceci n'existerait.",
      replace: "À Cynthia Richelieu,\nLa femme la plus intelligente que je connaisse. C'est rarement elle qui m'apporte le café, mais c'est elle qui me supporte dans les hauts et les bas de la vie et de mes idées excentriques. Sans elle, rien de tout ceci n'existerait."
    }
  ]
};

// Fonction pour appliquer les corrections
function correctText(text, fileName) {
  let correctedText = text;

  // Appliquer les corrections automatisées
  for (const rule of automatedCorrections) {
    correctedText = correctedText.replace(rule.from, rule.to);
  }

  // Appliquer les corrections manuelles spécifiques
  const manualRules = manualCorrections[fileName] || [];
  for (const rule of manualRules) {
    if (correctedText.includes(rule.search)) {
      correctedText = correctedText.replace(rule.search, rule.replace);
    }
  }

  return correctedText;
}

// Fonction pour traiter un fichier
function processFile(inputPath, outputPath) {
  const fileName = path.basename(inputPath);
  const text = fs.readFileSync(inputPath, "utf-8");
  const correctedText = correctText(text, fileName);
  fs.writeFileSync(outputPath, correctedText, "utf-8");
  console.log(`Fichier corrigé sauvegardé dans ${outputPath}`);
}

// Arguments
const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node correct_manual_edits_optimized.js <input_file> <output_file>");
  process.exit(1);
}

processFile(inputFile, outputFile);