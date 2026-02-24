"use strict";

const fs = require("fs");
const readline = require("readline");

// Fonction pour traiter le fichier ligne par ligne
async function correctManualEditsManuel(filePath) {
  const outputPath = filePath.replace("_corrected.txt", "_final.txt");
  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(outputPath);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let correctedLine = line;

    // 1. Ajouter une explication pour UBLinx
    if (correctedLine.includes("UBLinx Open Innovation v1.0") && !correctedLine.includes("Plateforme")) {
      correctedLine += " (Plateforme de protection de l'innovation ouverte créée par David Berthelotte)";
    }

    // 2. Remplacer "cafématique" par "bibliographique"
    if (correctedLine.includes("bibliographie cafématique")) {
      correctedLine = correctedLine.replace("bibliographie cafématique", "bibliographie technique");
    }

    // 3. Uniformiser "macafématique" → "mathématique"
    if (correctedLine.includes("macafématiques")) {
      correctedLine = correctedLine.replace("macafématiques", "mathématiques");
    }

    // 4. Vérifier les formules
    if (correctedLine.includes("sigma = rho * v^2")) {
      writeStream.write("La contrainte centrifuge sur un anneau en rotation est donnée par une formule dérivée de la physique des matériaux :\n");
    }

    writeStream.write(correctedLine + "\n");
  }

  writeStream.end();
  console.log(`Fichier manuel corrigé manuellement sauvegardé sous : ${outputPath}`);
  return outputPath;
}

// Exécuter les corrections manuelles
const fileToCorrect = "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_corrected.txt";

if (fs.existsSync(fileToCorrect)) {
  correctManualEditsManuel(fileToCorrect);
} else {
  console.error(`Fichier introuvable : ${fileToCorrect}`);
}