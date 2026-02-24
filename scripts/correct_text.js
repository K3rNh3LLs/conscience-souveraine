"use strict";

const fs = require("fs");
const path = require("path");

// Corrections automatisées
const corrections = [
  // Ligatures
  { from: "oeuvre", to: "œuvre" },
  { from: "coeur", to: "cœur" },
  { from: "soeur", to: "sœur" },
  { from: "noeud", to: "nœud" },

  // Espaces insécables avant ponctuation
  { from: / ([!?;:])/g, to: " $1" }, // Espace insécable avant ! ? ; :
  { from: /« /g, to: "« " }, // Espace insécable après «
  { from: / »/g, to: " »" }, // Espace insécable avant »

  // Termes techniques
  { from: "tel quel", to: "en l'état" },
  { from: "AS IS", to: "en l'état" },
  { from: "thé", to: "café" },
  { from: "DXA units", to: "unités de mesure" },
  { from: "HeadingLevel", to: "Niveau de titre" },

  // Corrections spécifiques demandées
  { from: "c'est elle qui me supporte", to: "C'est rarement Cynthia qui m'apporte le café" },
  { from: /Trois feuilles\. Trois entreprises\./g, to: "Trois feuilles, trois entreprises." },
];

// Lire un fichier, appliquer les corrections et sauvegarder
function correctFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  let correctedContent = content;

  corrections.forEach((correction) => {
    if (typeof correction.from === "string") {
      correctedContent = correctedContent.split(correction.from).join(correction.to);
    } else if (correction.from instanceof RegExp) {
      correctedContent = correctedContent.replace(correction.from, correction.to);
    }
  });

  const outputPath = filePath.replace(".txt", "_corrected.txt");
  fs.writeFileSync(outputPath, correctedContent, "utf8");
  console.log(`Fichier corrigé sauvegardé sous : ${outputPath}`);
  return outputPath;
}

// Exécuter les corrections
const filesToCorrect = [
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p.txt",
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers.txt",
];

filesToCorrect.forEach((file) => {
  if (fs.existsSync(file)) {
    correctFile(file);
  } else {
    console.error(`Fichier introuvable : ${file}`);
  }
});