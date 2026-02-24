// Script pour extraire le texte d'un fichier .docx en utilisant la bibliothèque docx
const { Document } = require("docx");
const fs = require("fs");
const path = require("path");

async function extractTextFromDocx(docxPath) {
    try {
        // Lire le fichier .docx
        const buffer = fs.readFileSync(docxPath);
        const doc = await Document.load(buffer);

        // Extraire le texte de tous les paragraphes
        let text = "";
        doc.paragraphs.forEach(paragraph => {
            const paragraphText = paragraph.text.trim();
            if (paragraphText) {
                text += paragraphText + "\n\n";
            }
        });

        // Sauvegarder le texte extrait dans un fichier .txt
        const outputPath = path.join(
            path.dirname(docxPath),
            `${path.basename(docxPath, ".docx")}.txt`
        );
        fs.writeFileSync(outputPath, text);
        console.log(`Texte extrait et sauvegardé dans : ${outputPath}`);
        return outputPath;
    } catch (error) {
        console.error(`Erreur lors de l'extraction du texte de ${docxPath} :`, error);
        throw error;
    }
}

// Extraire le texte des deux fichiers .docx
(async () => {
    try {
        const manuelPath = path.join(__dirname, "../Conscience_Souveraine_Manuel_400p.docx");
        const essaiPath = path.join(__dirname, "../Conscience_Souveraine_Essai_Trois_Piliers.docx");

        await extractTextFromDocx(manuelPath);
        await extractTextFromDocx(essaiPath);
    } catch (error) {
        console.error("Erreur lors de l'extraction :", error);
    }
})();