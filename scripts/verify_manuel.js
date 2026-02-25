const mammoth = require("mammoth");
mammoth.extractRawText({path: "/mnt/d/conscience_souveraine/Conscience_Souveraine_Manuel_400p_Final.docx"})
  .then(result => {
    const text = result.value;
    const lines = text.split("\n").filter(l => l.trim());

    console.log("=== VÉRIFICATION DU MANUEL ===\n");

    // 1. David 3e personne (hors citations/crédits/licence/contact/dialogues)
    const d3 = lines.filter(l => {
      const hasDavid = l.includes("David Berthelotte") || l.includes("David a ") || l.includes("David est ") || l.includes("de David ") || l.includes("entre David");
      if (!hasDavid) return false;
      if (l.startsWith("«")) return false;
      if (l.includes("» —")) return false;
      if (l.includes("Auteur :")) return false;
      if (l.includes("Auteur : David")) return false;
      if (l.includes("© 2026")) return false;
      if (l.includes("Licence UBLinx")) return false;
      if (l.includes("ublinx.com")) return false;
      if (l.includes("David :")) return false;  // dialogue extracts
      if (l.includes("David Berthelotte —")) return false;  // attribution on cover
      return true;
    });
    console.log("Refs David 3e personne (hors legal/dialogues): " + d3.length);
    d3.forEach(l => console.log("  > " + l.substring(0, 200)));

    // 2. JRT references
    const jrt = lines.filter(l => l.includes("JRT"));
    console.log("\nRefs 'JRT': " + jrt.length);
    jrt.forEach(l => console.log("  > " + l.substring(0, 180)));

    // 3. tasse de thé vs café
    console.log("\ntasse de thé: " + lines.filter(l => l.includes("tasse de thé")).length);
    console.log("tasse de café: " + lines.filter(l => l.includes("tasse de café")).length);

    // 4. vingt-cinq ans
    const v25 = lines.filter(l => l.includes("vingt-cinq ans"));
    console.log("vingt-cinq ans: " + v25.length);
    v25.forEach(l => console.log("  > " + l.substring(0, 180)));

    // 5. 1re personne dans préface
    console.log("\n=== VOIX 1RE PERSONNE (préface) ===");
    console.log("'Je ne suis pas issu': " + lines.filter(l => l.includes("Je ne suis pas issu")).length);
    console.log("'j ai posé la question': " + lines.filter(l => l.includes("j'ai posé la question")).length);
    console.log("'entre moi et Claude': " + lines.filter(l => l.includes("entre moi et Claude")).length);
    console.log("'J ai fourni la vision': " + lines.filter(l => l.includes("J'ai fourni la vision")).length);

    // 6. Structure
    console.log("\n=== STRUCTURE ===");
    const parties = lines.filter(l => l.match(/^Partie [IVX]+/));
    console.log("Parties trouvées: " + parties.length);
    parties.forEach(l => console.log("  " + l.substring(0, 100)));
    const autocritique = lines.filter(l => l.includes("Autocritique"));
    console.log("Autocritique: " + (autocritique.length > 0 ? "OK (" + autocritique.length + " refs)" : "MANQUANT"));
    console.log("Total lignes: " + lines.length);

    // 7. First 30 lines (structure check)
    console.log("\n=== DÉBUT DU DOCUMENT ===");
    lines.slice(0, 30).forEach((l, i) => console.log((i+1) + ": " + l.substring(0, 120)));
  });
