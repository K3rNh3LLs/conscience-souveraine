const fs = require("fs");
const files = [
  "chapters/preliminaires.json",
  "chapters/part1.json", "chapters/part2.json", "chapters/part3.json",
  "chapters/part4.json", "chapters/part5.json", "chapters/part6.json",
  "chapters/autocritique.json", "chapters/annexes.json",
  "book2/chapters/prologue.json", "book2/chapters/acte1.json",
  "book2/chapters/acte2.json", "book2/chapters/acte3.json",
  "book2/chapters/acte4.json", "book2/chapters/autocritique_essai.json",
  "book2/chapters/epilogue.json"
];

for (const f of files) {
  const data = JSON.parse(fs.readFileSync(f, "utf8"));
  const bio = [];

  function walk(obj) {
    if (Array.isArray(obj)) obj.forEach(walk);
    else if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj)) {
        if (key === "text" && typeof obj[key] === "string") {
          const text = obj[key];
          // Check for first-person biographical statements
          if (/\b(Je suis|J'ai|je suis|j'ai|je fais|je ne suis|ma carri|mes filles|mon sous-sol|ma famille|mes innovation|mes carnets|depuis.*ans|deux cents|200 innovation|Cynthia|Jordane|Olivia|Saint-Dominique|JRT|technicien|inventeur|entrepreneur|électronique|Québec.*2026)/i.test(text)) {
            // Only include texts that seem personal/biographical
            if (text.length < 800) {
              bio.push(text);
            } else {
              // Extract the relevant sentence
              const sentences = text.match(/[^.!?]*\b(je suis|j'ai|je fais|je ne suis|ma carri|mes filles|mon sous-sol|ma famille|mes innovation|mes carnets|depuis.*ans|deux cents|200 innovation|Cynthia|Jordane|Olivia|Saint-Dominique|JRT|technicien|inventeur|entrepreneur)[^.!?]*/gi);
              if (sentences) {
                sentences.forEach(s => bio.push(s.trim()));
              }
            }
          }
        } else walk(obj[key]);
      }
    }
  }
  walk(data);

  if (bio.length > 0) {
    const short = f.replace("chapters/","").replace("book2/chapters/","[ESSAI] ");
    console.log("\n=== " + short + " ===");
    bio.forEach((b, i) => {
      // Truncate long entries
      const display = b.length > 200 ? b.substring(0, 200) + "..." : b;
      console.log(`  ${i+1}. ${display}`);
    });
  }
}
