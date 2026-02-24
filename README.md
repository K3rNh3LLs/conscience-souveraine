# Conscience Souveraine — Pack de Génération du Manuel (350-400 pages)

## 🚀 Démarrage Rapide avec Claude Code

```bash
# 1. Cloner ou extraire ce pack
cd conscience-souveraine-pack

# 2. Installer les dépendances
npm install docx

# 3. Vérifier l'état
./build.sh status

# 4. Demander à Claude Code de générer
claude "Lis CLAUDE.md et génère la Partie I (Chapitres 1-4). Consulte CONTENT_MAP.md pour savoir quelles sources lire, puis PLAN.md pour la structure détaillée de chaque chapitre."
```

## 📁 Structure du Pack

```
conscience-souveraine-pack/
├── CLAUDE.md              ← 🧠 HIVEMIND : Contexte complet pour Claude Code
├── PLAN.md                ← 📋 Plan détaillé 26 chapitres + 4 annexes
├── CONTENT_MAP.md         ← 🗺️ Index sources → chapitres
├── UBLINX_LICENSE.md      ← ⚖️ Texte de licence
├── README.md              ← 📖 Ce fichier
├── build.sh               ← 🔧 Script de build
├── package.json           ← 📦 Dépendances Node.js
│
├── sources/               ← 📚 MATÉRIEL SOURCE (260K+ mots)
│   ├── S01-sept-invariants.md          ← Dialogue Session 1
│   ├── S02-architecture-cognitive.md   ← Dialogue Session 2
│   ├── ...S09-livre-complet.md         ← Dialogue Session 9
│   ├── Les_Sept_Invariants_v2_Complete.txt     ← Doc technique
│   ├── Architecture_Cognitive_*.txt            ← Doc technique
│   ├── Substrat_Toroidal_*.txt                 ← Doc technique
│   └── ... (18 fichiers au total)              ← ~112K mots
│
├── scripts/               ← ⚙️ Scripts de génération
│   ├── template_generate.js  ← Template pour chaque partie
│   ├── assemble.js           ← Assemblage final → .docx
│   └── extract_transcripts.py ← Extraction des transcripts
│
└── chapters/              ← 📄 Fichiers intermédiaires (générés)
    ├── preliminaires.json
    ├── part1.json → part6.json
    └── annexes.json
```

## 🎯 Commandes Claude Code Recommandées

### Générer partie par partie

```bash
# Partie I : Fondations Philosophiques (Ch. 1-4, ~60 pages)
claude "Lis CLAUDE.md, PLAN.md et CONTENT_MAP.md. Puis lis les sources pour la Partie I et génère scripts/generate_part1.js avec un contenu complet et développé. Chaque chapitre doit faire 14-16 pages minimum."

# Partie II : Architecture Cognitive (Ch. 5-9, ~75 pages)
claude "Continue avec la Partie II. Lis les sources indiquées dans CONTENT_MAP.md et génère scripts/generate_part2.js."

# ... etc pour chaque partie
```

### Vérifier et assembler

```bash
# État de progression
./build.sh status

# Assembler les parties terminées
./build.sh assemble

# Valider le document
./build.sh validate
```

### Itérer sur un chapitre

```bash
# Si un chapitre est trop court ou manque de profondeur
claude "Le chapitre 7 (Neuromodulateurs) dans generate_part2.js est trop court. Relis sources/Les_Lignes_sur_la_Route_Plasticite_Autoregulation.txt et développe chaque neuromodulateur sur 2 pages complètes avec mécanismes, substrat physique et formules."
```

## 📏 Critères de Qualité

Chaque chapitre terminé doit avoir :

- ✅ Minimum 12 pages (3,600+ mots / 18,000+ caractères)
- ✅ Introduction avec contexte et liens
- ✅ Développement complet avec formules dérivées
- ✅ Tableaux de spécifications numériques
- ✅ Discussion des implications
- ✅ Résumé de fin de chapitre
- ✅ Termes techniques définis
- ✅ Pas de contenu dupliqué entre chapitres

## ⚠️ Notes Importantes

1. **Ne pas tout générer en une fois** — Claude Code a des limites de contexte. Faire partie par partie.
2. **Lire les sources AVANT de rédiger** — La richesse du contenu vient des sources.
3. **Viser la densité, pas le remplissage** — Chaque page doit apporter de l'information nouvelle.
4. **Le format JSON intermédiaire** permet d'itérer sans tout reconstruire.
5. **L'assemblage final** ajoute TOC, en-têtes, pieds de page automatiquement.

## 📊 Objectifs

| Métrique | Cible |
|----------|-------|
| Pages totales | 350-400 |
| Mots | 105,000-120,000 |
| Chapitres | 26 + 4 annexes |
| Pages/chapitre | 12-18 (moy. 14) |

---

*Auteur : David Berthelotte — Licence UBLinx Open Innovation v1.0*
