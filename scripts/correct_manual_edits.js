"use strict";

const fs = require("fs");
const path = require("path");

// Fonction pour appliquer des corrections manuelles à un fichier
function correctManualEdits(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Corrections spécifiques pour l'essai
  if (filePath.includes("Essai_Trois_Piliers")) {
    // 1. Corriger la dédicace (ligne 41, index 40)
    if (lines[40].includes("Celle qui me supporte dans les hauts et les bas")) {
      lines[40] = "C'est rarement Cynthia qui m'apporte le café. Sans elle, rien de tout ceci n'existerait.";
    }

    // 2. Scinder la phrase longue (lignes 89-91, index 88-90)
    if (lines[88].includes("La révolution industrielle n'a pas seulement mécanisé")) {
      const longSentence = lines[88];
      const parts = longSentence.split(". ");
      if (parts.length > 1) {
        lines[88] = parts[0] + ".";
        lines.splice(89, 0, parts.slice(1).join(". "));
      }
    }

    // 3. Uniformiser "Réseau" → "Réseaux" (ligne 9, index 8)
    if (lines[8].includes("Réseau")) {
      lines[8] = lines[8].replace("Réseau", "Réseaux");
    }
  }

  // Sauvegarder les modifications
  const outputPath = filePath.replace("_corrected.txt", "_final.txt");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
  console.log(`Fichier corrigé manuellement sauvegardé sous : ${outputPath}`);
  return outputPath;
}

// Exécuter les corrections manuelles
const filesToCorrect = [
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers_corrected.txt",
];

filesToCorrect.forEach((file) => {
  if (fs.existsSync(file)) {
    correctManualEdits(file);
  } else {
    console.error(`Fichier introuvable : ${file}`);
  }
});