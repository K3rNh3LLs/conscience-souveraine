const mammoth = require("mammoth");
async function check(file) {
  const r = await mammoth.extractRawText({path: file});
  const text = r.value;
  const checks = [
    [/\benergie\b/gi, "énergie"],
    [/\bsysteme\b/gi, "système"],
    [/\bmemoire\b/gi, "mémoire"],
    [/\bethique\b/gi, "éthique"],
    [/\bspecifique\b/gi, "spécifique"],
    [/\btheorie\b/gi, "théorie"],
    [/\betait\b/gi, "était"],
    [/tasse de thé/gi, "thé doit être café"],
    [/\bmecanisme\b/gi, "mécanisme"],
    [/\bbarriere\b/gi, "barrière"],
    [/\blevitation\b/gi, "lévitation"],
    [/\bmagnetique\b/gi, "magnétique"],
    [/\bequilibre\b/gi, "équilibre"],
    [/\bmateriau\b/gi, "matériau"],
    [/\bpensee\b/gi, "pensée"],
    [/\bmedium\b/gi, "médium"],
    [/\bingenierie\b/gi, "ingénierie"],
    [/\bprefrontal\b/gi, "préfrontal"],
    [/\binterference\b/gi, "interférence"],
    [/\bdemocratique\b/gi, "démocratique"],
  ];
  console.log("\n=== " + file + " ===");
  let clean = true;
  for (const [rx, desc] of checks) {
    const m = text.match(rx);
    if (m) {
      // Skip English titles
      let count = 0;
      for (const match of m) {
        const idx = text.indexOf(match);
        const ctx = text.substring(Math.max(0, idx - 40), idx + match.length + 40);
        if (!/IEEE|Transactions|Inductrack|Approach/.test(ctx)) count++;
      }
      if (count > 0) {
        console.log("  ⚠️ " + desc + ": " + count + "x"); 
        clean = false;
      }
    }
  }
  if (clean) console.log("  ✅ Tous les accents sont corrects!");
}
(async () => {
  await check("Conscience_Souveraine_Manuel_400p_Final.docx");
  await check("Conscience_Souveraine_Essai_Trois_Piliers.docx");
})();
