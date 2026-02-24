"use strict";

const fs = require("fs");

const filePath = "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers_final_corrected.txt";
const newDedicace = "À Cynthia Richelieu,\n\nLa femme la plus précieuse que je connaisse. Celle qui ne m'apporte pas souvent le café, mais me recentre et m'amène à me poser les vraies questions, à ne pas m'oublier, et à m'ancrer dans le réel et l'important. Elle me pousse à éviter les raccourcis, à bien faire les choses. C'est grâce à elle que j'ai un tant soit peu de rigueur. Sans elle, rien de tout ceci n'existerait.";

// Lire le fichier
const content = fs.readFileSync(filePath, "utf8");
const lines = content.split("\n");

// Remplacer les lignes 39 à 41 (0-indexed: 38 à 40)
lines[38] = newDedicace.split("\n")[0];
lines[39] = newDedicace.split("\n")[1];
lines[40] = newDedicace.split("\n")[2];

// Sauvegarder le fichier
fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("Dédicace corrigée avec succès");