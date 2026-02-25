const fs = require('fs');

// Comprehensive French accent correction map
// Pattern: word without accent -> word with accent
// Only whole-word replacements to avoid false positives
const ACCENT_MAP = {
  // -é endings (past participles, adjectives)
  'presente': 'présenté', 'presentes': 'présentés', 'presentee': 'présentée', 'presentees': 'présentées',
  'detaille': 'détaillé', 'detailles': 'détaillés', 'detaillee': 'détaillée', 'detaillees': 'détaillées',
  'evalue': 'évalué', 'evalues': 'évalués', 'evaluee': 'évaluée', 'evaluees': 'évaluées',
  'etude': 'étude', 'etudes': 'études',
  'etat': 'état', 'etats': 'états',
  'etape': 'étape', 'etapes': 'étapes',
  'etabli': 'établi', 'etablis': 'établis', 'etablie': 'établie', 'etablies': 'établies',
  'etendu': 'étendu', 'etendus': 'étendus', 'etendue': 'étendue', 'etendues': 'étendues',
  'eternel': 'éternel', 'eternels': 'éternels', 'eternelle': 'éternelle', 'eternelles': 'éternelles',
  'etrange': 'étrange', 'etranges': 'étranges',
  'etroit': 'étroit', 'etroits': 'étroits', 'etroite': 'étroite', 'etroites': 'étroites',
  'etre': 'être', 'etres': 'êtres',
  'evenement': 'événement', 'evenements': 'événements',
  'evident': 'évident', 'evidents': 'évidents', 'evidente': 'évidente', 'evidentes': 'évidentes',
  'evolution': 'évolution', 'evolutions': 'évolutions',
  'evolue': 'évolué', 'evoluer': 'évoluer',
  'eleve': 'élevé', 'eleves': 'élevés', 'elevee': 'élevée', 'elevees': 'élevées',
  'element': 'élément', 'elements': 'éléments',
  'elementaire': 'élémentaire', 'elementaires': 'élémentaires',
  'electrique': 'électrique', 'electriques': 'électriques',
  'electricite': 'électricité',
  'electronique': 'électronique', 'electroniques': 'électroniques',
  'electron': 'électron', 'electrons': 'électrons',
  'electromagnetique': 'électromagnétique', 'electromagnetiques': 'électromagnétiques',
  'electrode': 'électrode', 'electrodes': 'électrodes',
  'elabore': 'élaboré', 'elabores': 'élaborés', 'elaboree': 'élaborée',
  'elastique': 'élastique', 'elastiques': 'élastiques',
  'elimination': 'élimination',
  'elimine': 'éliminé', 'eliminer': 'éliminer',
  'emergence': 'émergence',
  'emerger': 'émerger', 'emerge': 'émerge', 'emergent': 'émergent',
  'emotion': 'émotion', 'emotions': 'émotions',
  'emotionnel': 'émotionnel', 'emotionnels': 'émotionnels', 'emotionnelle': 'émotionnelle', 'emotionnelles': 'émotionnelles',
  'enonce': 'énoncé', 'enonces': 'énoncés', 'enoncee': 'énoncée',
  'enorme': 'énorme', 'enormes': 'énormes',
  'enormement': 'énormément',
  'energie': 'énergie', 'energies': 'énergies',
  'energetique': 'énergétique', 'energetiques': 'énergétiques',
  'enigme': 'énigme', 'enigmes': 'énigmes',
  'epais': 'épais', 'epaisse': 'épaisse',
  'epaisseur': 'épaisseur', 'epaisseurs': 'épaisseurs',
  'equilibre': 'équilibre', 'equilibres': 'équilibres',
  'equipe': 'équipé', 'equipes': 'équipés', 'equipee': 'équipée',
  'equipement': 'équipement', 'equipements': 'équipements',
  'equivalent': 'équivalent', 'equivalents': 'équivalents', 'equivalente': 'équivalente',
  'equivalence': 'équivalence',
  'equation': 'équation', 'equations': 'équations',
  'equitable': 'équitable', 'equitables': 'équitables',
  'echange': 'échange', 'echanges': 'échanges',
  'echelle': 'échelle', 'echelles': 'échelles',
  'ecart': 'écart', 'ecarts': 'écarts',
  'ecrit': 'écrit', 'ecrits': 'écrits', 'ecrite': 'écrite', 'ecrites': 'écrites',
  'ecriture': 'écriture',
  'ecosysteme': 'écosystème',
  'economie': 'économie', 'economies': 'économies',
  'economique': 'économique', 'economiques': 'économiques',
  'ecoute': 'écoute',
  'edite': 'édité', 'edition': 'édition',
  'education': 'éducation',
  'efficace': 'efficace', // already correct
  'efficacite': 'efficacité',
  'egalite': 'égalité',
  'egal': 'égal', 'egaux': 'égaux', 'egale': 'égale', 'egales': 'égales',
  'egalement': 'également',

  // -ée endings
  'creee': 'créée', 'crees': 'créés', 'creees': 'créées',
  'donnee': 'donnée', 'donnees': 'données',
  'annee': 'année', 'annees': 'années',
  'duree': 'durée', 'durees': 'durées',
  'entree': 'entrée', 'entrees': 'entrées',
  'idee': 'idée', 'idees': 'idées',
  'propriete': 'propriété', 'proprietes': 'propriétés',

  // -ème endings
  'systeme': 'système', 'systemes': 'systèmes',
  'probleme': 'problème', 'problemes': 'problèmes',
  'theoreme': 'théorème', 'theoremes': 'théorèmes',
  'phenomene': 'phénomène', 'phenomenes': 'phénomènes',
  'modele': 'modèle', 'modeles': 'modèles',
  'troisieme': 'troisième', 'troisiemes': 'troisièmes',
  'deuxieme': 'deuxième', 'deuxiemes': 'deuxièmes',
  'quatrieme': 'quatrième',
  'cinquieme': 'cinquième',
  'sixieme': 'sixième',
  'septieme': 'septième',
  'huitieme': 'huitième',
  'neuvieme': 'neuvième',
  'dixieme': 'dixième',
  'douzieme': 'douzième',
  'centieme': 'centième',
  'millieme': 'millième',
  'supreme': 'suprême',
  'extreme': 'extrême', 'extremes': 'extrêmes',
  'extremement': 'extrêmement',
  'meme': 'même', 'memes': 'mêmes',
  'theme': 'thème', 'themes': 'thèmes',
  'scheme': 'schème', 'schemes': 'schèmes',
  'strategie': 'stratégie', 'strategies': 'stratégies',
  'strategique': 'stratégique', 'strategiques': 'stratégiques',

  // -ité endings
  'densite': 'densité', 'densites': 'densités',
  'identite': 'identité', 'identites': 'identités',
  'integrite': 'intégrité',
  'realite': 'réalité', 'realites': 'réalités',
  'capacite': 'capacité', 'capacites': 'capacités',
  'velocite': 'vélocité',
  'complexite': 'complexité',
  'stabilite': 'stabilité',
  'securite': 'sécurité',
  'specificite': 'spécificité', 'specificites': 'spécificités',
  'sensibilite': 'sensibilité',
  'possibilite': 'possibilité', 'possibilites': 'possibilités',
  'probabilite': 'probabilité', 'probabilites': 'probabilités',
  'simultaneite': 'simultanéité',
  'immutabilite': 'immutabilité',
  'complementarite': 'complémentarité',
  'heterogeneite': 'hétérogénéité',
  'homogeneite': 'homogénéité',
  'plasticite': 'plasticité',
  'elasticite': 'élasticité',
  'electricite': 'électricité',
  'activite': 'activité', 'activites': 'activités',
  'selectivite': 'sélectivité',
  'connectivite': 'connectivité',
  'creativite': 'créativité',
  'quantite': 'quantité', 'quantites': 'quantités',
  'qualite': 'qualité', 'qualites': 'qualités',
  'majorite': 'majorité',
  'minorite': 'minorité',
  'verite': 'vérité', 'verites': 'vérités',
  'liberte': 'liberté', 'libertes': 'libertés',
  'volonte': 'volonté', 'volontes': 'volontés',
  'humanite': 'humanité',
  'divinite': 'divinité',
  'gravite': 'gravité',
  'intensite': 'intensité',
  'totalite': 'totalité',
  'necessite': 'nécessité',
  'rigidite': 'rigidité',
  'rapidite': 'rapidité',
  'diversite': 'diversité',
  'adversite': 'adversité',
  'universalite': 'universalité',
  'vulnerabilite': 'vulnérabilité',
  'societe': 'société', 'societes': 'sociétés',
  'variete': 'variété', 'varietes': 'variétés',
  'solidite': 'solidité',
  'permeabilite': 'perméabilité',
  'viscosite': 'viscosité',
  'luminosite': 'luminosité',
  'conductivite': 'conductivité',
  'resistivite': 'résistivité',
  'difficulte': 'difficulté', 'difficultes': 'difficultés',
  'superiorite': 'supériorité',
  'inferiorite': 'infériorité',
  'anteriorite': 'antériorité',
  'posteriorite': 'postériorité',
  'priorite': 'priorité', 'priorites': 'priorités',
  'autorite': 'autorité',
  'parite': 'parité',
  'sincerite': 'sincérité',
  'fidelite': 'fidélité',
  'souverainete': 'souveraineté',
  'innocuite': 'innocuité',
  'perpetuite': 'perpétuité',
  'continuite': 'continuité',
  'discontinuite': 'discontinuité',
  'ambiguite': 'ambiguïté',
  'spontaneite': 'spontanéité',
  'simultaneite': 'simultanéité',
  'eternite': 'éternité',
  'materialite': 'matérialité',
  'dualite': 'dualité',
  'finalite': 'finalité',
  'moralite': 'moralité',
  'neutralite': 'neutralité',
  'brutalite': 'brutalité',
  'legalite': 'légalité',
  'fatalite': 'fatalité',
  'fonctionnalite': 'fonctionnalité', 'fonctionnalites': 'fonctionnalités',

  // -ie endings
  'geometrie': 'géométrie', 'geometries': 'géométries',
  'geometrique': 'géométrique', 'geometriques': 'géométriques',
  'symetrie': 'symétrie', 'symetries': 'symétries',
  'symetrique': 'symétrique', 'symetriques': 'symétriques',
  'asymetrie': 'asymétrie', 'asymetries': 'asymétries',
  'asymetrique': 'asymétrique', 'asymetriques': 'asymétriques',
  'categorie': 'catégorie', 'categories': 'catégories',
  'theorie': 'théorie', 'theories': 'théories',
  'theorique': 'théorique', 'theoriques': 'théoriques',
  'theoriquement': 'théoriquement',
  'hierarchie': 'hiérarchie', 'hierarchies': 'hiérarchies',
  'hierarchique': 'hiérarchique', 'hierarchiques': 'hiérarchiques',
  'peripherie': 'périphérie',
  'peripherique': 'périphérique', 'peripheriques': 'périphériques',
  'matiere': 'matière', 'matieres': 'matières',

  // -ère endings
  'premiere': 'première', 'premieres': 'premières',
  'derniere': 'dernière', 'dernieres': 'dernières',
  'maniere': 'manière', 'manieres': 'manières',
  'lumiere': 'lumière', 'lumieres': 'lumières',
  'frontiere': 'frontière', 'frontieres': 'frontières',
  'barriere': 'barrière', 'barrieres': 'barrières',
  'entiere': 'entière', 'entieres': 'entières',
  'reguliere': 'régulière', 'regulieres': 'régulières',
  'particuliere': 'particulière', 'particulieres': 'particulières',
  'singuliere': 'singulière',

  // -é verbs and participles
  'cree': 'créé', 'creer': 'créer', 'creent': 'créent', 'creant': 'créant', 'creation': 'création', 'creations': 'créations',
  'cote': 'côté', 'cotes': 'côtés',
  'controle': 'contrôle', 'controles': 'contrôles', 'controler': 'contrôler', 'controlee': 'contrôlée',
  'role': 'rôle', 'roles': 'rôles',
  'pole': 'pôle', 'poles': 'pôles',
  'reseau': 'réseau', 'reseaux': 'réseaux',
  'resoudre': 'résoudre', 'resolu': 'résolu', 'resolus': 'résolus', 'resolue': 'résolue',
  'resolution': 'résolution',
  'resultat': 'résultat', 'resultats': 'résultats',
  'resulte': 'résulte', 'resultant': 'résultant',
  'resiste': 'résiste', 'resister': 'résister', 'resistance': 'résistance', 'resistant': 'résistant',
  'revele': 'révèle', 'reveler': 'révéler', 'revelation': 'révélation',
  'repond': 'répond', 'repondre': 'répondre', 'reponse': 'réponse', 'reponses': 'réponses',
  'refere': 'réfère', 'referer': 'référer', 'reference': 'référence', 'references': 'références',
  'reflexion': 'réflexion', 'reflexions': 'réflexions',
  'region': 'région', 'regions': 'régions',
  'regime': 'régime', 'regimes': 'régimes',
  'regle': 'règle', 'regles': 'règles',
  'regulier': 'régulier', 'reguliers': 'réguliers',
  'regulation': 'régulation',
  'regulierement': 'régulièrement',
  'repete': 'répète', 'repeter': 'répéter', 'repetition': 'répétition',
  'repertoire': 'répertoire',
  'repartition': 'répartition',
  'reel': 'réel', 'reels': 'réels', 'reelle': 'réelle', 'reelles': 'réelles',
  'reellement': 'réellement',
  'realise': 'réalisé', 'realiser': 'réaliser', 'realisation': 'réalisation',
  'reaction': 'réaction', 'reactions': 'réactions',
  'recepteur': 'récepteur', 'recepteurs': 'récepteurs',
  'reciproque': 'réciproque', 'reciproques': 'réciproques',
  'recit': 'récit', 'recits': 'récits',
  'recent': 'récent', 'recents': 'récents', 'recente': 'récente', 'recentes': 'récentes',
  'recemment': 'récemment',
  'recupere': 'récupéré', 'recuperer': 'récupérer', 'recuperation': 'récupération',
  'reduit': 'réduit', 'reduits': 'réduits', 'reduite': 'réduite', 'reduites': 'réduites',
  'reduction': 'réduction',
  'reduire': 'réduire',
  'reveil': 'réveil',
  'reversible': 'réversible', 'reversibles': 'réversibles',
  'irreversible': 'irréversible', 'irreversibles': 'irréversibles',
  'repetee': 'répétée', 'repetees': 'répétées',
  'represente': 'représente', 'representer': 'représenter', 'representation': 'représentation',

  // dé- prefix
  'deja': 'déjà',
  'determine': 'déterminé', 'determiner': 'déterminer', 'determination': 'détermination', 'deterministe': 'déterministe',
  'deplace': 'déplacé', 'deplacer': 'déplacer', 'deplacement': 'déplacement', 'deplacements': 'déplacements',
  'depasse': 'dépassé', 'depasser': 'dépasser', 'depassement': 'dépassement',
  'depend': 'dépend', 'dependre': 'dépendre', 'dependance': 'dépendance', 'dependant': 'dépendant',
  'deploie': 'déploie', 'deployer': 'déployer', 'deploiement': 'déploiement',
  'derive': 'dérivé', 'deriver': 'dériver', 'derivee': 'dérivée', 'derivees': 'dérivées',
  'designe': 'désigné', 'designer': 'désigner', 'designation': 'désignation',
  'desire': 'désiré', 'desirer': 'désirer',
  'desordre': 'désordre',
  'desormais': 'désormais',
  'detruire': 'détruire', 'detruit': 'détruit', 'detruits': 'détruits', 'destruction': 'destruction',
  'detecte': 'détecté', 'detecter': 'détecter', 'detection': 'détection', 'detecteur': 'détecteur',
  'developpe': 'développé', 'developper': 'développer', 'developpement': 'développement',
  'devie': 'dévié', 'devier': 'dévier', 'deviation': 'déviation', 'deviations': 'déviations',
  'decrit': 'décrit', 'decrits': 'décrits', 'decrite': 'décrite', 'decrites': 'décrites',
  'decrire': 'décrire', 'decrivant': 'décrivant',
  'decode': 'décodé', 'decoder': 'décoder', 'decodage': 'décodage',
  'decompose': 'décomposé', 'decomposer': 'décomposer', 'decomposition': 'décomposition',
  'declenche': 'déclenché', 'declencher': 'déclencher', 'declenchement': 'déclenchement',
  'declare': 'déclaré', 'declarer': 'déclarer', 'declaration': 'déclaration',
  'dedie': 'dédié', 'dedies': 'dédiés', 'dediee': 'dédiée', 'dediees': 'dédiées',
  'defini': 'défini', 'definis': 'définis', 'definie': 'définie', 'definies': 'définies',
  'definir': 'définir', 'definition': 'définition', 'definitions': 'définitions',
  'definitif': 'définitif', 'definitifs': 'définitifs', 'definitive': 'définitive',
  'definitivement': 'définitivement',
  'defi': 'défi', 'defis': 'défis',
  'degrade': 'dégradé', 'degrader': 'dégrader', 'degradation': 'dégradation',
  'degre': 'degré', 'degres': 'degrés',
  'delibere': 'délibéré', 'deliberement': 'délibérément',
  'delicat': 'délicat', 'delicats': 'délicats', 'delicate': 'délicate',
  'demontre': 'démontré', 'demontrer': 'démontrer', 'demonstration': 'démonstration',
  'denomme': 'dénommé',
  'depolarisation': 'dépolarisation',

  // pré- prefix
  'precise': 'précisé', 'preciser': 'préciser', 'precision': 'précision', 'precisions': 'précisions',
  'precis': 'précis', 'precise': 'précise', 'precises': 'précises', 'precisement': 'précisément',
  'precedent': 'précédent', 'precedents': 'précédents', 'precedente': 'précédente',
  'precede': 'précède', 'preceder': 'précéder',
  'predominant': 'prédominant', 'predominante': 'prédominante',
  'prefere': 'préféré', 'preferer': 'préférer', 'preference': 'préférence',
  'preliminaire': 'préliminaire', 'preliminaires': 'préliminaires',
  'premier': 'premier', // already correct, no accent
  'premature': 'prématuré', 'prematuree': 'prématurée',
  'preoccupation': 'préoccupation',
  'preparation': 'préparation',
  'prepare': 'préparé', 'preparer': 'préparer',
  'presence': 'présence',
  'present': 'présent', 'presents': 'présents', 'presente': 'présente', 'presentes': 'présentes',
  'preservation': 'préservation',
  'preserve': 'préservé', 'preserver': 'préserver',
  'prevoit': 'prévoit', 'prevoir': 'prévoir', 'prevu': 'prévu', 'prevus': 'prévus', 'prevue': 'prévue',
  'prevision': 'prévision',
  'previent': 'prévient', 'prevenir': 'prévenir',
  'prediction': 'prédiction', 'predictions': 'prédictions',
  'predictif': 'prédictif', 'predictive': 'prédictive',

  // spé-, sé- prefix
  'specifique': 'spécifique', 'specifiques': 'spécifiques',
  'specifiquement': 'spécifiquement',
  'specification': 'spécification', 'specifications': 'spécifications',
  'specialise': 'spécialisé', 'specialises': 'spécialisés', 'specialisee': 'spécialisée',
  'specialisation': 'spécialisation',
  'specialiste': 'spécialiste', 'specialistes': 'spécialistes',
  'separe': 'séparé', 'separer': 'séparer', 'separation': 'séparation', 'separations': 'séparations',
  'separes': 'séparés', 'separee': 'séparée', 'separees': 'séparées', 'separement': 'séparément',
  'sequence': 'séquence', 'sequences': 'séquences',
  'sequentiel': 'séquentiel', 'sequentielle': 'séquentielle',
  'securise': 'sécurisé', 'securiser': 'sécuriser',
  'selectif': 'sélectif', 'selective': 'sélective', 'selection': 'sélection',
  'selectionne': 'sélectionné', 'selectionner': 'sélectionner',
  'severe': 'sévère', 'severes': 'sévères',
  'severite': 'sévérité',

  // Other common words
  'frequence': 'fréquence', 'frequences': 'fréquences',
  'frequent': 'fréquent', 'frequents': 'fréquents', 'frequente': 'fréquente',
  'frequemment': 'fréquemment',
  'memoire': 'mémoire', 'memoires': 'mémoires',
  'general': 'général', 'generaux': 'généraux', 'generale': 'générale', 'generales': 'générales',
  'generalement': 'généralement',
  'genere': 'généré', 'generer': 'générer', 'generation': 'génération', 'generations': 'générations',
  'generateur': 'générateur', 'generateurs': 'générateurs',
  'gene': 'gêne', 'genes': 'gênes',
  'genetique': 'génétique', 'genetiques': 'génétiques',
  'necessaire': 'nécessaire', 'necessaires': 'nécessaires',
  'necessairement': 'nécessairement',
  'negation': 'négation',
  'negatif': 'négatif', 'negatifs': 'négatifs', 'negative': 'négative', 'negatives': 'négatives',
  'negligeable': 'négligeable', 'negligeables': 'négligeables',
  'nerf': 'nerf', // no accent
  'numero': 'numéro', 'numeros': 'numéros',
  'numerique': 'numérique', 'numeriques': 'numériques',
  'numeriquement': 'numériquement',
  'integre': 'intégré', 'integrer': 'intégrer', 'integration': 'intégration',
  'integres': 'intégrés', 'integree': 'intégrée',
  'integrite': 'intégrité',
  'interesse': 'intéressé', 'interesser': 'intéresser', 'interessant': 'intéressant',
  'interieur': 'intérieur', 'interieurs': 'intérieurs', 'interieure': 'intérieure',
  'intermediaire': 'intermédiaire', 'intermediaires': 'intermédiaires',
  'interpretation': 'interprétation', 'interpretations': 'interprétations',
  'interprete': 'interprété', 'interpreter': 'interpréter',
  'inherent': 'inhérent', 'inherents': 'inhérents', 'inherente': 'inhérente',
  'intrinseque': 'intrinsèque', 'intrinseques': 'intrinsèques',
  'inegalite': 'inégalité', 'inegalites': 'inégalités',
  'independant': 'indépendant', 'independants': 'indépendants', 'independante': 'indépendante',
  'independamment': 'indépendamment',
  'independance': 'indépendance',
  'indefini': 'indéfini', 'indefinis': 'indéfinis', 'indefinie': 'indéfinie',
  'indesirable': 'indésirable', 'indesirables': 'indésirables',
  'inevitable': 'inévitable', 'inevitables': 'inévitables',
  'inevitablement': 'inévitablement',
  'inferieur': 'inférieur', 'inferieurs': 'inférieurs', 'inferieure': 'inférieure',
  'superieur': 'supérieur', 'superieurs': 'supérieurs', 'superieure': 'supérieure',
  'exterieur': 'extérieur', 'exterieurs': 'extérieurs', 'exterieure': 'extérieure',
  'ulterieur': 'ultérieur', 'ulterieurs': 'ultérieurs', 'ulterieure': 'ultérieure',
  'anterieur': 'antérieur', 'anterieurs': 'antérieurs', 'anterieure': 'antérieure',
  'posterieur': 'postérieur',
  'litteralement': 'littéralement',
  'litteraire': 'littéraire', 'litteraires': 'littéraires',
  'litterature': 'littérature',
  'libere': 'libéré', 'liberer': 'libérer', 'liberation': 'libération',
  'legere': 'légère', 'legeres': 'légères', 'leger': 'léger', 'legers': 'légers',
  'legerement': 'légèrement',
  'legitimite': 'légitimité',
  'legiferent': 'légifèrent',
  'different': 'différent', 'differents': 'différents', 'differente': 'différente', 'differentes': 'différentes',
  'difference': 'différence', 'differences': 'différences',
  'differentiel': 'différentiel', 'differentielle': 'différentielle',
  'differencier': 'différencier',
  'difficile': 'difficile', // no accent needed
  'dissipe': 'dissipé', 'dissiper': 'dissiper', 'dissipation': 'dissipation',
  'methode': 'méthode', 'methodes': 'méthodes',
  'methodologie': 'méthodologie',
  'mecanisme': 'mécanisme', 'mecanismes': 'mécanismes',
  'mecanique': 'mécanique', 'mecaniques': 'mécaniques',
  'metal': 'métal', 'metaux': 'métaux', 'metallique': 'métallique', 'metalliques': 'métalliques',
  'metaphore': 'métaphore', 'metaphores': 'métaphores',
  'metaphorique': 'métaphorique',
  'metaphysique': 'métaphysique',
  'metrique': 'métrique', 'metriques': 'métriques',
  'metre': 'mètre', 'metres': 'mètres',
  'nanometre': 'nanomètre', 'nanometres': 'nanomètres',
  'nanometrique': 'nanométrique', 'nanometriques': 'nanométriques',
  'diametre': 'diamètre', 'diametres': 'diamètres',
  'perimetre': 'périmètre',
  'parametre': 'paramètre', 'parametres': 'paramètres',
  'medecine': 'médecine',
  'media': 'média', 'medias': 'médias',
  'mediateur': 'médiateur',
  'meditation': 'méditation',
  'melange': 'mélange', 'melanges': 'mélanges',
  'opera': 'opéra',
  'opere': 'opère', 'operer': 'opérer', 'operation': 'opération', 'operations': 'opérations',
  'opere': 'opéré',
  'operationnel': 'opérationnel', 'operationnelle': 'opérationnelle',
  'accelere': 'accéléré', 'accelerer': 'accélérer', 'acceleration': 'accélération',
  'tolere': 'toléré', 'tolerer': 'tolérer', 'tolerance': 'tolérance',
  'genere': 'généré', // duplicate safe
  'verifie': 'vérifié', 'verifier': 'vérifier', 'verification': 'vérification',
  'veritable': 'véritable', 'veritables': 'véritables',
  'veritablement': 'véritablement',
  'revele': 'révèle',
  'reflechir': 'réfléchir', 'reflechi': 'réfléchi',
  'repeter': 'répéter',
  'considere': 'considéré', 'considerer': 'considérer', 'consideration': 'considération',
  'considerable': 'considérable', 'considerables': 'considérables',
  'considerablement': 'considérablement',
  'caracteristique': 'caractéristique', 'caracteristiques': 'caractéristiques',
  'caractere': 'caractère', 'caracteres': 'caractères',
  'cerebral': 'cérébral', 'cerebraux': 'cérébraux', 'cerebrale': 'cérébrale',
  'ceremonie': 'cérémonie',
  'penetre': 'pénètre', 'penetrer': 'pénétrer', 'penetration': 'pénétration',
  'repere': 'repère', 'reperes': 'repères',
  'reveler': 'révéler',
  'aleatoire': 'aléatoire', 'aleatoires': 'aléatoires',
  'algebrique': 'algébrique',
  'hypothese': 'hypothèse', 'hypotheses': 'hypothèses',
  'synthetique': 'synthétique', 'synthetiques': 'synthétiques',
  'synthese': 'synthèse', 'syntheses': 'synthèses',
  'these': 'thèse', 'theses': 'thèses',
  'critere': 'critère', 'criteres': 'critères',
  'sphere': 'sphère', 'spheres': 'sphères',
  'spherique': 'sphérique', 'spheriques': 'sphériques',
  'atmosphere': 'atmosphère',
  'phenomenal': 'phénoménal',
  'phenomenologique': 'phénoménologique',
  'antimatiere': 'antimatière',
  'completement': 'complètement',
  'complete': 'complète', 'completer': 'compléter', 'completes': 'complètes',
  'completude': 'complétude',
  'incompletude': 'incomplétude',
  'concrete': 'concrète', 'concretes': 'concrètes', 'concretement': 'concrètement',
  'discrete': 'discrète', 'discretes': 'discrètes',
  'secrete': 'secrète',
  'interprete': 'interprète', 'interpretes': 'interprètes',
  'fidele': 'fidèle', 'fideles': 'fidèles',
  'celebre': 'célèbre', 'celebres': 'célèbres',
  'accelere': 'accélère',
  'tolere': 'tolère',
  'tempere': 'tempéré', 'temperature': 'température', 'temperatures': 'températures',
  'modere': 'modéré',
  'preferable': 'préférable',
  'preferentiellement': 'préférentiellement',
  'heterogene': 'hétérogène', 'heterogenes': 'hétérogènes',
  'homogene': 'homogène', 'homogenes': 'homogènes',
  'oxygene': 'oxygène',
  'hydrogene': 'hydrogène',
  'azote': 'azote', // no accent
  'helice': 'hélice', 'helices': 'hélices',
  'helicoidal': 'hélicoïdal', 'helicoidale': 'hélicoïdale',

  // â words
  'grace': 'grâce',
  'tache': 'tâche', 'taches': 'tâches',
  'age': 'âge',

  // ô words
  'depot': 'dépôt', 'depots': 'dépôts',
  'hopital': 'hôpital', 'hopitaux': 'hôpitaux',

  // î words
  'nait': 'naît',
  'connait': 'connaît', 'connaitre': 'connaître',
  'apparait': 'apparaît', 'apparaitre': 'apparaître',
  'disparait': 'disparaît', 'disparaitre': 'disparaître',
  'chaine': 'chaîne', 'chaines': 'chaînes',
  'maitre': 'maître', 'maitres': 'maîtres',
  'maitrise': 'maîtrise', 'maitriser': 'maîtriser',
  'entrainer': 'entraîner', 'entraine': 'entraîné', 'entrainement': 'entraînement',

  // ù words - just "où"
  'ou': null, // skip - too ambiguous (ou/où)

  // Common words with è
  'acces': 'accès',
  'apres': 'après',
  'aupres': 'auprès',
  'progres': 'progrès',
  'proces': 'procès',
  'succes': 'succès',
  'exces': 'excès',
  'congres': 'congrès',
  'expres': 'exprès',
  'tres': 'très',
  'a travers': 'à travers',
  'des': null, // skip - too ambiguous
  'les': null, // skip
  'mes': null, // skip

  // Common -eur words that need é
  'superieur': 'supérieur',
  'anterieur': 'antérieur',

  // Misc
  'plutot': 'plutôt',
  'tot': 'tôt',
  'arret': 'arrêt', 'arrets': 'arrêts',
  'arreter': 'arrêter', 'arrete': 'arrêté',
  'foret': 'forêt', 'forets': 'forêts',
  'interet': 'intérêt', 'interets': 'intérêts',
  'fenetre': 'fenêtre', 'fenetres': 'fenêtres',
  'tete': 'tête', 'tetes': 'têtes',
  'enquete': 'enquête',
  'pret': 'prêt', 'prets': 'prêts', 'prete': 'prête',
  'reveil': 'réveil',
  'reve': 'rêve', 'reves': 'rêves', 'rever': 'rêver',
  'hetero': 'hétéro',
  'protege': 'protégé', 'proteger': 'protéger', 'proteges': 'protégés',
  'protection': 'protection', // no accent
  'immediat': 'immédiat', 'immediats': 'immédiats', 'immediate': 'immédiate', 'immediates': 'immédiates',
  'immediatement': 'immédiatement',
  'intermediaire': 'intermédiaire',
  'remedier': 'remédier',
  'complet': 'complet', // no accent in masculine
  'inquiet': 'inquiet', // no accent in masculine
  'secret': 'secret', // no accent in masculine
  'concret': 'concret', // no accent in masculine
  'discret': 'discret', // no accent in masculine
  'indiscret': 'indiscret',
  'obsolete': 'obsolète',
  'athlete': 'athlète',
  'diabete': 'diabète',
  'planete': 'planète', 'planetes': 'planètes',
  'magnetique': 'magnétique', 'magnetiques': 'magnétiques',
  'magnetisme': 'magnétisme',
  'cinetique': 'cinétique',
  'esthetique': 'esthétique',
  'pathetique': 'pathétique',
  'synthetique': 'synthétique',
  'hermetique': 'hermétique',
  'dietetique': 'diététique',
  'genetique': 'génétique',
  'therapeutique': 'thérapeutique',
  'acoustique': 'acoustique', // no accent
  'algebre': 'algèbre',
  'fidele': 'fidèle',
  'modele': 'modèle',
  'parallele': 'parallèle', 'paralleles': 'parallèles',
  'simultanement': 'simultanément',
  'separement': 'séparément',
  'deliberement': 'délibérément',
  'sincerement': 'sincèrement',
  'severement': 'sévèrement',
  'entierement': 'entièrement',
  'completement': 'complètement',
  'concretement': 'concrètement',
  'secretement': 'secrètement',
  'inherente': 'inhérente',
  'coherent': 'cohérent', 'coherents': 'cohérents', 'coherente': 'cohérente',
  'coherence': 'cohérence',
  'incoherent': 'incohérent', 'incoherents': 'incohérents',
  'incoherence': 'incohérence',
  'adherent': 'adhérent',
  'adherence': 'adhérence',
  'preference': 'préférence', 'preferences': 'préférences',

  // === BATCH 2: Words found still missing in part3/part4 ===
  // Cognitive / philosophical terms
  'defilement': 'défilement',
  'deliberation': 'délibération',
  'deliberee': 'délibérée', 'delibere': 'délibéré',
  'pensee': 'pensée', 'pensees': 'pensées',
  'possede': 'possède', 'posseder': 'posséder', 'possedent': 'possèdent',
  'decrivait': 'décrivait', 'decrit': 'décrit', 'decrite': 'décrite', 'decrites': 'décrites',
  'prefrontal': 'préfrontal', 'prefrontale': 'préfrontale',
  'reflexe': 'réflexe', 'reflexes': 'réflexes',
  'echoique': 'échoïque',
  'rememoration': 'remémoration',
  'episodique': 'épisodique', 'episodiques': 'épisodiques',
  'semantique': 'sémantique', 'semantiques': 'sémantiques',
  'memorielle': 'mémorielle', 'memoriel': 'mémoriel', 'memorielles': 'mémorielles',
  'comprehension': 'compréhension',
  'personnalite': 'personnalité',
  'competences': 'compétences', 'competence': 'compétence',
  'experientielle': 'expérientielle',
  'coincidence': 'coïncidence', 'coincidences': 'coïncidences',
  'metabolisme': 'métabolisme',
  'facultes': 'facultés', 'faculte': 'faculté',

  // Science / engineering terms
  'geometrie': 'géométrie', 'geometrique': 'géométrique', 'geometriques': 'géométriques',
  'meridien': 'méridien', 'meridiens': 'méridiens',
  'helicoidal': 'hélicoïdal', 'helicoidaux': 'hélicoïdaux', 'helicoidale': 'hélicoïdale',
  'planetaire': 'planétaire', 'planetaires': 'planétaires',
  'levitation': 'lévitation',
  'equilibre': 'équilibre', 'equilibres': 'équilibres',
  'equilibrage': 'équilibrage',
  'desequilibre': 'déséquilibre', 'desequilibres': 'déséquilibres',
  'resonance': 'résonance', 'resonances': 'résonances',
  'stationnarite': 'stationnarité',
  'ingenierie': 'ingénierie',
  'precontraint': 'précontraint', 'precontrainte': 'précontrainte',
  'beton': 'béton',
  'materiau': 'matériau', 'materiaux': 'matériaux',
  'magnetique': 'magnétique', 'magnetiques': 'magnétiques',
  'magnetoception': 'magnétoception',
  'electroception': 'électroception',
  'echolocation': 'écholocation',
  'acuite': 'acuité',
  'densite': 'densité',
  'sobriete': 'sobriété',
  'energetiquement': 'énergétiquement',
  'equidistribue': 'équidistribué',
  'lateralement': 'latéralement',
  'laterale': 'latérale', 'laterales': 'latérales', 'lateral': 'latéral',
  'geopolitique': 'géopolitique',
  'precomprime': 'précomprimé',
  'permeable': 'perméable',

  // Action / process words (unambiguous)
  'decelerer': 'décélérer',
  'exceder': 'excéder',
  'liberant': 'libérant',
  'generant': 'générant',
  'executees': 'exécutées', 'executee': 'exécutée',
  'demarrage': 'démarrage',
  'redemarrage': 'redémarrage',
  'alteration': 'altération', 'alterations': 'altérations',
  'iteration': 'itération', 'iterations': 'itérations',
  'iteratifs': 'itératifs', 'iteratif': 'itératif',
  'resurrection': 'résurrection',
  'decroissante': 'décroissante', 'decroissant': 'décroissant',
  'decroitre': 'décroître',
  'spontanement': 'spontanément',
  'intrinsequement': 'intrinsèquement',
  'resolvant': 'résolvant',
  'retrograde': 'rétrograde', 'retrogrades': 'rétrogrades',
  'resonne': 'résonne', 'resonner': 'résonner',
  'interfere': 'interfère',
  'souleve': 'soulève', 'soulever': 'soulever',
  'reflechit': 'réfléchit', 'reflechis': 'réfléchis',
  'digerer': 'digérer',
  'decider': 'décider',
  'deconnecte': 'déconnecté',
  'percue': 'perçue', 'percu': 'perçu', 'percus': 'perçus',

  // Adjective / descriptive (unambiguous)
  'eclairante': 'éclairante', 'eclairant': 'éclairant',
  'ideal': 'idéal', 'ideale': 'idéale', 'ideaux': 'idéaux',
  'realiste': 'réaliste', 'realistes': 'réalistes',
  'realisable': 'réalisable', 'realisables': 'réalisables',
  'imprevisibles': 'imprévisibles', 'imprevisible': 'imprévisible',
  'perpetuel': 'perpétuel', 'perpetuelle': 'perpétuelle',
  'supplementaire': 'supplémentaire', 'supplementaires': 'supplémentaires',
  'simultanees': 'simultanées', 'simultanee': 'simultanée',
  'residuels': 'résiduels', 'residuel': 'résiduel',
  'tiede': 'tiède', 'tiedes': 'tièdes',
  'illimite': 'illimité', 'illimitee': 'illimitée',
  'indefiniment': 'indéfiniment',
  'instantane': 'instantané', 'instantanee': 'instantanée',
  'interieures': 'intérieures', 'interieur': 'intérieur', 'interieure': 'intérieure',
  'exterieures': 'extérieures', 'exterieur': 'extérieur', 'exterieure': 'extérieure',
  'beaute': 'beauté',
  'siecle': 'siècle', 'siecles': 'siècles',
  'genie': 'génie',
  'creative': 'créative', 'creatif': 'créatif', 'creatives': 'créatives',
  'referentiel': 'référentiel', 'referentiels': 'référentiels',

  // Nouns (unambiguous)
  'barriere': 'barrière', 'barrieres': 'barrières',
  'consequence': 'conséquence', 'consequences': 'conséquences',
  'comites': 'comités', 'comite': 'comité',
  'entite': 'entité', 'entites': 'entités',
  'regime': 'régime', 'regimes': 'régimes',
  'resultat': 'résultat', 'resultats': 'résultats',
  'probleme': 'problème', 'problemes': 'problèmes',
  'medium': 'médium', 'mediums': 'médiums',
  'defi': 'défi', 'defis': 'défis',
  'reve': 'rêve', 'reves': 'rêves',
  'resistance': 'résistance', 'resistances': 'résistances',
  'decouverte': 'découverte', 'decouvertes': 'découvertes',
  'decouvre': 'découvre',
  'duree': 'durée', 'durees': 'durées',
  'reflexion': 'réflexion', 'reflexions': 'réflexions',
  'experience': 'expérience', 'experiences': 'expériences',
  'securite': 'sécurité',
  'reorganisation': 'réorganisation',
  'developpement': 'développement', 'developpements': 'développements',
  'montee': 'montée',
  'traversee': 'traversée',
  'cherchee': 'cherchée',
  'trouvee': 'trouvée',
  'multipliee': 'multipliée',
  'localisee': 'localisée',
  'prolongee': 'prolongée',
  'renforcees': 'renforcées', 'renforcee': 'renforcée',
  'elaguees': 'élaguées',
  'rejouees': 'rejouées',
  'optimisee': 'optimisée',
  'transferes': 'transférés',
  'encodes': 'encodés',
  'unifies': 'unifiés',
  'attenues': 'atténués',
  'figes': 'figés',
  'marques': 'marqués',

  // Verbs (unambiguous conjugations)
  'considerons': 'considérons',
  'emet': 'émet',
  'degage': 'dégage',
  'empeche': 'empêche',
  'determinent': 'déterminent',
  'etait': 'était', 'etaient': 'étaient',
  'ete': 'été',
  'malgre': 'malgré',
  'apres': 'après',

  // Compound / hyphenated context
  'legere': 'légère', 'leger': 'léger', 'legers': 'légers', 'legeres': 'légères',
  'meme': 'même', 'memes': 'mêmes',
  'honnetement': 'honnêtement',
  'defile': 'défile',
  'destine': 'destiné', 'destines': 'destinés', 'destinee': 'destinée',
  'prive': 'privé', 'privee': 'privée',
  'incarne': 'incarné', 'incarnee': 'incarnée',
  'isole': 'isolé', 'isolee': 'isolée', 'isoles': 'isolés',
  'optimise': 'optimisé',
  'systematiquement': 'systématiquement',
  'definit': 'définit', 'definir': 'définir',
  'controle': 'contrôle', 'controles': 'contrôles',
  'detruite': 'détruite', 'detruites': 'détruites', 'detruit': 'détruit',
};

