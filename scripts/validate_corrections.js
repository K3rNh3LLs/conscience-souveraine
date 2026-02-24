"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Fonction pour comparer deux fichiers et générer un rapport
function generateReport(originalFile, correctedFile) {
  const original = fs.readFileSync(originalFile, "utf-8");
  const corrected = fs.readFileSync(correctedFile, "utf-8");

  // Statistiques de base
  const originalLines = original.split("\n").length;
  const correctedLines = corrected.split("\n").length;

  // Vérification des corrections spécifiques
  const checks = {
    "thé → café": {
      original: (original.match(/thé/gi) || []).length,
      corrected: (corrected.match(/café/gi) || []).length,
      success: corrected.includes("café") && !corrected.includes("thé")
    },
    "œuvre": {
      original: (original.match(/oeuvre/gi) || []).length,
      corrected: (corrected.match(/œuvre/gi) || []).length,
      success: corrected.includes("œuvre")
    },
    "cœur": {
      original: (original.match(/coeur/gi) || []).length,
      corrected: (corrected.match(/cœur/gi) || []).length,
      success: corrected.includes("cœur")
    },
    "Dédicace Cynthia": {
      success: corrected.includes("C'est rarement Cynthia qui m'apporte le café")
    }
  };

  // Vérification orthographique avec hunspell
  let spellingErrors = { original: 0, corrected: 0 };
  try {
    spellingErrors.original = execSync(`hunspell -d fr_FR -l "${originalFile}" | wc -l`).toString().trim();
    spellingErrors.corrected = execSync(`hunspell -d fr_FR -l "${correctedFile}" | wc -l`).toString().trim();
  } catch (e) {
    console.warn("hunspell non disponible, vérification orthographique ignorée");
  }

  // Générer le rapport
  const report = {
    metadata: {
      originalFile: path.basename(originalFile),
      correctedFile: path.basename(correctedFile),
      date: new Date().toISOString(),
      lines: {
        original: originalLines,
        corrected: correctedLines
      }
    },
    corrections: checks,
    spelling: spellingErrors,
    summary: {
      totalCorrections: Object.values(checks).reduce((acc, check) =>
        acc + (check.original || 0) - (check.corrected || 0), 0),
      successRate: Object.values(checks).filter(check => check.success).length / Object.keys(checks).length
    }
  };

  return report;
}

// Générer les rapports pour les deux livres
const reports = {
  essai: generateReport(
    "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers.txt",
    "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers_corrected.txt"
  ),
  manuel: generateReport(
    "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p.txt",
    "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_corrected.txt"
  )
};

// Sauvegarder le rapport
const reportPath = "/mnt/d/conscience_souveraine/correction_report.json";
fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2), "utf-8");
console.log(`Rapport de validation généré : ${reportPath}`);

// Afficher un résumé
console.log("\n=== RAPPORT DE VALIDATION ===\n");
for (const [book, report] of Object.entries(reports)) {
  console.log(`\nLivre: ${book.toUpperCase()}`);
  console.log(`- Lignes: ${report.metadata.lines.original} → ${report.metadata.lines.corrected}`);
  console.log(`- Fautes d'orthographe: ${report.spelling.original} → ${report.spelling.corrected}`);
  console.log(`- Corrections appliquées: ${report.summary.totalCorrections}`);
  console.log(`- Taux de succès: ${(report.summary.successRate * 100).toFixed(1)}%`);

  for (const [check, result] of Object.entries(report.corrections)) {
    console.log(`  - ${check}: ${result.success ? "✓" : "✗"}`);
  }
}