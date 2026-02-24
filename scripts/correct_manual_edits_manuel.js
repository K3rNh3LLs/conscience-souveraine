"use strict";

const fs = require("fs");
const path = require("path");

// Fonction pour appliquer des corrections manuelles au manuel
function correctManualEditsManuel(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Corrections spécifiques pour le manuel
  for (let i = 0; i < lines.length; i++) {
    // 1. Ajouter une explication pour UBLinx (lignes 33, 49, 4499)
    if (lines[i].includes("UBLinx Open Innovation v1.0") && !lines[i].includes("Plateforme")) {
      lines[i] += " (Plateforme de protection de l'innovation ouverte créée par David Berthelotte)";
    }

    // 2. Remplacer "cafématique" par "bibliographique" (ligne 143)
    if (lines[i].includes("bibliographie cafématique")) {
      lines[i] = lines[i].replace("bibliographie cafématique", "bibliographie technique");
    }

    // 3. Uniformiser "macafématique" → "mathématique" (ligne 203)
    if (lines[i].includes("macafématiques")) {
      lines[i] = lines[i].replace("macafématiques", "mathématiques");
    }

    // 4. Vérifier les formules (ex: ligne 2193)
    if (lines[i].includes("sigma = rho * v^2")) {
      if (!lines[i-1].includes("La contrainte centrifuge sur un anneau en rotation est donnée par")) {
        lines.splice(i-1, 0, "La contrainte centrifuge sur un anneau en rotation est donnée par une formule dérivée de la physique des matériaux :");
      }
    }
  }

  // Sauvegarder les modifications
  const outputPath = filePath.replace("_corrected.txt", "_final.txt");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
  console.log(`Fichier manuel corrigé manuellement sauvegardé sous : ${outputPath}`);
  return outputPath;
}

// Exécuter les corrections manuelles
const filesToCorrect = [
  "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_corrected.txt",
];

filesToCorrect.forEach((file) => {
  if (fs.existsSync(file)) {
    correctManualEditsManuel(file);
  } else {
    console.error(`Fichier introuvable : ${file}`);
  }
});