function fixAccents(text) {
  if (!text || typeof text !== 'string') return text;

  let result = text;

  for (const [wrong, correct] of Object.entries(ACCENT_MAP)) {
    if (correct === null) continue; // skip ambiguous words
    if (wrong === correct) continue; // skip if same

    // Use word boundary regex for whole-word replacement
    // Handle both lowercase and Title Case variants
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // If first letter is uppercase, capitalize the correction too
      if (match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase()) {
        return correct[0].toUpperCase() + correct.slice(1);
      }
      return correct;
    });
  }

  // Contextual "a" → "à" replacements (preposition patterns, not verb "avoir")
  // These patterns are safe because the word following "a" makes it unambiguous
  const aContextPatterns = [
    // "a + article/preposition" patterns
    [/\ba la\b/g, 'à la'],
    [/\ba l'/g, 'à l\''],
    [/\ba le\b/g, 'à le'],  // rare but exists
    [/\ba les\b/g, 'à les'],
    [/\ba un\b/g, 'à un'],
    [/\ba une\b/g, 'à une'],
    [/\ba des\b/g, 'à des'],
    [/\ba son\b/g, 'à son'],
    [/\ba sa\b/g, 'à sa'],
    [/\ba ses\b/g, 'à ses'],
    [/\ba leur\b/g, 'à leur'],
    [/\ba leurs\b/g, 'à leurs'],
    [/\ba notre\b/g, 'à notre'],
    [/\ba nos\b/g, 'à nos'],
    [/\ba votre\b/g, 'à votre'],
    [/\ba ce\b/g, 'à ce'],
    [/\ba cette\b/g, 'à cette'],
    [/\ba ces\b/g, 'à ces'],
    [/\ba chaque\b/g, 'à chaque'],
    [/\ba tout\b/g, 'à tout'],
    [/\ba toute\b/g, 'à toute'],
    [/\ba toutes\b/g, 'à toutes'],
    [/\ba tous\b/g, 'à tous'],
    [/\ba partir\b/g, 'à partir'],
    [/\ba travers\b/g, 'à travers'],
    [/\ba cause\b/g, 'à cause'],
    [/\ba condition\b/g, 'à condition'],
    [/\ba mesure\b/g, 'à mesure'],
    [/\ba nouveau\b/g, 'à nouveau'],
    [/\bface a\b/g, 'face à'],
    [/\bquant a\b/g, 'quant à'],
    [/\bgrace a\b/g, 'grâce à'],
    [/\bjusqu'a\b/g, 'jusqu\'à'],
    // Title case variants
    [/\bA la\b/g, 'À la'],
    [/\bA l'/g, 'À l\''],
    [/\bA chaque\b/g, 'À chaque'],
    [/\bA partir\b/g, 'À partir'],
    [/\bA travers\b/g, 'À travers'],
    // "ou" → "où" in common patterns
    [/\bla ou\b/g, 'là où'],
  ];

  for (const [pattern, replacement] of aContextPatterns) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

