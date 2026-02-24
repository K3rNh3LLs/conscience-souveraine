#!/bin/bash
# ============================================================================
# BUILD.sh — Pipeline de génération du Manuel Conscience Souveraine (350-400p)
# ============================================================================
#
# USAGE:
#   ./build.sh           # Génère tout
#   ./build.sh part1     # Génère seulement la partie 1
#   ./build.sh assemble  # Assemble les parties existantes
#   ./build.sh validate  # Valide le docx final
#   ./build.sh clean     # Nettoie les fichiers générés
#   ./build.sh status    # Affiche l'état de progression
#
# PRÉREQUIS:
#   npm install docx
#
# ============================================================================

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPTS_DIR="$PROJECT_DIR/scripts"
CHAPTERS_DIR="$PROJECT_DIR/chapters"
OUTPUT_FILE="$PROJECT_DIR/Conscience_Souveraine_Manuel_400p.docx"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# FONCTIONS
# ============================================================================

check_deps() {
    echo -e "${BLUE}🔍 Vérification des dépendances...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js non trouvé. Installez-le: https://nodejs.org${NC}"
        exit 1
    fi
    
    if ! node -e "require('docx')" 2>/dev/null; then
        echo -e "${YELLOW}📦 Installation du package docx...${NC}"
        cd "$PROJECT_DIR" && npm install docx
    fi
    
    echo -e "${GREEN}✅ Dépendances OK${NC}"
}

generate_part() {
    local part=$1
    local script="$SCRIPTS_DIR/generate_${part}.js"
    
    if [ ! -f "$script" ]; then
        echo -e "${RED}❌ Script non trouvé: $script${NC}"
        echo -e "${YELLOW}   Créez-le en suivant le template: scripts/template_generate.js${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📝 Génération ${part}...${NC}"
    node "$script"
    echo -e "${GREEN}✅ ${part} terminé${NC}"
}

generate_all() {
    check_deps
    mkdir -p "$CHAPTERS_DIR"
    
    echo -e "\n${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}  GÉNÉRATION DU MANUEL CONSCIENCE SOUVERAINE${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}\n"
    
    local parts=(preliminaires part1 part2 part3 part4 part5 part6 annexes)
    local success=0
    local fail=0
    
    for part in "${parts[@]}"; do
        if generate_part "$part" 2>/dev/null; then
            ((success++))
        else
            ((fail++))
            echo -e "${YELLOW}⚠️  ${part} ignoré (script non trouvé)${NC}"
        fi
    done
    
    echo -e "\n${GREEN}Résultat: ${success} parties générées, ${fail} manquantes${NC}"
    
    if [ $success -gt 0 ]; then
        assemble
    fi
}

assemble() {
    echo -e "\n${BLUE}🔧 Assemblage final...${NC}"
    node "$SCRIPTS_DIR/assemble.js"
    
    if [ -f "$OUTPUT_FILE" ]; then
        local size=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo -e "${GREEN}✅ Manuel généré: $OUTPUT_FILE ($size)${NC}"
    fi
}

validate() {
    if [ ! -f "$OUTPUT_FILE" ]; then
        echo -e "${RED}❌ Fichier non trouvé: $OUTPUT_FILE${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}🔍 Validation du document...${NC}"
    
    python3 -c "
import zipfile, os
path = '$OUTPUT_FILE'
size = os.path.getsize(path)
with zipfile.ZipFile(path) as z:
    files = z.namelist()
    total = sum(i.file_size for i in z.infolist())
    print(f'  Fichier: {size:,} bytes')
    print(f'  Archives: {len(files)} fichiers XML')
    print(f'  Contenu décompressé: {total:,} bytes')
    
    # Vérifier document.xml
    if 'word/document.xml' in files:
        doc = z.read('word/document.xml').decode()
        paragraphs = doc.count('<w:p ')  + doc.count('<w:p>')
        tables = doc.count('<w:tbl>')
        print(f'  Paragraphes: ~{paragraphs}')
        print(f'  Tableaux: ~{tables}')
        print(f'  Pages estimées: ~{paragraphs // 3}')
    
    print('✅ Document valide')
"
}

status() {
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}  ÉTAT DE PROGRESSION${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}\n"
    
    local parts=(preliminaires part1 part2 part3 part4 part5 part6 annexes)
    local total=0
    local done=0
    
    for part in "${parts[@]}"; do
        local json="$CHAPTERS_DIR/${part}.json"
        local script="$SCRIPTS_DIR/generate_${part}.js"
        
        ((total++))
        
        if [ -f "$json" ]; then
            local elements=$(python3 -c "import json; print(len(json.load(open('$json'))))" 2>/dev/null || echo "?")
            echo -e "  ${GREEN}✅ ${part}${NC} — ${elements} éléments"
            ((done++))
        elif [ -f "$script" ]; then
            echo -e "  ${YELLOW}⏳ ${part}${NC} — script prêt, pas encore généré"
        else
            echo -e "  ${RED}❌ ${part}${NC} — script manquant"
        fi
    done
    
    echo -e "\n  Progression: ${done}/${total} parties"
    
    if [ -f "$OUTPUT_FILE" ]; then
        local size=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo -e "  ${GREEN}📄 Manuel assemblé: $size${NC}"
    else
        echo -e "  ${YELLOW}📄 Manuel non encore assemblé${NC}"
    fi
    
    echo -e "\n  ${BLUE}Sources disponibles:${NC}"
    local src_count=$(ls -1 "$PROJECT_DIR/sources/"*.txt 2>/dev/null | wc -l)
    local md_count=$(ls -1 "$PROJECT_DIR/sources/"S*.md 2>/dev/null | wc -l)
    echo -e "  Documents techniques: ${src_count} fichiers"
    echo -e "  Dialogues de recherche: ${md_count} sessions"
}

clean() {
    echo -e "${YELLOW}🧹 Nettoyage...${NC}"
    rm -f "$CHAPTERS_DIR"/*.json
    rm -f "$OUTPUT_FILE"
    echo -e "${GREEN}✅ Nettoyé${NC}"
}

# ============================================================================
# MAIN
# ============================================================================

case "${1:-all}" in
    all)      generate_all ;;
    part*)    check_deps && generate_part "$1" ;;
    prelim*)  check_deps && generate_part "preliminaires" ;;
    annex*)   check_deps && generate_part "annexes" ;;
    assemble) check_deps && assemble ;;
    validate) validate ;;
    status)   status ;;
    clean)    clean ;;
    help|--help|-h)
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  all        Génère toutes les parties et assemble (défaut)"
        echo "  part1..6   Génère une partie spécifique"
        echo "  assemble   Assemble les parties existantes"
        echo "  validate   Valide le document final"
        echo "  status     Affiche la progression"
        echo "  clean      Nettoie les fichiers générés"
        echo "  help       Affiche cette aide"
        ;;
    *)
        echo -e "${RED}Commande inconnue: $1${NC}"
        echo "Utilisez '$0 help' pour l'aide"
        exit 1
        ;;
esac
