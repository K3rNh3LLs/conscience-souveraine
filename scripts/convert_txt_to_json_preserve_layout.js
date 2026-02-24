"use strict";

const fs = require("fs");
const path = require("path");

// Règles de correction orthographique (identiques aux précédentes)
const corrections = [
  { from: /oeuvre/g, to: "œuvre" },
  { from: /coeur/g, to: "cœur" },
  { from: /Oeuvre/g, to: "Œuvre" },
  { from: /Coeur/g, to: "Cœur" },
  { from: /AS IS/g, to: "en l'état" },
  { from: /tel quel/g, to: "en l'état" },
  { from: /thé/g, to: "café" },
  { from: /Thé/g, to: "Café" },
  { from: /Réseau([^x])/g, to: "Réseaux$1" },
  { from: /réseau([^x])/g, to: "réseaux$1" },
];

// Fonction pour appliquer les corrections orthographiques
function correctText(text) {
  let correctedText = text;
  for (const rule of corrections) {
    correctedText = correctedText.replace(rule.from, rule.to);
  }
  return correctedText;
}

// Fonction pour convertir un fichier .txt en JSON en préservant la mise en page
function convertTxtToJson(txtFilePath) {
  const content = fs.readFileSync(txtFilePath, "utf8");
  const lines = content.split("\n");
  const jsonElements = [];

  // Styles de base pour les paragraphes (identiques aux originaux)
  const paragraphStyles = {
    "# ": { style: "PartTitle", outlineLevel: 0 },
    "## ": { style: "ChapterTitle", outlineLevel: 1 },
    "### ": { style: "SectionTitle", outlineLevel: 2 },
    "#### ": { style: "SubSection", outlineLevel: 3 },
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      // Saut de ligne (préserver l'espacement)
      jsonElements.push({ type: "emptyLine" });
      continue;
    }

    // Détecter les séparateurs (ex: "_______________")
    if (/^_{5,}$/.test(trimmedLine)) {
      jsonElements.push({
        type: "separator",
        style: "Separator",
        text: "_",
      });
      continue;
    }

    // Détecter les titres
    let isTitle = false;
    for (const [prefix, config] of Object.entries(paragraphStyles)) {
      if (line.startsWith(prefix)) {
        const text = correctText(line.substring(prefix.length).trim());
        jsonElements.push({
          type: "paragraph",
          style: config.style,
          text: text,
          outlineLevel: config.outlineLevel,
        });
        isTitle = true;
        break;
      }
    }
    if (isTitle) continue;

    // Paragraphes normaux (appliquer les corrections orthographiques)
    const correctedText = correctText(line);
    jsonElements.push({
      type: "paragraph",
      style: "BodyText",
      text: correctedText.trim(),
    });
  }

  // Sauvegarder le JSON dans le dossier chapters/
  const baseName = path.basename(txtFilePath, ".txt");
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
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_corrected.txt",
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers_corrected.txt",
];

filesToConvert.forEach((file) => {
  if (fs.existsSync(file)) {
    convertTxtToJson(file);
  } else {
    console.error(`Fichier introuvable : ${file}`);
  }
});