function processJsonFile(filePath) {
  console.log(`\nTraitement de ${filePath}...`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  let totalFixes = 0;

  function walk(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(walk);
    } else if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        if (key === 'text' && typeof obj[key] === 'string') {
          const original = obj[key];
          const fixed = fixAccents(original);
          if (fixed !== original) {
            // Count differences
            const origWords = original.split(/\s+/);
            const fixedWords = fixed.split(/\s+/);
            let diffs = 0;
            for (let i = 0; i < origWords.length; i++) {
              if (origWords[i] !== fixedWords[i]) diffs++;
            }
            totalFixes += diffs;
            obj[key] = fixed;
          }
        } else if (typeof obj[key] === 'string' && (key === 'headers' || key === 'rows')) {
          // skip
        } else {
          walk(obj[key]);
        }
      }
    }
  }

  // Also fix strings in arrays (table headers, rows)
  function walkAll(obj) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'string') {
          const fixed = fixAccents(obj[i]);
          if (fixed !== obj[i]) {
            const origWords = obj[i].split(/\s+/);
            const fixedWords = fixed.split(/\s+/);
            let diffs = 0;
            for (let j = 0; j < origWords.length; j++) {
              if (origWords[j] !== fixedWords[j]) diffs++;
            }
            totalFixes += diffs;
            obj[i] = fixed;
          }
        } else {
          walkAll(obj[i]);
        }
      }
    } else if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        if (key === 'text' && typeof obj[key] === 'string') {
          const original = obj[key];
          const fixed = fixAccents(original);
          if (fixed !== original) {
            const origWords = original.split(/\s+/);
            const fixedWords = fixed.split(/\s+/);
            let diffs = 0;
            for (let i = 0; i < origWords.length; i++) {
              if (origWords[i] !== fixedWords[i]) diffs++;
            }
            totalFixes += diffs;
            obj[key] = fixed;
          }
        }
        walkAll(obj[key]);
      }
    }
  }

  walkAll(data);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`  ✅ ${totalFixes} mots corrigés`);
  return totalFixes;
}

const total = processJsonFile('/mnt/d/conscience_souveraine/chapters/part3.json')
            + processJsonFile('/mnt/d/conscience_souveraine/chapters/part4.json');

console.log(`\n=== TOTAL: ${total} mots corrigés ===`);
