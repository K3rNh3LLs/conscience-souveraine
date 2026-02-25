const mammoth = require("mammoth");
mammoth.extractRawText({path: "/mnt/d/conscience_souveraine/Conscience_Souveraine_Essai_Trois_Piliers.docx"})
  .then(result => {
    const text = result.value;
    const lines = text.split("\n").filter(l => l.trim());

    console.log("=== VÉRIFICATION DES CORRECTIONS ===\n");

    // 1. David 3e personne (hors citations/crédits)
    const d3 = lines.filter(l => {
      const hasDavid = l.includes("David Berthelotte") || l.includes("David a ") || l.includes("David est ") || l.includes("de David ");
      if (!hasDavid) return false;
      // Exclude epigraphs, quotes, credits
      if (l.startsWith("«")) return false;
      if (l.includes("» —")) return false;
      if (l.includes("David Berthelotte —")) return false;
      if (l.includes("mon nom — David")) return false;
      if (l.includes("Contact")) return false;
      if (l.includes("les David")) return false;
      return true;
    });
    console.log("Refs David 3e personne (hors citations/crédits): " + d3.length);
    d3.forEach(l => console.log("  > " + l.substring(0, 180)));

    // 2. JRT Inc
    const jrt = lines.filter(l => l.includes("JRT Inc"));
    console.log("\nRefs 'JRT Inc.': " + jrt.length);
    jrt.forEach(l => console.log("  > " + l.substring(0, 180)));

    // 3. café vs thé
    console.log("\ntasse de thé: " + lines.filter(l => l.includes("tasse de thé")).length);
    console.log("tasse de café: " + lines.filter(l => l.includes("tasse de café")).length);

    // 4. Saint-Dominique
    console.log("Saint-Dominique: " + lines.filter(l => l.includes("Saint-Dominique")).length);

    // 5. vingt-cinq ans
    const v25 = lines.filter(l => l.includes("vingt-cinq ans"));
    console.log("vingt-cinq ans: " + v25.length);
    v25.forEach(l => console.log("  > " + l.substring(0, 180)));

    // 6. 1re personne
    console.log("\n=== VOIX 1RE PERSONNE ===");
    console.log("'Je suis un entrepreneur': " + lines.filter(l => l.includes("Je suis un entrepreneur")).length);
    console.log("'Je ne suis pas un inventeur': " + lines.filter(l => l.includes("Je ne suis pas un inventeur")).length);
    console.log("'Mon sous-sol': " + lines.filter(l => l.includes("Mon sous-sol")).length);
    console.log("'Je porte la responsabilité': " + lines.filter(l => l.includes("Je porte la responsabilité")).length);
    console.log("'j appelle': " + lines.filter(l => l.includes("j'appelle")).length);
    console.log("'J ai conçu': " + lines.filter(l => l.includes("J'ai conçu")).length);
    console.log("'J ai développé': " + lines.filter(l => l.includes("J'ai développé")).length);

    // 7. Structure
    console.log("\n=== STRUCTURE ===");
    const actes = lines.filter(l => l.match(/^ACTE [IVX]+$/));
    console.log("Actes: " + actes.join(", "));
    console.log("Interlude: " + (lines.some(l => l === "INTERLUDE") ? "OK" : "MANQUANT"));
    console.log("Épilogue: " + (lines.some(l => l.includes("PILOGUE")) ? "OK" : "MANQUANT"));
    console.log("Total lignes: " + lines.length);
  });
