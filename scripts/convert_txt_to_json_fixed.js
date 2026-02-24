"use strict";

const fs = require("fs");
const path = require("path");

// Fonction pour convertir un fichier .txt en JSON compatible avec assemble.js
function convertTxtToJson(txtFilePath) {
  const content = fs.readFileSync(txtFilePath, "utf8");
  const lines = content.split("\n");
  const jsonElements = [];

  // Styles de base pour les paragraphes
  const paragraphStyles = {
    "#": "PartTitle",
    "##": "ChapterTitle",
    "###": "SectionTitle",
    "####": "SubSection",
  };

  for (const line of lines) {
    if (line.trim() === "") {
      continue; // Ignorer les lignes vides
    }

    // Détecter les titres
    let isTitle = false;
    for (const [prefix, style] of Object.entries(paragraphStyles)) {
      if (line.startsWith(prefix + " ")) {
        const text = line.substring(prefix.length + 1).trim();
        jsonElements.push({
          type: "paragraph",
          style: style,
          text: text,
        });
        isTitle = true;
        break;
      }
    }
    if (isTitle) continue;

    // Paragraphes normaux
    jsonElements.push({
      type: "paragraph",
      style: "BodyText",
      text: line.trim(),
    });
  }

  // Sauvegarder le JSON dans le dossier chapters/
  const baseName = path.basename(txtFilePath, "_final.txt");
  const jsonFilePath = path.join(__dirname, "..", "chapters", `${baseName}.json`);

  const jsonDir = path.dirname(jsonFilePath);
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonElements, null, 2), "utf8");
  console.log(`Fichier JSON généré : ${jsonFilePath}`);
  return jsonFilePath;
}

// Convertir les fichiers corrigés
const filesToConvert = [
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_final.txt",
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers_final.txt",
];

filesToConvert.forEach((file) => {
  if (fs.existsSync(file)) {
    convertTxtToJson(file);
  } else {
    console.error(`Fichier introuvable : ${file}`);
  }
});