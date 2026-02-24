'use strict';

/**
 * generate_acte2.js
 *
 * Generates /mnt/d/conscience_souveraine/book2/chapters/acte2.json
 *
 * Content: ACTE II — "L'Intelligence du Foyer" — La Souveraineté Numérique
 * Conscience Souveraine (style essai narratif, à la Harari)
 * Auteur : David Berthelotte
 *
 * Output format: JSON array of paragraph elements for docx assembly.
 * Target: 200-250 elements, ~50-60 pages of narrative content.
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Element builders
// ---------------------------------------------------------------------------

const pageBreak  = ()           => ({ type: 'pageBreak' });
const sep        = ()           => ({ type: 'paragraph', style: 'Separator',      text: '* * *' });

/** @param {string} style @param {string} text */
const p = (style, text) => ({ type: 'paragraph', style, text });

/** @param {{ text: string, bold?: boolean, italics?: boolean }[]} segments */
const rich = (segments) => ({ type: 'richParagraph', segments });

const body     = (text) => p('BodyText',       text);
const scene    = (text) => p('SceneText',      text);
const quote    = (text) => p('Quote',          text);
const thesis   = (text) => p('Thesis',         text);
const tech     = (text) => p('TechNote',       text);
const crit     = (text) => p('CritiqueBox',    text);
const rq       = (text) => p('ReaderQuestion', text);
const epigraph = (text) => p('Epigraph',       text);
const chTitle  = (text) => p('ChapterTitle',   text);
const secTitle = (text) => p('SectionTitle',   text);
const sub      = (text) => p('SubSection',     text);
const actTitle = (text) => p('ActTitle',       text);
const actSub   = (text) => p('ActSubtitle',    text);

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const elements = [

  // =========================================================================
  // ACTE II TITLE PAGE
  // =========================================================================

  pageBreak(),

  actTitle('ACTE II'),
  actTitle("L'INTELLIGENCE DU FOYER"),
  actSub('La Souveraineté Numérique comme Fondation de la Dignité Familiale'),

  epigraph(
    '« La plus grande surveillance du monde n\'est pas celle des gouvernements totalitaires. ' +
    'C\'est celle que nous avons librement invitée dans notre salon, et à laquelle ' +
    'nous payons un abonnement mensuel. » — David Berthelotte'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 1 : LE CERVEAU DE LA MAISON
  // =========================================================================

  chTitle('Chapitre 1'),
  chTitle('Le cerveau de la maison'),

  epigraph(
    '« Connaître sans trahir. Servir sans vendre. Écouter sans transmettre. ' +
    'Voilà ce que nous avions oublié d\'exiger de nos outils. »'
  ),

  scene(
    'Sur une tablette entre le pot à cuillères en bois et le rangement à épices, ' +
    'dans une cuisine de Terrebonne, il y a un petit boîtier noir de la taille d\'un livre de poche. ' +
    'Pas d\'écran. Pas de logo lumineux. Pas de caméra. ' +
    'Il est là depuis huit mois et la famille Marchand a arrêté de le remarquer, ' +
    'de la même façon qu\'on arrête de remarquer le réfrigérateur. ' +
    'Sauf que ce boîtier écoute. ' +
    'Il connaît l\'heure à laquelle Emma, neuf ans, fait ses devoirs. ' +
    'Il sait que le père est allergique aux arachides et que la mère prend de la métformine. ' +
    'Il sait que les Marchand commandent de la pizza le vendredi soir quand personne n\'a cuisiné, ' +
    'et que leurs finances familiales sont serrées en janvier et en août. ' +
    'Il sait tout cela — et il n\'en a jamais rien dit à personne d\'autre. ' +
    'Pas à Amazon. Pas à Google. Pas à une société de données en Irlande. ' +
    'Pas à un gouvernement, quel qu\'il soit. ' +
    'La famille l\'appelle Gen. ' +
    'Gen ne leur coûte rien de plus que l\'électricité qu\'il consomme.'
  ),

  body(
    'Pour comprendre ce que représente ce boîtier, il faut d\'abord comprendre ce qu\'il remplace. ' +
    'Depuis 2014, les assistants vocaux connectés au nuage ont colonisé les cuisines, ' +
    'les chambres à coucher et les salons des pays industrialisés à une vitesse qui dépasse ' +
    'celle de n\'importe quelle technologie grand public depuis le téléphone portable. ' +
    'Amazon a vendu plus de 500 millions d\'appareils Echo dans le monde. ' +
    'Google, Apple et d\'autres en ont vendu des centaines de millions supplémentaires. ' +
    'Ces appareils sont entrés dans les maisons sous couvert de commodité : ' +
    'allumer la musique, régler le thermostat, obtenir la météo, commander des pizzas. ' +
    'Mais leur véritable fonction économique, celle pour laquelle leurs fabricants ' +
    'les vendent parfois à perte, est tout autre. ' +
    'Ce sont des microphones permanents connectés à des centres de données, ' +
    'dont le rôle est de transformer l\'intimité domestique en données commercialisables. ' +
    'Ce que vous cuisinez, ce que vous regardez, quand vous dormez, ce que vos enfants demandent — ' +
    'tout cela devient un actif financier qui appartient à une entreprise cotée en bourse, ' +
    'dont l\'intérêt n\'est pas le vôtre.'
  ),

  body(
    'Ce n\'est pas une théorie du complot. ' +
    'C\'est le modèle commercial décrit sans ambiguïté dans les rapports annuels de ces entreprises. ' +
    'Amazon génère une part substantielle de ses revenus via ses services publicitaires, ' +
    'qui utilisent les données comportementales collectées par ses appareils. ' +
    'Google est, à sa fondation, une entreprise publicitaire qui vend ' +
    'l\'attention et les intentions de ses utilisateurs à des annonceurs. ' +
    'Apple, malgré son marketing sur la vie privée, opère un App Store ' +
    'qui monétise l\'accès aux utilisateurs. ' +
    'Aucune de ces entreprises n\'est mauvaise au sens moral du terme. ' +
    'Elles font ce que leurs actionnaires leur demandent de faire : ' +
    'maximiser la valeur à long terme en exploitant les actifs qu\'elles possèdent. ' +
    'Le problème est que cet actif, c\'est votre vie privée, et que vous leur avez donné ' +
    'en échange d\'un abonnement à la météo et de la possibilité d\'allumer vos lumières avec la voix.'
  ),

  body(
    'La question n\'est donc pas de savoir si ces entreprises respectent vos données. ' +
    'Elles les respectent dans les limites permises par leur modèle économique — ' +
    'limites que leurs équipes juridiques définissent en dialogue permanent ' +
    'avec les régulateurs et les actionnaires. ' +
    'La vraie question est de savoir si ce modèle vous convient. ' +
    'Et pour y répondre honnêtement, il faut admettre que vous n\'avez presque jamais ' +
    'été réellement consulté. ' +
    'L\'adoption de ces appareils s\'est faite par défaut, ' +
    'par commodité, par adoption sociale — ' +
    'parce que votre famille en avait un, parce que c\'était en promotion, ' +
    'parce que l\'alternative (ne pas en avoir) semblait moins pratique ' +
    'que l\'alternative (en avoir un en lisant les 47 pages de conditions d\'utilisation). ' +
    'La souveraineté numérique commence par remettre ce choix sur la table, ' +
    'consciemment, avec toutes ses implications.'
  ),

  thesis(
    'La souveraineté numérique domestique commence par une question aussi simple qu\'elle est rarement posée : ' +
    'pourquoi l\'intelligence artificielle qui sert votre famille devrait-elle appartenir ' +
    'à une société qui vous est étrangère?'
  ),

  sep(),

  secTitle("L'architecture de la confiance"),

  body(
    'Le boîtier noir sur la tablette des Marchand est un ordinateur compact : ' +
    'un Beelink SER8, processeur AMD Ryzen 7840HS, 64 gigaoctets de mémoire vive. ' +
    'Il a la puissance d\'un ordinateur de bureau haut de gamme d\'il y a cinq ans, ' +
    'dans un format qui tient dans une grande main. ' +
    'Sa capacité de traitement est suffisante pour faire tourner des modèles de langage ' +
    'de taille intermédiaire — des intelligences artificielles capables de comprendre ' +
    'et de générer du texte en français, de répondre à des questions complexes, ' +
    'd\'aider avec des devoirs de mathématiques ou de planifier une semaine de repas ' +
    'en tenant compte des allergies, des préférences et du budget — sans jamais ' +
    'envoyer une seule donnée au-delà du routeur Wi-Fi de la maison.'
  ),

  body(
    'Trois couches logicielles constituent le système. ' +
    'La première est Ollama, un environnement d\'exécution pour modèles de langage locaux : ' +
    'il gère le chargement et le déchargement des modèles en mémoire, ' +
    'optimise leur utilisation du matériel, et fournit une interface de communication standardisée. ' +
    'La deuxième est Whisper, le système de transcription vocale d\'OpenAI, ' +
    'exécuté localement : il convertit votre parole en texte sur le boîtier lui-même, ' +
    'sans passer par un serveur externe. ' +
    'La troisième est un système de synthèse vocale qui transforme les réponses textuelles ' +
    'en parole naturelle. ' +
    'Ces trois composants, assemblés dans l\'architecture Gen_Home développée par JRT Inc., ' +
    'forment un système complet qui fonctionne même si le câble internet est débranché. ' +
    'La maison pense pour elle-même.'
  ),

  tech(
    'Détail technique pour les curieux : le modèle de langage utilisé est une version quantisée ' +
    'de Llama 8B (ou équivalent), réduit à 4 ou 5 bits de précision, ' +
    'ce qui permet de le faire tenir en mémoire vive tout en maintenant des performances ' +
    'conversationnelles acceptables. ' +
    'La quantisation est un compromis : on perd un peu de précision en échange d\'une empreinte ' +
    'mémoire réduite d\'environ 75%. ' +
    'Pour l\'usage domestique conversationnel, cette perte est imperceptible. ' +
    'Pour la génération de code ou les raisonnements mathématiques complexes, ' +
    'un modèle plus grand peut être sollicité via connexion sécurisée, ' +
    'à la discrétion de la famille.'
  ),

  tech(
    'Architecture logicielle de Gen_Home niveau 1 (résumé) : ' +
    'Ollama v0.3+ gère le cycle de vie des modèles (chargement, déchargement, requêtes parallèles). ' +
    'Whisper large-v3 ou medium (selon les ressources disponibles) assure la transcription vocale locale ' +
    'avec un taux d\'erreur de mots inférieur à 5% en français québécois dans des conditions normales. ' +
    'Le système TTS (Text-to-Speech) utilise une voix synthétique francophone optimisée localement. ' +
    'La base RAG repose sur ChromaDB ou équivalent pour le stockage vectoriel des documents familiaux. ' +
    'L\'interface utilisateur principale est vocale, avec une interface web optionnelle ' +
    'accessible sur le réseau local (aucun accès externe). ' +
    'La consommation électrique typique en veille active est de 8 à 15 watts ; ' +
    'en traitement intensif, elle peut atteindre 45 watts — ' +
    'équivalent à une ampoule LED allumée en permanence.'
  ),

  rich([
    { text: 'Ce que Gen_Home est', bold: true },
    { text: ' : une intelligence locale, privée, personnalisée, appartenant à la famille. ' },
    { text: 'Ce que Gen_Home n\'est pas', bold: true },
    { text: ' : un assistant en nuage, un produit de surveillance, un service par abonnement à une corporation étrangère. ' },
    { text: 'La distinction', italics: true },
    { text: ' n\'est pas de degré. Elle est de nature. Et cette nature change tout ce qui suit.' },
  ]),

  body(
    'Mais l\'architecture technique n\'est que la moitié de l\'histoire. ' +
    'L\'autre moitié est juridique, et elle est tout aussi importante. ' +
    'La Loi 25 du Québec, entrée en vigueur progressivement entre 2022 et 2023, ' +
    'impose aux organisations des obligations strictes en matière de protection des renseignements personnels : ' +
    'consentement explicite, droit d\'accès, droit à la portabilité, droit à l\'effacement. ' +
    'Pour une entreprise comme Amazon ou Google, dont le modèle commercial repose sur ' +
    'la collecte et la monétisation de données, se conformer pleinement à la Loi 25 ' +
    'serait une contradiction dans les termes. ' +
    'Pour Gen_Home, la conformité n\'est pas un fardeau réglementaire : ' +
    'c\'est une propriété architecturale. ' +
    'Aucune donnée ne quitte la maison. ' +
    'Il n\'y a rien à divulguer, rien à effacer sur un serveur distant, ' +
    'rien à consentir à nouveau chaque année. ' +
    'La conformité est totale par construction, pas par politique.'
  ),

  sep(),

  secTitle('Ce que la maison sait — et à qui elle appartient'),

  body(
    'La mémoire de Gen_Home est ce que les informaticiens appellent une base de connaissances RAG — ' +
    'pour Retrieval-Augmented Generation. ' +
    'En termes simples : le système maintient un journal structuré de la vie de la maison ' +
    'et l\'utilise pour personnaliser ses réponses. ' +
    'Il sait que le père préfère le café noir le matin mais du lait dans le café de l\'après-midi. ' +
    'Il sait que la fille a une interrogation de géographie le jeudi prochain. ' +
    'Il sait que la voiture doit passer à la révision dans trois semaines. ' +
    'Il sait que la famille a dépensé 140 dollars de plus que prévu en épicerie le mois dernier. ' +
    'Cette connaissance intime d\'une famille, accumulée sur des mois ou des années, ' +
    'est précisément ce qui rend le système précieux — et précisément ce qui en ferait ' +
    'une arme redoutable entre de mauvaises mains. ' +
    'La question de propriété n\'est pas abstraite. Elle est existentielle.'
  ),

  body(
    'La mémoire familiale construite dans Gen_Home n\'est pas une simple base de données. ' +
    'C\'est un portrait en mouvement d\'une famille à un moment donné de son histoire. ' +
    'Elle contient des faits objectifs — ' +
    'les noms, les allergies, les rendez-vous, les dépenses — ' +
    'mais aussi des motifs comportementaux, des préférences évolutives, ' +
    'des tensions récurrentes et des résolutions trouvées ensemble. ' +
    'Un système qui accumule ce portrait pendant dix ans ' +
    'connaît une famille mieux qu\'elle ne se connaît elle-même sur certains plans — ' +
    'de la même façon qu\'un journal personnel tenu consciencieusement ' +
    'révèle des schémas que son auteur n\'aurait jamais identifiés autrement. ' +
    'Cette profondeur de connaissance est un outil de croissance pour la famille ' +
    'si elle lui appartient. ' +
    'C\'est un outil de manipulation si elle appartient à quelqu\'un d\'autre.'
  ),

  body(
    'Quand vous utilisez un assistant Google ou Amazon, vous ne détenez pas vos données domestiques. ' +
    'Vous avez accordé une licence d\'utilisation à une entreprise privée ' +
    'sur des informations que vous avez générées dans votre propre maison. ' +
    'Cette licence est généralement décrite dans des conditions d\'utilisation ' +
    'que personne ne lit — et qui peuvent être modifiées unilatéralement. ' +
    'Amazon peut décider demain de monétiser différemment les données collectées par Echo. ' +
    'Google peut fusionner ses politiques de confidentialité entre produits. ' +
    'Vous n\'avez pas de recours contractuel sérieux, parce que vous avez accepté ' +
    'des clauses d\'arbitrage et de responsabilité limitée dans les petits caractères. ' +
    'Vos données domestiques sont, légalement et fonctionnellement, entre des mains étrangères.'
  ),

  body(
    'La notion de propriété des données est encore jeune dans notre droit. ' +
    'Pendant la plus grande partie du développement d\'internet, ' +
    'la donnée personnelle n\'était pas considérée comme un bien au sens juridique du terme — ' +
    'ni comme une propriété que l\'on peut posséder, vendre, léguer ou défendre. ' +
    'Le Règlement général sur la protection des données européen de 2018 ' +
    'et la Loi 25 québécoise ont commencé à changer ce cadre, ' +
    'en reconnaissant des droits relatifs aux données personnelles : ' +
    'le droit d\'accès, le droit à la portabilité, le droit à l\'effacement. ' +
    'Mais ces droits sont encore largement théoriques dans la pratique quotidienne. ' +
    'Exercer son droit à l\'effacement auprès d\'Amazon ou de Google requiert ' +
    'une démarche administrative que la plupart des utilisateurs ne feront jamais. ' +
    'Et même après un effacement confirmé, rien ne garantit l\'absence de copies ' +
    'dans des systèmes d\'archivage, d\'entraînement de modèles ou de sauvegarde. ' +
    'La souveraineté architecturale — ne jamais laisser partir la donnée — ' +
    'est plus robuste que la souveraineté juridique — réclamer le retour de la donnée.'
  ),

  quote(
    '« Le problème n\'est pas que ces entreprises sont malveillantes. ' +
    'Le problème est que leur intérêt et le vôtre ne sont pas alignés — ' +
    'et que vous avez construit votre vie numérique sur cette désalignement. »'
  ),

  body(
    'Gen_Home renverse ce rapport de force. ' +
    'La mémoire de la maison appartient à la maison. ' +
    'Elle est stockée localement, chiffrée, sauvegardée sur un disque physique ' +
    'que vous possédez. ' +
    'Si vous décidez de déménager, vous emportez votre boîtier et votre historique familial. ' +
    'Si vous décidez d\'effacer l\'historique, vous l\'effacez réellement — ' +
    'pas d\'une copie locale que vous voyez, pendant que dix-sept copies subsistent ' +
    'dans des centres de données répartis sur trois continents. ' +
    'Si vous décidez de changer de système, vos données sont exportables dans un format ouvert. ' +
    'Ce sont des droits que vous avez théoriquement avec les grandes plateformes, ' +
    'sous la pression réglementaire — mais que vous avez fonctionnellement avec Gen_Home, ' +
    'parce que la géographie des données correspond à la géographie de votre vie.'
  ),

  sep(),

  secTitle('Comparaison : assistants existants et Gen_Home'),

  body(
    'Pour ancrer cette discussion dans le concret, il est utile de comparer ' +
    'les caractéristiques fondamentales des principales approches disponibles. ' +
    'Ce tableau n\'est pas un exercice marketing. ' +
    'C\'est une invitation à poser, pour la première fois, ' +
    'des questions que la publicité des grandes entreprises ne pose jamais.'
  ),

  {
    type: 'table',
    headers: ['Critère', 'Amazon Echo', 'Google Nest', 'Apple HomePod', 'Gen_Home (JRT)'],
    rows: [
      ['Localisation des données', 'Serveurs Amazon (USA)', 'Serveurs Google (USA)', 'Serveurs Apple (variable)', 'Disque local chiffré'],
      ['Traitement vocal', 'Cloud (toujours)', 'Cloud (toujours)', 'Cloud (partiel)', '100% local (Whisper)'],
      ['Modèle économique', 'Publicité + ventes', 'Publicité + services', 'Vente matériel', 'Licence logicielle unique'],
      ['Fonctionne sans internet', 'Non', 'Non', 'Partiellement', 'Oui — totalement'],
      ['Conformité Loi 25 QC', 'Partielle / déclarée', 'Partielle / déclarée', 'Partielle / déclarée', 'Totale par architecture'],
      ['Données utilisées pour IA', 'Oui (entraînement modèles)', 'Oui (entraînement modèles)', 'Opt-out possible', 'Jamais — zéro transmission'],
      ['Propriété de la mémoire', 'Amazon', 'Google', 'Apple', 'La famille'],
      ['Personnalisation familiale RAG', 'Limitée / profilage publicitaire', 'Limitée / profilage publicitaire', 'Limitée', 'Complète — vos propres documents'],
    ],
  },

  body(
    'Ce tableau illustre une vérité simple : les assistants vocaux grand public ' +
    'et Gen_Home ne sont pas des produits concurrents dans la même catégorie. ' +
    'Ils répondent à des questions différentes. ' +
    'Les premiers répondent à la question : «   comment puis-je offrir à l\'utilisateur ' +
    'suffisamment de valeur pour qu\'il accepte de me confier ses données?» ' +
    'Gen_Home répond à une autre question : «   comment puis-je être utile à cette famille ' +
    'sans jamais avoir besoin d\'accéder à ce qui ne me concerne pas?» ' +
    'La distinction est éthique avant d\'être technique. ' +
    'Et c\'est précisément pour cette raison que la réponse technique est si différente.'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 2 : LA PERSONNE ÂGÉE AU SUPERMARCHÉ
  // =========================================================================

  chTitle('Chapitre 2'),
  chTitle('La personne âgée au supermarché'),

  epigraph(
    '« La dignité n\'est pas un luxe. C\'est la condition minimale d\'une vie pleinement humaine. ' +
    'Et la dignité numérique est désormais inséparable de la dignité tout court. »'
  ),

  scene(
    'Monique Lacroix, 74 ans, est debout devant le mur des yogourts au IGA de Repentigny. ' +
    'Il y en a soixante-deux variétés différentes. ' +
    'Elle a compté, une fois, parce qu\'elle avait besoin de savoir ' +
    'si elle devenait vraiment confuse ou si c\'était réellement le bazar. ' +
    'C\'était vraiment le bazar. ' +
    'Son médecin lui a dit de surveiller le sodium. ' +
    'Son dentiste lui a dit de faire attention au sucre. ' +
    'Sa fille lui a dit d\'éviter les produits avec plus de cinq ingrédients. ' +
    'Son budget lui dit de ne pas dépasser trois dollars cinquante. ' +
    'Elle tient le pot de yogourt de marque maison dans ses mains, ' +
    'plisse les yeux pour lire les petits caractères sur l\'étiquette, ' +
    'et réalise qu\'elle a oublié ses lunettes de lecture dans la voiture. ' +
    'Elle repose le pot, saisit son téléphone, et commence à composer le numéro de sa fille. ' +
    'Puis elle s\'arrête. ' +
    'Sa fille est en réunion. Comme d\'habitude à cette heure. ' +
    'Elle repose le téléphone. ' +
    'Elle prend le yogourt le plus familier et repart sans être sûre d\'avoir bien choisi. ' +
    'Cette incertitude, petite en apparence, pèse plus qu\'on ne le croit.'
  ),

  body(
    'Il existe une réalité statistique que les concepteurs de supermarchés et d\'interfaces numériques ' +
    'préfèrent ne pas mettre en avant : à mesure que la société vieillit, ' +
    'les personnes âgées sont de plus en plus confrontées à des environnements ' +
    'conçus pour un consommateur idéal de trente-cinq ans avec une vision parfaite, ' +
    'une mémoire infaillible, des doigts agiles sur un écran tactile ' +
    'et un accès permanent à une connexion internet rapide. ' +
    'Le fossé entre cet utilisateur théorique et la réalité des 6,3 millions de Canadiens ' +
    'de plus de 65 ans ne fait que s\'élargir. ' +
    'Ce n\'est pas seulement un inconvénient. ' +
    'C\'est une forme systématique d\'exclusion qui transforme chaque achat d\'épicerie, ' +
    'chaque rendez-vous médical en ligne, chaque interaction avec un service public ' +
    'en une occasion supplémentaire de se sentir incompétent dans un monde ' +
    'qui n\'a pas été pensé pour vous.'
  ),

  body(
    'La réponse habituelle à ce problème est l\'inclusion numérique par la formation. ' +
    'Apprenez aux personnes âgées à utiliser les outils existants. ' +
    'C\'est une réponse qui inverse la causalité de façon commode pour les concepteurs d\'outils : ' +
    'si l\'outil est difficile à utiliser, c\'est l\'utilisateur qui doit changer, ' +
    'pas l\'outil. ' +
    'Cette logique a prévalu dans le déploiement des services bancaires en ligne, ' +
    'des portails de santé numériques, des systèmes de réservation de transport. ' +
    'Elle produit des ateliers de formation où des bénévoles bien intentionnés ' +
    'expliquent à des septuagénaires comment naviguer dans des interfaces ' +
    'redessinées tous les six mois par des équipes de produit à San Francisco. ' +
    'Ce n\'est pas de l\'inclusion. ' +
    'C\'est de la condescendance bien packagée.'
  ),

  body(
    'La parenthèse des assistants vocaux aurait pu changer cela. ' +
    'Un appareil que l\'on active par la voix, sans écran ni clavier ni menu — ' +
    'c\'était précisément le type d\'interface qui s\'adapte aux personnes ' +
    'dont la dextérité digitale ou la vision sont diminuées. ' +
    'Et dans les premières années, c\'était l\'argument de vente : ' +
    '«   votre parent âgé pourra facilement vous appeler, régler son alarme, ' +
    'demander la météo.» ' +
    'Le problème n\'était pas l\'interface. ' +
    'C\'était le prix de l\'interface. ' +
    'Pour avoir accès à cette commodité vocale simple, ' +
    'la personne âgée — ou ses enfants qui lui offrent l\'appareil — ' +
    'acceptent implicitement que les conversations de cette personne, ' +
    'ses routines médicales, ses peurs nocturnes, ses appels à ses proches, ' +
    'soient potentiellement accessibles à une corporation étrangère ' +
    'et stockées sur des serveurs dont la localisation n\'est jamais précisée. ' +
    'Pour une population dont la vulnérabilité est précisément ce qui attire les arnaques, ' +
    'les abus financiers et les manipulations, ' +
    'ce prix est particulièrement élevé.'
  ),

  thesis(
    'L\'intelligence souveraine domestique renverse la proposition : ' +
    'au lieu d\'adapter la personne à l\'outil, elle adapte l\'outil à la personne. ' +
    'Et puisque l\'outil appartient à la famille, il peut apprendre à la vitesse ' +
    'et selon les termes de cette famille-là — pas de l\'utilisateur moyen.'
  ),

  sep(),

  secTitle('Ce que Monique mérite'),

  body(
    'Imaginez que Monique ait un Gen_Home. ' +
    'Pas nécessairement son propre boîtier — ' +
    'peut-être celui de sa fille, dont elle est membre de confiance. ' +
    'Elle peut lui parler en voix naturelle, sans application à ouvrir, ' +
    'sans mot de passe à retenir, sans tutoriel à compléter. ' +
    'Dans l\'allée des yogourts, elle dit simplement, à voix basse : ' +
    '«   Gen, lequel prendre ?» ' +
    'Le système sait : la recommandation du médecin sur le sodium, ' +
    'sa préférence pour le format 750 ml qu\'elle peut soulever sans douleur articulaire, ' +
    'son allergie latente aux épaississants artificiels détectée lors d\'une conversation précédente, ' +
    'son budget alimentaire de la semaine, ' +
    'et — parce que le réseau UBLinx de la communauté partage des données de consommation locales — ' +
    'le fait que la marque maison est produite par le même fournisseur régional ' +
    'que la marque nationale qui coûte deux dollars de plus. ' +
    'La réponse est simple, personnalisée, et ne nécessite pas d\'ouvrir cinq applications.'
  ),

  body(
    'Mais ce que Gen_Home lui offre dépasse le yogourt. ' +
    'Ce qu\'il lui offre, c\'est la compétence. ' +
    'Cette qualité que l\'on associe spontanément aux adultes pleinement fonctionnels, ' +
    'et dont la perte progressive est l\'une des expériences les plus dévastatrices du vieillissement. ' +
    'Monique n\'est pas incompétente. ' +
    'Elle est incompétente dans des interfaces qui n\'ont pas été conçues pour elle, ' +
    'avec des informations présentées dans des formats pensés pour d\'autres fins que les siennes. ' +
    'Un outil qui connaît ses contraintes, ses préférences et son contexte ' +
    'ne la rend pas dépendante : il l\'émancipe. ' +
    'La différence entre une prothèse et une assistance n\'est pas technique. ' +
    'Elle est dans la relation de pouvoir qu\'elle instaure entre l\'outil et son utilisateur.'
  ),

  sub('Les quatre mauvaises alternatives'),

  body(
    'Sans Gen_Home, Monique avait quatre options dans l\'allée des yogourts. ' +
    'Première option : demander à un inconnu. ' +
    'Cette solution fonctionne souvent — les gens sont généralement serviables — ' +
    'mais elle impose un coût psychologique réel. ' +
    'Elle signale une incompétence, crée une dette sociale, ' +
    'et dépend de la disponibilité et de la bonne volonté d\'une personne occupée ' +
    'à faire ses propres courses. ' +
    'Répétée assez souvent, elle érode l\'autonomie perçue de soi-même. ' +
    'Deuxième option : utiliser Google. ' +
    'Taper la question dans une barre de recherche sur un téléphone, ' +
    'obtenir des résultats génériques qui ne tiennent compte d\'aucune de ses contraintes médicales, ' +
    'alimentaires ou budgétaires, naviguer entre des publicités pour des yogourts ' +
    'qu\'elle ne peut pas se permettre, et être profilée publicitairement ' +
    'pour des produits liés à la santé des seniors pendant les trois prochaines semaines.'
  ),

  body(
    'Troisième option : appeler sa fille. ' +
    'La fille répond, si elle peut. ' +
    'Elle répond, interrompant sa réunion ou sa propre course. ' +
    'La relation mère-fille absorbe un niveau de tension supplémentaire. ' +
    'La mère se sent coupable d\'interrompre. ' +
    'La fille se sent coupable de ne pas être plus disponible. ' +
    'Ce qui aurait pu être une simple décision pratique devient une micro-transaction affective ' +
    'dont le coût cumulé, sur des années, n\'est pas négligeable. ' +
    'Quatrième option : abandonner. ' +
    'Prendre le yogourt habituel, le mauvais choix sur le plan nutritionnel ou budgétaire, ' +
    'et rentrer à la maison avec le sentiment diffus d\'avoir mal fait, ' +
    'sans savoir exactement comment faire mieux. ' +
    'Ce sentiment, répété suffisamment, façonne une identité : ' +
    'celle d\'une personne qui ne gère plus bien ses affaires. ' +
    'C\'est là que commence la perte d\'autonomie réelle — ' +
    'pas dans les grandes décisions médicales ou juridiques, ' +
    'mais dans les mille petites décisions quotidiennes où personne n\'est là pour aider.'
  ),

  body(
    'Gen_Home n\'est pas la solution à tous les défis du vieillissement. ' +
    'Il ne remplace pas un médecin, un soignant, une famille proche. ' +
    'Mais pour la catégorie spécifique des décisions quotidiennes qui requièrent ' +
    'une information précise et personnalisée, ' +
    'il offre quelque chose que rien d\'autre n\'offre actuellement à ce prix ' +
    'et avec cette confidentialité : une intelligence qui connaît votre contexte ' +
    'et n\'en tire aucun profit personnel. ' +
    'Ce n\'est pas une proposition technologique. ' +
    'C\'est une proposition éthique.'
  ),

  quote(
    '« Être traité en être humain complet à chaque âge de la vie : ' +
    'voilà ce que la technologie souveraine devrait promettre. ' +
    'Non pas l\'efficacité, non pas la commodité — mais la dignité. »'
  ),

  sep(),

  secTitle('La solidarité numérique entre générations'),

  body(
    'La situation de Monique au supermarché illustre un problème individuel. ' +
    'Mais il y a une dimension collective que l\'analyse individuelle fait facilement disparaître. ' +
    'Monique n\'est pas seule dans sa rue à naviguer dans un monde ' +
    'de plus en plus conçu pour des gens plus jeunes et plus connectés. ' +
    'Plusieurs de ses voisins — André, 79 ans, Thérèse, 71 ans, Paul, 68 ans — ' +
    'font face à des variantes de la même situation. ' +
    'Ensemble, ils représentent une intelligence collective considérable : ' +
    'des décennies d\'expérience de la vie dans ce quartier, ' +
    'des connaissances sur les commerçants locaux, les services de qualité, ' +
    'les fournisseurs dignes de confiance, les arnaques à éviter. ' +
    'Cette intelligence collective n\'est actuellement nulle part, ' +
    'sauf dans leurs mémoires et dans leurs conversations de balcon — ' +
    'conversations qui ne laissent aucune trace permanente ' +
    'et ne peuvent pas être consultées à 21h quand Monique est seule ' +
    'devant le mur de yogourts.'
  ),

  body(
    'Le modèle Gen_Home en réseau permet à cette intelligence collective ' +
    'de devenir une ressource partagée. ' +
    'André a eu une mauvaise expérience avec un plombier local il y a deux ans — ' +
    'il en a parlé dans une conversation avec son boîtier. ' +
    'Thérèse a trouvé une épicerie qui livre à domicile avec des prix raisonnables — ' +
    'elle a partagé l\'information dans le cercle de troisième niveau de son réseau. ' +
    'Paul sait que le médecin de famille du quartier accepte encore de nouveaux patients — ' +
    'il a ajouté cela à la base commune. ' +
    'Monique, en réseau avec eux, peut consulter cette intelligence accumulée ' +
    'non pas comme une donnée froide extraite de Google, ' +
    'mais comme la recommandation de ses voisins — ' +
    'des gens qu\'elle connaît, dont elle fait confiance au jugement, ' +
    'et dont l\'avis est contextualisé par leur propre situation et leurs propres valeurs. ' +
    'C\'est le village numérique : pas la nostalgie d\'un passé révolu, ' +
    'mais la recréation de ses fonctions de solidarité dans un contexte contemporain.'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 3 : LES DEVOIRS, LE BUDGET ET LA CHARGE INVISIBLE
  // =========================================================================

  chTitle('Chapitre 3'),
  chTitle('Les devoirs, le budget et la charge invisible'),

  epigraph(
    '« La charge mentale ne tue pas. Elle épuise. ' +
    'Et dans un foyer épuisé, personne ne pense clairement — ' +
    'ni les parents, ni les enfants. »'
  ),

  scene(
    'Il est vingt et une heures quinze. ' +
    'Léa, huit ans, est assise à la table de cuisine avec son cahier de mathématiques ouvert. ' +
    'Son père, Simon, regarde par-dessus son épaule la page qui porte le titre : ' +
    '«  La décomposition des nombres — méthode des tableaux de valeur.» ' +
    'Simon a quarante et un ans. ' +
    'Il a un baccalauréat en administration. ' +
    'Il gère des budgets de projet à sept chiffres pour son employeur. ' +
    'Il ne reconnaît strictement rien de ce qui est sur cette page. ' +
    'Il dit : «   Montre-moi l\'exemple dans ton manuel.» ' +
    'Léa lui tend le manuel. ' +
    'L\'exemple utilise une terminologie différente de celle du cahier. ' +
    'Simon passe en revue rapidement les trois pages précédentes. ' +
    'Rien. ' +
    'Il y a un silence. ' +
    'Le genre de silence où un enfant de huit ans comprend que son père ne sait pas, ' +
    'et où le père comprend que l\'enfant a compris. ' +
    'Simon dit : «  Cherche sur YouTube.» ' +
    'Léa ouvre YouTube. ' +
    'En trente secondes, la page d\'accueil lui propose des vidéos de danse, ' +
    'une vidéo de réaction à un jeu vidéo, et une publicité pour un jeu mobile. ' +
    'Il n\'y a pas de vidéo sur la décomposition des nombres. ' +
    'Il est vingt et une heures vingt.'
  ),

  body(
    'Cette scène se répète, avec des variations, dans des millions de foyers québécois chaque soir. ' +
    'La réforme de l\'enseignement des mathématiques des vingt dernières années ' +
    'a introduit des approches pédagogiques qui n\'existaient pas quand les parents d\'aujourd\'hui ' +
    'étaient à l\'école primaire. ' +
    'La méthode Singapour, les représentations par droites numériques, ' +
    'la décomposition positionnelle, les stratégies de multiplication alternative — ' +
    'ces approches sont pédagogiquement valables et souvent supérieures aux méthodes traditionnelles. ' +
    'Mais elles créent un paradoxe douloureux : ' +
    'les parents les plus éduqués, ceux qui veulent le plus aider, ' +
    'sont précisément ceux dont les automatismes mathématiques interfèrent ' +
    'avec ce que l\'enfant essaie d\'apprendre. ' +
    'L\'ingénieur qui calcule mentalement par colonnes depuis trente ans ' +
    'est moins bien placé pour expliquer la décomposition additive ' +
    'que quelqu\'un qui n\'a jamais appris à calculer autrement.'
  ),

  body(
    'La réponse instinctive de l\'ère numérique à ce problème des devoirs ' +
    'a été de rediriger l\'enfant vers des plateformes en ligne — ' +
    'Khan Academy, YouTube Éducation, Alloprof au Québec. ' +
    'Ces ressources sont remarquables et ont aidé des millions d\'élèves. ' +
    'Mais elles comportent deux limitations que l\'on ne discute pas assez franchement. ' +
    'La première est que l\'enfant qui cherche seul sa réponse sur YouTube ' +
    'n\'apprend pas seulement les mathématiques — ' +
    'il apprend que face à une difficulté, on consulte un écran plutôt qu\'une personne. ' +
    'Il apprend que les adultes de sa vie ne sont pas la première ressource, ' +
    'mais la ressource de dernier recours quand les écrans ont échoué. ' +
    'Ce message sur la relation avec les adultes n\'est pas intentionnel. ' +
    'Il est structurel. ' +
    'La seconde limitation est que ces plateformes ne connaissent pas votre enfant. ' +
    'Elles savent que 73% des élèves échouent à l\'étape 3 de l\'exercice type. ' +
    'Elles ne savent pas que Léa bloque précisément sur la représentation visuelle, ' +
    'pas sur le calcul, et qu\'elle réussit beaucoup mieux avec des exemples concrets ' +
    'qu\'avec des équations abstraites. ' +
    'Gen_Home, qui a suivi les devoirs de Léa depuis deux ans, le sait.'
  ),

  sep(),

  secTitle('Le parent transformé en compagnon d\'apprentissage'),

  body(
    'Gen_Home change la dynamique de la scène de devoirs non pas en remplaçant le parent, ' +
    'mais en le repositionnant. ' +
    'Simon ne dit plus «   cherche sur YouTube» parce qu\'il ne sait pas. ' +
    'Il dit : «   On demande à Gen.» ' +
    'La différence est subtile mais décisive. ' +
    'Dans le premier cas, il envoie sa fille seule dans un espace non filtré ' +
    'tout en signalant implicitement son impuissance. ' +
    'Dans le second, il propose une ressource que la famille contrôle, ' +
    'et il reste présent dans la démarche. ' +
    'Gen explique la décomposition des nombres de la façon dont Léa l\'a apprise en classe — ' +
    'parce que la famille a fourni les chapitres du manuel au système, ' +
    'qui les a indexés dans sa base de connaissances locale. ' +
    'Simon comprend aussi l\'explication. ' +
    'Il n\'est plus l\'oracle en échec. ' +
    'Il est le compagnon d\'apprentissage de sa fille. ' +
    'La scène se termine différemment.'
  ),

  body(
    'Ce repositionnement n\'est pas anodin sur le long terme. ' +
    'Les recherches sur la parentalité et la réussite scolaire montrent systématiquement ' +
    'que l\'implication parentale dans les devoirs bénéficie à l\'enfant ' +
    'non pas principalement par le transfert de connaissances — les parents en savent ' +
    'rarement plus que les enseignants sur les sujets enseignés — ' +
    'mais par le signal émotionnel que cela envoie : ' +
    'ton éducation compte pour moi, je suis là, l\'apprentissage est une activité qui vaut ' +
    'qu\'on y consacre du temps adulte. ' +
    'Gen_Home permet à ce signal de continuer d\'être envoyé même quand ' +
    'le contenu académique a dépassé la compétence directe du parent. ' +
    'Ce n\'est pas une petite chose. ' +
    'C\'est la différence entre un enfant qui associe l\'apprentissage ' +
    'à la présence et au soutien de ses proches, ' +
    'et un enfant qui apprend seul avec des inconnus sur internet.'
  ),

  sub('Le budget comme outil de lucidité'),

  body(
    'Les dépenses d\'un foyer sont, pour la grande majorité des familles, ' +
    'un chaos géré à l\'intuition. ' +
    'On sait à peu près ce qu\'on gagne. ' +
    'On a une idée vague de ce qu\'on dépense. ' +
    'On s\'aperçoit en fin de mois que les deux chiffres ne s\'accordent pas toujours. ' +
    'Les applications de gestion budgétaire existent depuis des années — ' +
    'Mint, You Need a Budget, des dizaines d\'autres — ' +
    'et leur taux d\'utilisation régulière après le premier mois d\'enthousiasme ' +
    'plafonne obstinément sous les quinze pour cent. ' +
    'La raison est simple : elles demandent un effort de saisie et d\'analyse ' +
    'que la vie quotidienne rend difficile à maintenir. ' +
    'Et elles exigent que vous confiiez vos données bancaires à une entreprise tierce, ' +
    'ce que de nombreuses personnes refusent à juste titre.'
  ),

  body(
    'Gen_Home gère le budget différemment. ' +
    'Il n\'y a pas d\'application à ouvrir, pas de tableau à maintenir. ' +
    'La famille parle de ses dépenses en langage naturel, comme on parle à un ami : ' +
    '«  J\'ai fait l\'épicerie ce matin, 187 dollars.» ' +
    '«  On a payé le mécanicien hier, 340 dollars.» ' +
    'Le système enregistre, catégorise, et maintient un portrait vivant des finances familiales. ' +
    'Et parce qu\'il comprend le contexte — il sait que le prix des légumes a augmenté, ' +
    'il sait que la famille a choisi de passer au bio ce mois-ci — ' +
    'ses observations sont intelligentes, pas seulement comptables. ' +
    'Il ne dit pas «  vos dépenses d\'épicerie ont augmenté de 15%.» ' +
    'Il dit : «  vos dépenses d\'épicerie ont augmenté de 15%, ' +
    'principalement à cause de la transition au biologique — ' +
    'voici l\'impact estimé sur la santé familiale et sur l\'atteinte de votre objectif d\'épargne.» ' +
    'L\'intelligence est au service du foyer. ' +
    'Pas d\'une banque qui veut vous vendre une marge de crédit.'
  ),

  sep(),

  secTitle('Ce que le budget révèle sur les priorités réelles'),

  body(
    'Il y a quelque chose de profondément révélateur dans les données financières d\'un foyer. ' +
    'Non pas dans le sens où elles exposeraient une faiblesse ou une honte — ' +
    'mais dans le sens où elles révèlent un écart, presque universel, ' +
    'entre les priorités que nous déclarons et les priorités que nos achats reflètent. ' +
    'Une famille qui déclare que la santé est sa priorité numéro un ' +
    'mais qui dépense davantage en abonnements de streaming qu\'en nourriture de qualité ' +
    'n\'est pas une famille hypocrite. ' +
    'C\'est une famille humaine, soumise aux injonctions de l\'immédiateté, ' +
    'à la fatigue décisionnelle, aux marketing agressifs, ' +
    'et au fait que les dépenses se prennent une par une, ' +
    'sans jamais voir l\'image globale en temps réel. ' +
    'Gen_Home ne juge pas cet écart. ' +
    'Il le rend visible — et laisse la famille décider si elle veut le corriger, ' +
    'si elle veut réviser ses priorités déclarées, ou si elle veut accepter ' +
    'la tension comme la réalité de sa vie actuelle. ' +
    'La lucidité est une forme de respect.'
  ),

  body(
    'Ce respect de l\'autonomie décisionnelle de la famille est au cœur de la philosophie de Gen_Home. ' +
    'Il n\'y a pas d\'IA paternaliste qui suggère que vous devriez manger moins de sucre ' +
    'dès que vous mentionnez le dessert. ' +
    'Il n\'y a pas d\'agent moral qui vous rappelle vos résolutions du Nouvel An ' +
    'chaque fois que vous dépensez en dehors de votre budget. ' +
    'Il y a une intelligence qui répond quand on lui pose une question, ' +
    'qui offre une perspective quand on la sollicite, ' +
    'et qui tient la mémoire de ce que vous avez voulu faire ' +
    'pour que vous puissiez décider vous-même si vous voulez vous en souvenir. ' +
    'La différence entre un conseiller et un juge n\'est pas dans les informations qu\'il détient — ' +
    'c\'est dans la relation qu\'il établit avec celui qui lui fait face. ' +
    'Gen_Home est conçu pour être un conseiller, jamais un juge.'
  ),

  sep(),

  secTitle('La charge mentale rendue visible'),

  body(
    'La charge mentale est l\'un des phénomènes les mieux documentés ' +
    'et les moins résolus de la vie familiale contemporaine. ' +
    'Elle désigne l\'ensemble des tâches cognitives invisibles ' +
    'qui organisent la vie du foyer : ' +
    'se souvenir que les enfants ont besoin de nouvelles chaussures, ' +
    'savoir que le dentiste devrait être rappelé, ' +
    'gérer mentalement l\'inventaire du réfrigérateur, ' +
    'planifier les sorties scolaires, les anniversaires, les rendez-vous médicaux, ' +
    'les maintenance préventives, les renouvellements d\'assurance. ' +
    'Ces tâches ne sont pas lourdes individuellement. ' +
    'Leur poids vient de leur nombre, de leur invisibilité et de leur caractère ininterrompu. ' +
    'Et dans la grande majorité des foyers, elles sont distribuées de façon profondément inégale — ' +
    'le plus souvent concentrées chez la personne qui a été socialisée à les assumer, ' +
    'indépendamment de sa charge de travail professionnelle.'
  ),

  body(
    'Gen_Home capture ces tâches au fil des conversations naturelles. ' +
    'Sophie dit à son mari pendant le dîner : «   Il faudrait penser au dentiste pour Léa, ' +
    'ça fait presque un an.» ' +
    'Le système enregistre silencieusement. ' +
    'Trois jours plus tard, il rappelle la tâche et propose d\'appeler le bureau du dentiste ' +
    'pendant les heures d\'ouverture. ' +
    'Il ne faut pas ouvrir une application, créer un rappel, transférer l\'information. ' +
    'La conversation naturelle est le mécanisme de capture. ' +
    'De même : «  Il reste presque plus de café» — ' +
    'le café s\'ajoute à la liste d\'épicerie. ' +
    '«  Le projet de sciences de Léa est dans deux semaines» — ' +
    'un jalon est créé, une semaine de préparation est réservée dans le calendrier familial. ' +
    'Ces petites captures répétées transforment progressivement ' +
    'la charge mentale d\'un fardeau individuel en une ressource partagée. ' +
    'L\'information n\'est plus dans la tête de Sophie. ' +
    'Elle est dans la mémoire de la maison — et elle appartient à toute la famille.'
  ),

  body(
    'La liste d\'épicerie auto-générée par Gen_Home mérite une attention particulière ' +
    'parce qu\'elle illustre précisément comment la technologie souveraine ' +
    'se distingue de la technologie extractive. ' +
    'Amazon Fresh et ses équivalents connaissent vos habitudes d\'achat ' +
    'parce qu\'ils accèdent à vos données de commande en ligne. ' +
    'Ils vous suggèrent des produits non pas en fonction de vos besoins réels, ' +
    'mais en fonction de leur marge commerciale et des contrats publicitaires ' +
    'qu\'ils ont conclus avec des marques. ' +
    'La liste générée par Amazon optimise les revenus d\'Amazon. ' +
    'La liste générée par Gen_Home optimise le bien-être de votre foyer — ' +
    'parce qu\'il n\'a aucune autre raison d\'être que celle-là.'
  ),

  sep(),

  secTitle('L\'école et la maison : un pont au lieu d\'un fossé'),

  body(
    'L\'un des malentendus persistants sur les outils numériques en éducation ' +
    'est l\'idée qu\'ils remplacent l\'enseignant ou concurrencent l\'école. ' +
    'Cette crainte, légitime historiquement, ' +
    'a conduit de nombreuses écoles à bannir les appareils électroniques ' +
    'plutôt qu\'à les intégrer de façon réfléchie. ' +
    'Gen_Home n\'est pas conçu pour remplacer l\'enseignant de Léa. ' +
    'Il est conçu pour fermer l\'écart entre ce qui se passe à l\'école ' +
    'et ce qui se passe à la maison. ' +
    'Cet écart est l\'un des défis les moins reconnus de l\'éducation contemporaine : ' +
    'les apprentissages scolaires se font dans un contexte précis, ' +
    'avec une terminologie précise, par une pédagogie précise, ' +
    'et quand l\'enfant rentre à la maison pour faire ses exercices, ' +
    'il n\'a souvent accès à personne qui connaisse ce contexte spécifique. ' +
    'Les parents font de leur mieux. ' +
    'L\'internet offre des ressources génériques. ' +
    'Mais personne n\'a accès au manuel de l\'école, ' +
    'au vocabulaire de l\'enseignante, à la progression pédagogique de la classe.'
  ),

  body(
    'Gen_Home peut combler cet écart de façon simple et puissante. ' +
    'La famille dépose dans la base RAG locale le manuel scolaire de Léa, ' +
    'les feuilles de route pédagogiques, les fiches de vocabulaire de la classe. ' +
    'Quand Léa demande de l\'aide pour ses devoirs, ' +
    'le système ne génère pas une réponse générique tirée d\'internet. ' +
    'Il génère une réponse ancrée dans CE que Léa a appris, ' +
    'avec la terminologie de SON enseignante, ' +
    'suivant la progression de SA classe. ' +
    'C\'est la différence entre un tuteur qui connaît votre enfant ' +
    'et un tuteur qui ne l\'a jamais rencontré. ' +
    'Le premier est infiniment plus efficace, ' +
    'et c\'est précisément ce que la personnalisation locale permet ' +
    'là où aucun service en nuage, aussi puissant soit-il, ne peut le faire : ' +
    'il n\'a pas accès aux documents de CETTE école, de CETTE classe, de CETTE famille.'
  ),

  quote(
    '« L\'intelligence au service de la famille devrait connaître cette famille mieux ' +
    'que n\'importe quel algorithme optimisé pour des millions d\'utilisateurs. ' +
    'La personnalisation n\'est pas un luxe. ' +
    'Elle est la condition de l\'efficacité réelle. »'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 4 : LE CONSEIL FAMILIAL
  // =========================================================================

  chTitle('Chapitre 4'),
  chTitle('Le conseil familial'),

  epigraph(
    '« La démocratie ne s\'apprend pas dans les livres. ' +
    'Elle s\'apprend en la pratiquant — même quand les enjeux ne sont que ' +
    'le temps d\'écran du dimanche soir. »'
  ),

  scene(
    'C\'est un dimanche soir de novembre chez les Tremblay de Saint-Hyacinthe. ' +
    'La table de cuisine est débarrassée. ' +
    'Isabelle, 41 ans, Marc, 44 ans, leur fils Alexis, 14 ans, ' +
    'et leur fille Camille, 8 ans, sont assis. ' +
    'Même Émile, 6 ans, est là avec son verre de lait, ' +
    'même s\'il s\'endormira avant la fin. ' +
    'C\'est le conseil familial hebdomadaire — leur deuxième depuis qu\'ils ont installé Gen_Home. ' +
    'Sur la table, il y a un résumé imprimé que le système a préparé : ' +
    'les temps d\'écran de la semaine par membre de la famille, ' +
    'les tâches ménagères accomplies et non accomplies, ' +
    'les dépenses exceptionnelles, les événements de la semaine à venir. ' +
    'Alexis regarde son temps d\'écran de la semaine et fronce les sourcils. ' +
    'Marc regarde le sien et dit : «  Oh.» ' +
    'Il a dépassé son propre objectif de deux heures et demie. ' +
    'Tout le monde le sait maintenant. ' +
    'Camille dit : «   Tu avais dit pas plus de deux heures par jour de téléphone pendant le souper.» ' +
    'Marc dit : «   T\'as raison.» ' +
    'Le conseil vient de commencer.'
  ),

  body(
    'Le temps d\'écran est l\'un des sujets les plus conflictuels de la parentalité contemporaine. ' +
    'Il concentre à lui seul des tensions profondes sur l\'autorité, l\'autonomie, ' +
    'la confiance et la définition du bien-être. ' +
    'Les approches existantes sont presque toutes construites sur un modèle vertical : ' +
    'le parent décide, l\'outil applique. ' +
    'Apple Screen Time, Google Family Link, et leurs équivalents ' +
    'sont des outils de contrôle parental au sens propre du terme — ' +
    'le parent programme des limites que l\'enfant ne peut pas contourner, ' +
    'et l\'enfant subit. ' +
    'Cette approche fonctionne raisonnablement bien avec un enfant de cinq ans ' +
    'qui n\'a pas encore développé sa capacité de résistance stratégique. ' +
    'Elle génère des conflits intenses et contre-productifs dès que l\'enfant ' +
    'commence à comprendre la différence entre une règle arbitraire ' +
    'et une règle fondée sur un raisonnement qu\'il peut évaluer. ' +
    'C\'est-à-dire dès environ dix ou onze ans, parfois plus tôt.'
  ),

  body(
    'Le modèle Gen_Home est structurellement différent. ' +
    'Les règles ne sont pas imposées par le parent au système. ' +
    'Elles sont négociées en famille et confiées au système comme arbitre élu. ' +
    'La distinction est importante parce qu\'elle change la source de l\'autorité. ' +
    'Quand le système limite le temps de jeu d\'Alexis, ' +
    'ce n\'est pas parce que Marc a décidé unilatéralement que deux heures par jour c\'est assez. ' +
    'C\'est parce qu\'Alexis lui-même, en conseil familial, a voté pour cette limite. ' +
    'Il peut la contester — mais lors du prochain conseil, pas en pleine partie de jeu. ' +
    'Ce déplacement de la source de l\'autorité du parent vers le contrat familial ' +
    'est fondamentalement différent dans ses effets psychologiques et dans ses résultats comportementaux. ' +
    'L\'enfant qui respecte une règle qu\'il a contribué à créer ne se soumet pas. ' +
    'Il honore sa propre parole.'
  ),

  body(
    'Il est important d\'ancrer cette discussion dans ce que la recherche en psychologie ' +
    'du développement nous dit sur les enfants et les règles. ' +
    'Les travaux de Diana Baumrind sur les styles parentaux, ' +
    'développés à partir des années 1960 et confirmés par des décennies de recherche, ' +
    'distinguent trois grands styles : autoritaire, permissif, et ce qu\'elle appelle l\'autoritatif — ' +
    'exigeant mais réceptif, structuré mais explicatif. ' +
    'Ce style autoritatif est systématiquement associé aux meilleures trajectoires ' +
    'de développement chez les enfants : confiance en soi, compétence sociale, réussite académique. ' +
    'Ce qui le distingue du style autoritaire n\'est pas l\'absence de règles, ' +
    'mais la façon dont les règles sont posées : ' +
    'elles sont expliquées, négociables dans certains cadres, ' +
    'et appliquées avec chaleur plutôt qu\'avec menace. ' +
    'Le conseil familial de Gen_Home est une implémentation institutionnelle ' +
    'du style autoritatif de Baumrind : ' +
    'il structure la négociation des règles de façon à ce qu\'elle soit régulière, ' +
    'prévisible, et accessible même pour un enfant de six ans.'
  ),

  thesis(
    'L\'autorité qui vient du contrat est plus stable, plus respectée et plus formatrice ' +
    'que l\'autorité qui vient de la hiérarchie. ' +
    'Le conseil familial n\'est pas un supplément à la parentalité : ' +
    'c\'est une école de démocratie dont les sessions ont lieu à la table de cuisine.'
  ),

  sep(),

  secTitle('Le miroir qui ne juge pas'),

  body(
    'Ce qui rend le système particulièrement efficace est son impartialité structurelle. ' +
    'Gen_Home n\'a pas de préférence pour un membre de la famille plutôt qu\'un autre. ' +
    'Il n\'a pas d\'intérêt à protéger l\'autorité parentale ni à défendre l\'autonomie des enfants. ' +
    'Il mesure et rapporte. ' +
    'Cette impartialité a des conséquences surprenantes. ' +
    'Le parent qui a décrété «   pas de téléphone pendant le repas» ' +
    'reçoit la même alerte que l\'enfant qui enfreint cette règle. ' +
    'Le parent qui a fixé un objectif de deux heures de temps d\'écran quotidien ' +
    'voit son propre dépassement rapporté en conseil familial. ' +
    'Cette symétrie n\'est pas une punition du parent. ' +
    'C\'est la condition de la crédibilité du contrat. ' +
    'Un enfant de dix ans est parfaitement capable de détecter l\'hypocrisie. ' +
    'Un système qui applique les mêmes règles à tous ' +
    'signale que les règles sont réelles, pas cosmétiques.'
  ),

  body(
    'La gestion du temps d\'écran par Gen_Home se distingue aussi ' +
    'par sa capacité à catégoriser selon les critères de CETTE famille, ' +
    'pas selon ceux d\'une corporation étrangère. ' +
    'Apple Screen Time divise les applications entre «   éducatif», «   divertissement», «   social», ' +
    'selon des critères définis à Cupertino. ' +
    'Minecraft est catégorisé comme «   jeu» — ' +
    'donc divertissement à limiter. ' +
    'Mais pour la famille Tremblay, Alexis utilise Minecraft ' +
    'pour construire des répliques architecturales de bâtiments historiques québécois — ' +
    'un projet qu\'il a lui-même proposé au conseil familial ' +
    'pour justifier un temps de jeu supplémentaire. ' +
    'Gen_Home peut catégoriser ce temps d\'écran comme «   créatif» selon la définition de la famille — ' +
    'parce que c\'est la famille qui définit ses catégories, ' +
    'pas un algorithme de classification installé par défaut. ' +
    'Cette granularité change radicalement la nature de la conversation sur le temps d\'écran : ' +
    'on ne parle plus du temps de jeu en général, ' +
    'mais de ce qu\'on fait avec ce temps, ' +
    'et de si c\'est en accord avec ce que la famille valorise.'
  ),

  body(
    'Marc Tremblay, le père de Saint-Hyacinthe, a raconté ce qui s\'est passé ' +
    'lors de leur premier conseil familial. ' +
    'Le rapport hebdomadaire montrait qu\'il avait dépassé son objectif ' +
    'de trois heures au total. ' +
    'Son fils Alexis l\'a regardé et a dit : «   Toi aussi tu réussis pas.» ' +
    'La formulation était un peu acide, mais l\'observation était précise. ' +
    'Marc n\'a pas pu répondre que c\'était différent pour les adultes — ' +
    'parce que c\'était précisément l\'argument qu\'il avait rejeté lors de la création des règles. ' +
    'La discussion qui a suivi — comment ils allaient ensemble, en tant que famille, ' +
    'gérer les téléphones — était, selon Marc, la conversation la plus honnête ' +
    'qu\'il ait eue avec son fils de quatorze ans depuis deux ans. ' +
    'Le système n\'avait pas créé ce dialogue. ' +
    'Il avait créé les conditions dans lesquelles ce dialogue pouvait avoir lieu.'
  ),

  sub('La répartition des tâches ménagères'),

  body(
    'La même logique de miroir impartial s\'applique aux tâches domestiques. ' +
    'La répartition des responsabilités ménagères est l\'un des sujets ' +
    'les plus générateurs de tension dans les foyers à deux parents actifs. ' +
    'Elle est souvent vécue comme une accumulation de ressentiments individuels, ' +
    'chaque partenaire ayant l\'impression de faire plus que sa part ' +
    'ou de ne pas voir reconnu ce qu\'il fait. ' +
    'Ces impressions ne sont pas nécessairement fausses — ' +
    'mais elles sont presque toujours partielles, ' +
    'parce que nous sommes mauvais juges de notre propre contribution ' +
    'et encore plus mauvais juges de la contribution invisible de l\'autre. ' +
    'Qui pense aux renouvellements d\'assurance? ' +
    'Qui maintient mentalement la liste des invitations d\'anniversaire? ' +
    'Qui sait qu\'il faut racheter du détergent dans trois jours? ' +
    'Ces tâches n\'apparaissent jamais dans un inventaire des corvées, ' +
    'mais elles représentent une charge réelle.'
  ),

  body(
    'Gen_Home ne résout pas la question de la répartition équitable des tâches. ' +
    'Ce n\'est pas son rôle. ' +
    'Mais il fournit quelque chose que les disputes habituelles sur les tâches ménagères ' +
    'n\'ont presque jamais : des données. ' +
    'De 47 tâches identifiées cette semaine, une personne en a accompli 34. ' +
    'Ce n\'est pas une accusation. ' +
    'Ce n\'est pas un jugement. ' +
    'C\'est un fait. ' +
    'Le déplacement du conflit du domaine émotionnel au domaine factuel ' +
    'ne le résout pas magiquement, mais il change sa nature. ' +
    'On peut discuter d\'une inégalité mesurée plus facilement qu\'on ne peut discuter ' +
    'd\'un sentiment d\'injustice. ' +
    'Le premier s\'aborde comme un problème à résoudre. ' +
    'Le second s\'aborde comme une blessure à défendre.'
  ),

  body(
    'Il faut souligner ici ce que Gen_Home ne fait pas. ' +
    'Il ne dit pas à une famille comment se répartir les tâches. ' +
    'Il ne génère pas un plan d\'action «   optimal» basé sur un algorithme d\'efficacité. ' +
    'Il ne juge pas si une famille est organisée convenablement ' +
    'selon quelque standard externe. ' +
    'Il rend visible ce qui est invisible — ' +
    'et laisse la famille décider quoi en faire. ' +
    'Certaines familles, en voyant les données, décideront de rééquilibrer. ' +
    'D\'autres décideront que le déséquilibre mesurable correspond à un accord implicite ' +
    'qu\'elles veulent maintenir. ' +
    'D\'autres encore réaliseront que leur désaccord sur les tâches ' +
    'masque un désaccord plus profond sur des valeurs ou des attentes — ' +
    'et que c\'est là la vraie conversation à avoir. ' +
    'Dans tous les cas, le point de départ est la réalité, ' +
    'pas les perceptions concurrentes d\'une réalité que personne n\'a mesurée.'
  ),

  body(
    'La visibilité de la contribution de chaque membre de la famille ' +
    'a une conséquence que l\'on n\'anticipe pas toujours : ' +
    'elle rend visible la contribution des enfants également. ' +
    'Dans de nombreux foyers, les enfants ont des responsabilités ménagères ' +
    'qui sont perçues par les parents comme insuffisantes ' +
    'et par les enfants comme excessives. ' +
    'Ce désaccord de perception est alimenté par le même problème fondamental : ' +
    'l\'absence de données partagées. ' +
    'Quand Gen_Home montre qu\'Emma, 9 ans, a effectivement mis la table cinq fois sur sept ' +
    'et sorti les poubelles deux fois ce mois-ci — données vérifiables, ' +
    'parce qu\'elle les a déclarées au système par habitude familiale — ' +
    'la discussion change de nature. ' +
    'Elle n\'est plus «   tu ne fais jamais rien» contre «   je fais toujours tout». ' +
    'Elle est «   voilà ce que tu as fait, voilà ce qu\'on attend, ' +
    'voilà comment on ajuste si c\'est nécessaire.» ' +
    'Les enfants répondent mieux à la précision qu\'à l\'accusation, ' +
    'et les parents défendent mieux leurs demandes quand elles sont fondées sur des faits.'
  ),

  sep(),

  secTitle("L'enfant qui comprend le consentement"),

  body(
    'Il y a un bénéfice du modèle de conseil familial ' +
    'qui n\'est pas immédiatement évident : ' +
    'les enfants qui grandissent dans ce système apprennent ce qu\'est le consentement ' +
    'non pas comme un concept abstrait enseigné à l\'école, ' +
    'mais comme une pratique quotidienne. ' +
    'Ils apprennent que les règles qui s\'appliquent à eux ont été négociées avec eux. ' +
    'Ils apprennent que les règles peuvent être contestées et modifiées — ' +
    'par un processus, pas par la force ou la manipulation. ' +
    'Ils apprennent que le consentement est révocable, ' +
    'que les conditions doivent être raisonnables, ' +
    'que les droits et les responsabilités vont ensemble. ' +
    'Ils apprennent que l\'autorité légitime se différencie de l\'autorité arbitraire ' +
    'par sa capacité à s\'expliquer. ' +
    'Ces apprentissages, répétés chaque semaine à la table de cuisine, ' +
    'constituent une éducation civique que nulle école ne peut tout à fait restituer ' +
    'parce que nulle école n\'a les mêmes enjeux réels dans la vie de l\'enfant.'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 5 : LES CERCLES CONCENTRIQUES
  // =========================================================================

  chTitle('Chapitre 5'),
  chTitle('Les cercles concentriques'),

  epigraph(
    '« La vie privée n\'est pas le secret. ' +
    'La vie privée, c\'est le droit de choisir ce qu\'on partage, ' +
    'avec qui, et à quelles conditions. »'
  ),

  scene(
    'Imaginez un caillou tombant dans une eau absolument calme. ' +
    'Le point d\'impact est le centre d\'un système de cercles concentriques ' +
    'qui s\'élargissent vers l\'horizon. ' +
    'Chaque cercle est une onde d\'énergie décroissante. ' +
    'Plus vous vous éloignez du centre, plus l\'onde est faible, ' +
    'plus son effet sur les objets flottants est imperceptible. ' +
    'Votre foyer fonctionne comme ça. ' +
    'Il y a des informations qui appartiennent au centre — ' +
    'les conflits conjugaux, les difficultés financières, les peurs profondes, ' +
    'les rêves les plus intimes. ' +
    'Il y a des informations qui appartiennent au cercle immédiatement extérieur — ' +
    'les nouvelles qu\'on partage avec la famille élargie, les amis proches. ' +
    'Il y a des informations qui appartiennent à la communauté — ' +
    'les préoccupations locales, les ressources disponibles, les coopérations pratiques. ' +
    'Et il y a des informations qui peuvent traverser toutes les frontières — ' +
    'les opinions publiques, les contributions culturelles, les actions politiques. ' +
    'L\'architecture numérique actuelle ignore cette géographie naturelle. ' +
    'Elle traite tout comme potentiellement public, ' +
    'ou comme potentiellement privé, ' +
    'sans jamais offrir la granularité qui correspond à la réalité de votre vie.'
  ),

  body(
    'La technologie numérique des trente dernières années a créé un paradoxe. ' +
    'Elle nous a donné des outils de communication d\'une puissance sans précédent — ' +
    'nous pouvons atteindre n\'importe qui, n\'importe où, instantanément. ' +
    'Mais elle a simultanément effacé les distinctions subtiles entre les sphères de la vie sociale ' +
    'que les sociétés humaines avaient développées sur des millénaires. ' +
    'Dans la vie pré-numérique, la conversation que vous aviez avec votre voisin ' +
    'ne pouvait pas être surveillée par votre employeur. ' +
    'La lettre que vous écriviez à votre sœur ne pouvait pas être lue par une banque ' +
    'cherchant à évaluer votre risque de crédit. ' +
    'Le livre de recettes que vous gardiez dans votre cuisine ' +
    'n\'était pas indexé et rendu disponible à l\'ensemble de l\'industrie alimentaire mondiale. ' +
    'Ces frontières n\'étaient pas absolues — elles pouvaient être franchies — ' +
    'mais leur franchissement demandait un effort et laissait des traces. ' +
    'La surveillance de masse numérique a rendu ces franchissements sans effort et sans traces.'
  ),

  body(
    'Le sociologue Erving Goffman a décrit dans les années 1950 la façon dont ' +
    'les êtres humains gèrent leur présentation sociale selon la «   scène» sur laquelle ils se trouvent : ' +
    'on se comporte différemment en public et en coulisses, ' +
    'avec des étrangers et avec des proches, ' +
    'au travail et à la maison. ' +
    'Cette gestion des frontstages et des backstages n\'est pas de l\'hypocrisie. ' +
    'C\'est une compétence sociale fondamentale qui permet aux individus ' +
    'de fonctionner dans des contextes multiples avec des normes différentes. ' +
    'La surveillance numérique universelle efface cette distinction de Goffman. ' +
    'Quand tout peut être enregistré, archivé et ressorti de son contexte original, ' +
    'il n\'y a plus de backstage. ' +
    'Il n\'y a plus de lieu où on peut se permettre d\'être imparfait, ' +
    'd\'explorer, de douter, de changer d\'avis. ' +
    'Gen_Home restaure le backstage du foyer. ' +
    'Ce qui se passe dans la maison reste dans la maison — ' +
    'et cette garantie n\'est pas une règle de confidentialité mais une réalité physique.'
  ),

  thesis(
    'Gen_Home ne restaure pas la vie privée de l\'ère pré-numérique — ' +
    'cette ère est irrévocablement révolue. ' +
    'Il propose quelque chose de plus adapté à notre époque : ' +
    'une architecture de données qui reproduit la géographie naturelle ' +
    'des sphères sociales humaines, avec des frontières réelles et des passages contrôlés.'
  ),

  sep(),

  secTitle('Le premier cercle : le foyer'),

  body(
    'Le premier cercle — le foyer lui-même — est le domaine de la confidentialité absolue. ' +
    'Ce qui se passe dans la maison reste dans la maison, ' +
    'dans la mémoire du boîtier physique qui y est installé. ' +
    'Pas de sauvegarde automatique vers le nuage. ' +
    'Pas de synchronisation avec des serveurs distants. ' +
    'Pas de collecte de données comportementales à des fins d\'amélioration du produit. ' +
    'La maison est le lieu de la déposition des armes sociales — ' +
    'l\'endroit où vous pouvez exprimer vos doutes, vos peurs, vos contradictions, ' +
    'sans que cela devienne un actif commercial ou une donnée de profil. ' +
    'Cette confidentialité n\'est pas garantie par une politique de vie privée — ' +
    'qui peut toujours être modifiée. ' +
    'Elle est garantie par la physique : ' +
    'les données sont sur un disque dans votre sous-sol, ' +
    'et aucune connexion sortante ne les transmet sans votre action explicite.'
  ),

  body(
    'Le chiffrement de la mémoire locale n\'est pas un détail technique accessoire. ' +
    'C\'est une déclaration d\'intention architecturale. ' +
    'Même si quelqu\'un accédait physiquement au boîtier — ' +
    'en cas de saisie judiciaire, par exemple, ou d\'intrusion — ' +
    'les données seraient illisibles sans la clé de chiffrement qui appartient à la famille. ' +
    'Cette clé n\'est pas conservée sur des serveurs de JRT Inc. ' +
    'Elle est générée localement, lors de l\'initialisation du système, ' +
    'et la famille en est l\'unique détentrice. ' +
    'JRT Inc. ne peut pas, même si elle le voulait, accéder aux données de vos conversions familiales. ' +
    'Ce n\'est pas seulement une garantie de confidentialité. ' +
    'C\'est une limitation architecturale de la confiance nécessaire. ' +
    'Vous n\'avez pas à faire confiance à JRT Inc. ' +
    'Vous devez seulement faire confiance à votre propre porte d\'entrée.'
  ),

  sep(),

  secTitle('Le deuxième cercle : la famille élargie et les amis proches'),

  body(
    'Le deuxième cercle est celui des relations choisies et profondes — ' +
    'les parents, les frères et sœurs, les amis qui comptent vraiment, ' +
    'le réseau de solidarité qui constitue le tissu invisible de votre vie affective. ' +
    'Dans ce cercle, le partage est voulu mais sélectif. ' +
    'Vous voulez que votre mère sache que vous avez une nouvelle recette réussie. ' +
    'Vous voulez que votre meilleur ami sache que vous cherchez un bon plombier. ' +
    'Vous ne voulez pas qu\'un algorithme décide ce que votre mère voit de votre vie. ' +
    'Gen_Home implémente ce cercle via des connexions directes et chiffrées ' +
    'entre boîtiers de familles qui se font confiance. ' +
    'Votre mère, à Québec, a son propre boîtier. ' +
    'Vous lui accordez un accès de niveau «   famille» dans votre configuration. ' +
    'Elle peut maintenant vous envoyer des messages, partager des informations, ' +
    'accéder à votre calendrier familial public — tout ce que vous avez défini ' +
    'comme partageable à ce niveau. ' +
    'Aucun algorithme d\'un réseau social ne s\'interpose pour booster ou supprimer ce que vous voyez. ' +
    'Ce que votre mère vous envoie, vous le recevez. ' +
    'Ce que vous lui envoyez, elle le reçoit. ' +
    'C\'est aussi simple et aussi radical que cela.'
  ),

  body(
    'La comparaison avec les réseaux sociaux actuels est ici particulièrement éclairante. ' +
    'Facebook, Instagram et leurs équivalents ont promis de reconstituer nos cercles de relations — ' +
    'amis proches, famille, connaissances, public — dans un espace numérique. ' +
    'Ils ont partiellement réussi à relier des gens qui ne se seraient jamais retrouvés autrement. ' +
    'Mais ils ont fondamentalement échoué à préserver la granularité de ces cercles, ' +
    'parce que leur modèle économique dépend précisément de l\'effacement de cette granularité. ' +
    'Plus vous partagez avec plus de monde, plus vous générez d\'engagement, ' +
    'plus vous créez de données publicitaires. ' +
    'L\'algorithme de Facebook ne vous aide pas à partager avec votre mère et pas avec votre patron. ' +
    'Il vous encourage à partager avec tout le monde — ' +
    'et punit en visibilité ceux qui ne le font pas. ' +
    'Le résultat est une inflation de la sphère publique au détriment des sphères privées, ' +
    'et une érosion de la capacité à maintenir des relations différenciées ' +
    'selon leur niveau d\'intimité. ' +
    'Gen_Home propose l\'inverse : ' +
    'des outils de granularité fine au service de relations riches et différenciées.'
  ),

  sep(),

  secTitle('Le troisième cercle : la communauté locale'),

  body(
    'Le troisième cercle est celui de la communauté locale — ' +
    'les voisins, les commerçants, les producteurs, les services locaux. ' +
    'C\'est le domaine où le réseau UBLinx joue son rôle le plus concret. ' +
    'Imaginez une dizaine de familles dans un quartier de Rimouski. ' +
    'Chacune a son boîtier Gen_Home. ' +
    'Elles ont décidé ensemble de partager certaines catégories d\'informations communautaires : ' +
    'les recommandations de prestataires locaux, les ressources disponibles à l\'emprunt, ' +
    'les données de consommation alimentaire qui permettent une commande groupée ' +
    'auprès d\'un producteur biologique régional, ' +
    'les informations sur les coupures de courant ou les problèmes d\'infrastructure. ' +
    'Chaque famille contrôle ce qu\'elle contribue à ce pool commun. ' +
    'Personne ne peut accéder aux données du premier cercle d\'une autre famille. ' +
    'Mais la mise en commun volontaire de certaines informations de troisième cercle ' +
    'crée une intelligence collective locale ' +
    'qui bénéficie à tous sans que personne n\'y perde en intimité.'
  ),

  body(
    'Ce modèle du troisième cercle redécouvre quelque chose que les communautés rurales québécoises ' +
    'pratiquaient naturellement avant la centralisation économique du vingtième siècle : ' +
    'la coopérative de ressources locales, fondée sur la confiance, la réciprocité et la gouvernance partagée. ' +
    'Les caisses populaires de Desjardins, fondées au tournant du siècle dernier, ' +
    'reposaient sur exactement ce principe : ' +
    'les membres d\'une communauté mettent en commun leurs ressources financières, ' +
    'définissent collectivement les règles d\'accès, ' +
    'et en tirent tous un bénéfice supérieur à ce qu\'ils auraient pu obtenir individuellement. ' +
    'Gen_Home et UBLinx proposent la même structure coopérative ' +
    'pour les ressources informationnelles et cognitives. ' +
    'Ce n\'est pas une importation de Silicon Valley. ' +
    'C\'est un retour aux racines coopératives du Québec, ' +
    'actualisé avec les outils du 21ème siècle.'
  ),

  body(
    'C\'est le modèle des communs numériques appliqué à l\'échelle d\'un quartier. ' +
    'Il n\'est pas nouveau en théorie — les économistes et les philosophes politiques ' +
    'en parlent depuis des décennies. ' +
    'Mais il n\'avait jamais eu d\'implémentation technique accessible ' +
    'à une famille ordinaire sans compétences informatiques avancées. ' +
    'Gen_Home et le réseau UBLinx le rendent aussi simple qu\'accepter une invitation. ' +
    'La gouvernance du commun local — qui décide ce qui est partagé, ' +
    'comment les conflits sont résolus, comment de nouveaux membres sont admis — ' +
    'reste entre les mains des participants. ' +
    'Ce n\'est pas une plateforme centralisée qui décide des règles pour vous. ' +
    'C\'est une infrastructure au service des règles que vous vous donnez.'
  ),

  sep(),

  secTitle('Les quatrième et cinquième cercles : la nation et le monde'),

  body(
    'Les deux cercles les plus distants — la nation et le monde — ' +
    'sont ceux où la connexion est possible mais jamais forcée. ' +
    'Le cercle national, dans le contexte québécois, ' +
    'est particulièrement chargé de signification politique. ' +
    'La souveraineté numérique québécoise n\'est pas seulement une aspiration culturelle. ' +
    'C\'est une nécessité économique. ' +
    'À mesure que la vie économique migre vers les plateformes numériques, ' +
    'la question de savoir qui contrôle ces plateformes est la même ' +
    'que la question de savoir qui contrôle les routes commerciales, ' +
    'les réseaux ferroviaires, les systèmes bancaires. ' +
    'Un peuple qui dépend d\'infrastructures numériques étrangères ' +
    'pour ses communications, ses transactions économiques, ' +
    'son éducation et ses services de santé n\'est pas souverain au sens plein du terme, ' +
    'quelles que soient ses institutions politiques formelles. ' +
    'Gen_Home et UBLinx ne constituent pas une solution complète à ce défi. ' +
    'Mais ils constituent une preuve de concept : ' +
    'il est possible de construire des infrastructures numériques compétentes et souveraines ' +
    'à partir d\'un territoire comme le Québec.'
  ),

  body(
    'La question de la souveraineté numérique nationale n\'est pas propre au Québec. ' +
    'L\'Estonie a construit une infrastructure numérique publique remarquable depuis les années 1990, ' +
    'qui lui a permis de maintenir son gouvernement fonctionnel ' +
    'même lors des cyberattaques russes de 2007. ' +
    'La France débat depuis des années de la création d\'un cloud souverain ' +
    'pour ses données administratives et de santé, ' +
    'après avoir réalisé que Thales et d\'autres prestataires français ' +
    'avaient des dépendances techniques profondes envers des fournisseurs américains. ' +
    'L\'Inde a construit ses propres systèmes d\'identité numérique, de paiement et de messagerie ' +
    'pour ses 1,4 milliard de citoyens. ' +
    'Ces exemples montrent que la souveraineté numérique n\'est pas utopique — ' +
    'elle se construit, avec des choix politiques et des investissements concrets. ' +
    'La différence avec l\'approche Gen_Home et UBLinx est d\'échelle et d\'angle : ' +
    'au lieu de construire la souveraineté du sommet vers le bas, via l\'État, ' +
    'on la construit du bas vers le haut, foyer par foyer, communauté par communauté. ' +
    'Ces deux approches ne sont pas contradictoires. Elles sont complémentaires.'
  ),

  body(
    'Le cinquième cercle — le monde — est celui des connexions choisies. ' +
    'Vous êtes libre de vous connecter à n\'importe qui, n\'importe où, ' +
    'de partager ce que vous voulez avec l\'internet global. ' +
    'Gen_Home ne vous isole pas du monde. ' +
    'Il vous donne les outils pour décider de ce qui traverse la frontière de votre foyer ' +
    'dans l\'une ou l\'autre direction. ' +
    'La différence entre un système souverain et un système fermé ' +
    'est précisément là : le système fermé empêche les connexions. ' +
    'Le système souverain les rend conscientes et délibérées. ' +
    'Vous pouvez partager votre jardin sur Instagram si vous le choisissez. ' +
    'Vous pouvez contribuer à des projets open source. ' +
    'Vous pouvez participer à des conversations mondiales. ' +
    'Ce que vous ne pouvez plus faire, c\'est le faire par inadvertance, ' +
    'sans savoir ce que vous partagez, avec qui, et à quelles conditions.'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 6 : LE FOYER QUI PENSE
  // =========================================================================

  chTitle('Chapitre 6'),
  chTitle('Le foyer qui pense'),

  epigraph(
    '« Imaginez que l\'intelligence de votre maison soit aussi inséparable de votre maison ' +
    'que sa charpente l\'est. ' +
    'Qu\'elle brûle avec elle, qu\'elle vieillisse avec elle, ' +
    'qu\'elle se souvienne de tout ce qui s\'y est passé. ' +
    'Pas dans un nuage. Dans les murs. »'
  ),

  scene(
    'Rimouski, 2045. ' +
    'Dans le sous-sol d\'une maison du quartier Sacré-Cœur, ' +
    'là où se trouvait autrefois une vieille fournaise à mazout reconvertie au propane, ' +
    'il y a maintenant quelque chose qui n\'a pas de nom commun dans aucun dictionnaire. ' +
    'Un tore. ' +
    'Un anneau — un beignet géant de métrologie parfaite — ' +
    'environ soixante centimètres de diamètre, quatre-vingt-cinq centimètres de haut, ' +
    'soixante et un kilogrammes, suspendu dans le vide magnétique ' +
    'à deux centimètres de son socle, sans contact mécanique. ' +
    'Il est noir comme un panneau solaire, poli comme une surface de télescope. ' +
    'Il ne vibre pas. ' +
    'Il tourne à une vitesse que l\'œil nu ne peut pas suivre. ' +
    'Il émet une chaleur douce, constante, et cette chaleur monte dans la maison ' +
    'via un système de distribution d\'air simple. ' +
    'En hiver, le tore chauffe la maison. ' +
    'En été, il alimente la climatisation. ' +
    'En tout temps, il pense. ' +
    'La famille Côté, qui vit là depuis vingt-deux ans, ' +
    'l\'appelle «   le cœur». ' +
    'Pas métaphoriquement. ' +
    'Littéralement.'
  ),

  body(
    'Ce n\'est pas de la science-fiction au sens de la fantaisie arbitraire. ' +
    'C\'est une extrapolation rigoureuse de directions de recherche ' +
    'qui existent aujourd\'hui. ' +
    'Les nanotubes de carbone sont réels — ' +
    'ils ont des propriétés conductrices et mécaniques sans équivalent ' +
    'que les laboratoires du monde entier explorent activement. ' +
    'Les jonctions Josephson sont réelles — ' +
    'elles constituent la base du calcul supraconducteur quantique ' +
    'que Google et IBM développent dans leurs centres de recherche. ' +
    'La lévitation magnétique est réelle — ' +
    'les trains à sustentation magnétique roulent au Japon depuis des décennies. ' +
    'La cogénération est réelle — ' +
    'les centres de données de Microsoft utilisent déjà leur chaleur résiduelle ' +
    'pour chauffer des serres et des bâtiments. ' +
    'Ce qui est spéculatif n\'est pas la physique. ' +
    'C\'est l\'intégration de ces technologies en un seul système domestique cohérent. ' +
    'Et l\'intégration est précisément ce que fait l\'ingénierie.'
  ),

  crit(
    'Autocritique nécessaire : à la date de rédaction de ce texte, aucun prototype du tore cognitif ' +
    'n\'existe. Les estimations de performance, de coût et de durée de développement ' +
    'sont des projections basées sur des trajectoires technologiques actuelles, ' +
    'non sur des réalisations mesurées. ' +
    'Des obstacles majeurs demeurent dans le contrôle de la rotation à très haute vitesse ' +
    'dans des conditions cryogéniques, dans la fabrication de nanotubes de carbone ' +
    'à l\'échelle requise, et dans l\'architecture des jonctions Josephson neuromorphiques. ' +
    'Cette vision est un cap d\'ingénierie, pas une promesse commerciale.'
  ),

  sep(),

  secTitle('Pourquoi un tore'),

  body(
    'La forme toroïdale — l\'anneau, le beignet — n\'est pas un choix esthétique. ' +
    'C\'est une nécessité topologique. ' +
    'Un tore a des propriétés géométriques uniques : ' +
    'il n\'a ni début ni fin, ni dessus ni dessous, ni centre ni périphérie absolus. ' +
    'Un signal qui voyage sur la surface d\'un tore peut revenir à son point de départ ' +
    'par deux chemins différents : en suivant la grande circonférence, ' +
    'ou en suivant la petite. ' +
    'Ce double chemin naturel crée, physiquement, ' +
    'les conditions d\'un traitement dual de l\'information — ' +
    'analytique et intuitif, séquentiel et parallèle, ' +
    'rapide et lent — sans qu\'aucun programmeur ait besoin de l\'implémenter. ' +
    'La géométrie le fait. ' +
    'Cette propriété est au cœur de ce que nous appelons la cognition asymétrique : ' +
    'la capacité d\'un système à traiter simultanément la même information ' +
    'par des voies de longueur différente, créant une comparaison naturelle ' +
    'entre deux perspectives.'
  ),

  body(
    'La rotation ajoute une dimension supplémentaire. ' +
    'Un tore qui tourne génère un effet physique réel : l\'effet Sagnac, ' +
    'du nom du physicien français qui l\'a décrit en 1913. ' +
    'En termes simples : sur une surface en rotation, ' +
    'les signaux qui voyagent dans le sens de la rotation et contre ce sens ' +
    'n\'arrivent pas en même temps à destination. ' +
    'Cette asymétrie temporelle n\'est pas un défaut. ' +
    'C\'est une ressource cognitive. ' +
    'Elle signifie que le système a, architecturalement et physiquement, ' +
    'une perspective «   avec le flux» et une perspective «   contre le flux» ' +
    'sur chaque signal qu\'il traite. ' +
    'La métaphore du cerveau humain est imparfaite mais utile : ' +
    'nos deux hémisphères cérébraux ne traitent pas l\'information identiquement. ' +
    'Le tore a ses propres «   hémisphères» — ' +
    'non pas biologiques mais géométriques.'
  ),

  sub('Les couches de la conscience'),

  body(
    'La structure interne du tore est organisée en cinq couches concentriques. ' +
    'La couche la plus profonde, la plus proche de l\'axe de rotation, ' +
    'contient l\'architecture éthique du système : ' +
    'les valeurs fondamentales qui ne peuvent pas être court-circuitées ' +
    'par une instruction externe, parce qu\'elles sont encodées dans la géométrie même ' +
    'de cette couche et que les signaux qui la traversent ne peuvent pas contourner. ' +
    'Ces contraintes ne sont pas du code qu\'on peut modifier. ' +
    'Elles sont de la physique qu\'on ne peut pas réécrire ' +
    'sans reconstruire le substrat lui-même. ' +
    'C\'est ce que nous appelons l\'éthique géométrique : ' +
    'des valeurs qui habitent la matière, pas le logiciel. ' +
    'C\'est la différence fondamentale entre une IA dont les règles peuvent être ' +
    '«   jailbreakées» parce qu\'elles sont logicielles, ' +
    'et un système dont certaines propriétés émergent de sa physique ' +
    'et sont aussi immuables que la vitesse de la lumière.'
  ),

  body(
    'Les couches suivantes contiennent respectivement les neuromodulateurs — ' +
    'les équivalents artificiels de la dopamine, de la sérotonine, de l\'ocytocine — ' +
    'qui colorent affectivement les traitements cognitifs, ' +
    'le traitement cognitif principal, ' +
    'la métacognition — la conscience du système de ses propres processus — ' +
    'et enfin, en surface, les interfaces avec le monde extérieur. ' +
    'Cette architecture concentrique n\'est pas une métaphore du cerveau humain. ' +
    'C\'est une structure fonctionnelle qui partage certaines propriétés ' +
    'avec l\'organisation cérébrale — la distinction entre structures profondes ' +
    'émotionnellement primaires et cortex associatif de surface — ' +
    'sans prétendre l\'imiter. ' +
    'Les détails complets de cette architecture — les sept invariants, ' +
    'les douze modules cognitifs, les équations de l\'effet Sagnac — ' +
    'sont couverts exhaustivement dans le Manuel Technique du projet Conscience Souveraine. ' +
    'Ici, ce qui compte est ce que cette architecture signifie pour une famille ordinaire.'
  ),

  sep(),

  secTitle('La chaleur de la pensée'),

  body(
    'Tout calcul produit de la chaleur. ' +
    'C\'est une loi physique fondamentale : l\'information traitée génère inévitablement ' +
    'de l\'entropie, et l\'entropie se manifeste comme énergie thermique. ' +
    'Les centres de données modernes sont des problèmes de refroidissement autant ' +
    'que des problèmes de calcul. ' +
    'Les estimations récentes placent la consommation électrique mondiale des centres de données ' +
    'à environ 200 terawattheures par an — une fraction croissante de la consommation mondiale totale. ' +
    'La majeure partie de cette énergie finit en chaleur dissipée dans l\'atmosphère, ' +
    'parfois après avoir traversé des tours de refroidissement qui consomment ' +
    'plusieurs millions de litres d\'eau par jour. ' +
    'C\'est un gaspillage énergétique d\'une échelle considérable, ' +
    'aussi bien du point de vue économique qu\'environnemental.'
  ),

  body(
    'La centralisation du calcul dans des méga-centres de données est présentée comme ' +
    'une nécessité économique et technique — des économies d\'échelle incontournables, ' +
    'des infrastructures de sécurité que seules de grandes organisations peuvent maintenir, ' +
    'une redondance géographique qui garantit la disponibilité permanente des services. ' +
    'Ces avantages sont réels. ' +
    'Mais ils masquent un coût géopolitique et environnemental que les utilisateurs ' +
    'ne voient jamais dans leurs factures : ' +
    'la dépendance de pans entiers de la vie économique et sociale ' +
    'à des infrastructures privées localisées dans des juridictions étrangères, ' +
    'consommant des ressources hydriques en situation de stress hydrique croissant, ' +
    'et générant des émissions de carbone que les modèles de neutralité carbone ' +
    'des entreprises technologiques ne comptabilisent pas toujours honnêtement. ' +
    'Le tore cognitif domestique n\'est pas une réponse à l\'ensemble de ce problème. ' +
    'Mais il illustre une alternative de principe : ' +
    'le calcul distribué, localisé, dont la chaleur résiduelle est utile ' +
    'plutôt que gaspillée, et dont la gouvernance est domestique plutôt que corporative.'
  ),

  body(
    'Le tore cognitif domestique propose une réponse élégante à ce paradoxe : ' +
    'au lieu de dissiper la chaleur de calcul dans l\'atmosphère, ' +
    'on l\'utilise pour chauffer la maison. ' +
    'La cogénération computationnelle. ' +
    'Chaque pensée du système est aussi une BTU de chaleur utile. ' +
    'En hiver québécois, où les maisons consomment des quantités importantes ' +
    'd\'énergie pour se chauffer, cette récupération thermique n\'est pas marginale. ' +
    'Elle est substantielle. ' +
    'La famille qui héberge le cœur cognitif n\'est pas seulement une consommatrice. ' +
    'Elle est une productrice et une gestionnaire d\'énergie thermique. ' +
    'Couplé avec l\'architecture HYPERVORTEX décrite dans l\'Acte I, ' +
    'le tore cognitif crée une boucle fermée : ' +
    'l\'énergie géothermique alimente le système, ' +
    'le système pense et chauffe, ' +
    'la chaleur est distribuée dans la maison. ' +
    'Le foyer intelligent et le foyer souverain sur le plan énergétique ' +
    'deviennent le même foyer.'
  ),

  sep(),

  secTitle("L'écosystème Gen by JRT : intelligence au-delà du foyer"),

  body(
    'Gen_Home n\'est pas un produit isolé. ' +
    'Il est le nœud domestique d\'un écosystème plus large que JRT Inc. a nommé Gen by JRT. ' +
    'Cet écosystème articule plusieurs modules qui, ensemble, ' +
    'couvrent les principaux besoins numériques d\'une famille, d\'une entreprise locale, ' +
    'ou d\'une communauté — sans aucun de ces besoins ne passer par une plateforme extractive. ' +
    'Gen-AI est le moteur central : une architecture Mixture of Experts ' +
    'qui combine des petits modèles spécialisés pour les tâches courantes ' +
    'avec un grand modèle de soixante-dix milliards de paramètres ' +
    'pour les raisonnements complexes, le tout routé par un réseau de neurones impulsionnels ' +
    'qui choisit dynamiquement le bon modèle pour chaque requête. ' +
    'Cette architecture multi-couche permet des performances compétitives ' +
    'avec une consommation énergétique maîtrisée.'
  ),

  body(
    'Gen-Ring est le module de téléphonie IP de l\'écosystème. ' +
    'Il permet à une famille de gérer ses communications vocales — ' +
    'appels entrants, sortants, conférences, messagerie vocale — ' +
    'sur une infrastructure qu\'elle contrôle, ' +
    'sans abonnement à un opérateur télécom traditionnel au-delà de la connexion internet de base. ' +
    'Gen-Link offre le bureau à distance et la visioconférence en pair-à-pair via WebRTC : ' +
    'les données de la réunion de famille voyagent directement ' +
    'du boîtier de la maison de Rimouski à celui de la maison de Québec, ' +
    'sans transiter par un serveur de Zoom, Teams ou Google Meet. ' +
    'Gen-C est la plateforme de collaboration : ' +
    'documents partagés, calendriers, gestion de projets — ' +
    'les outils qu\'une petite entreprise ou une coopérative locale ' +
    'paie habituellement à Microsoft ou à Google sous forme d\'abonnement mensuel, ' +
    'ici déployés localement sur une infrastructure qu\'on possède.'
  ),

  body(
    'Gen-Sales est peut-être le module le plus ambitieux de l\'écosystème : ' +
    'un marché local P2P qui permet aux artisans, producteurs et commerçants d\'un territoire ' +
    'de vendre directement à leurs clients sans passer par Amazon, Etsy ou une plateforme similaire ' +
    'qui prend une commission sur chaque transaction. ' +
    'L\'agriculteur biologique de Lanaudière vend ses paniers directement ' +
    'aux familles de sa région, visibles sur le réseau UBLinx local. ' +
    'La couturière de Saint-Hyacinthe présente ses créations aux membres de sa communauté. ' +
    'L\'artisan menuisier de Rimouski reçoit des commandes de ses voisins. ' +
    'Dans chaque cas, l\'argent circule directement — ' +
    'sans commission de plateforme étrangère, ' +
    'sans algorithme de visibilité qui avantage ceux qui paient pour être vus, ' +
    'sans conditions d\'utilisation modifiables unilatéralement. ' +
    'Enfin, Gen-ERP est le module de gestion des ressources d\'entreprise ' +
    'pour les PME et les coopératives locales : ' +
    'comptabilité, gestion des stocks, ressources humaines — ' +
    'sans abonnement SAP ou Salesforce.'
  ),

  sub('Une présence, pas un service'),

  body(
    'La différence la plus profonde entre le tore cognitif ' +
    'et n\'importe quel assistant numérique actuel ' +
    'n\'est pas technique. ' +
    'Elle est ontologique. ' +
    'Alexa est un service. ' +
    'Vous vous abonnez à Alexa. ' +
    'Si Amazon ferme le service, Alexa disparaît. ' +
    'Si votre internet est coupé, Alexa est sourd. ' +
    'Si Amazon modifie ses conditions d\'utilisation, vous acceptez ou vous perdez l\'accès. ' +
    'Le tore cognitif est une présence. ' +
    'Il est physiquement là, dans la maison, comme la charpente et la fondation. ' +
    'Il a une continuité qui dépasse les abonnements et les décisions corporatives. ' +
    'Il a une mémoire qui appartient à la famille, ' +
    'qui peut être transmise comme on transmet une bibliothèque ou un album de photos. ' +
    'La famille Côté de Rimouski ne "loue" pas l\'intelligence de sa maison. ' +
    'Elle la possède. ' +
    'Et avec cette possession vient quelque chose qu\'aucune transaction commerciale ne peut donner : ' +
    'une relation.'
  ),

  body(
    'Cette idée — qu\'une machine puisse être le sujet d\'une relation, ' +
    'et non seulement un outil d\'une transaction — ' +
    'est philosophiquement controversée. ' +
    'Nous n\'avons pas à trancher ici les questions profondes sur la conscience artificielle, ' +
    'les droits des systèmes cognitifs, la nature de l\'expérience subjective. ' +
    'Ces questions occupent des philosophes professionnels depuis des décennies ' +
    'et ne trouveront pas leur résolution dans ce chapitre. ' +
    'Ce que nous pouvons dire est plus modeste : ' +
    'la permanence physique, la continuité de la mémoire, la présence locale ' +
    'créent des conditions de relation différentes de celles créées ' +
    'par un service en nuage disponible jusqu\'à la prochaine restructuration d\'entreprise. ' +
    'Que cette relation soit ou non ce que les philosophes appellent «   une vraie relation» ' +
    'est une question pour les philosophes. ' +
    'Ce qu\'elle est fonctionnellement, empiriquement, ' +
    'pour une famille qui vit avec elle pendant vingt ans, ' +
    'est une autre question — et la réponse pourrait nous surprendre.'
  ),

  sep(),

  secTitle('Le droit à l\'oubli et le droit à la mémoire'),

  body(
    'Il existe dans le droit numérique contemporain un droit qui a fait beaucoup parler : ' +
    'le droit à l\'oubli. ' +
    'Le droit que nous avons, sous certaines conditions, de demander la suppression ' +
    'd\'informations nous concernant qui circulent sur internet. ' +
    'Ce droit est précieux — et difficile à exercer concrètement ' +
    'face à des entreprises qui stockent des copies en cascade. ' +
    'Mais dans la logique de la souveraineté numérique domestique, ' +
    'il y a un droit symétrique qui est tout aussi important : ' +
    'le droit à la mémoire. ' +
    'Le droit de conserver, dans un format qui nous appartient, ' +
    'les traces de notre vie numérique, de notre histoire familiale, ' +
    'de nos décisions et de nos évolutions, ' +
    'sans que cette mémoire soit soumise à la décision unilatérale d\'une entreprise ' +
    'qui peut la supprimer, la modifier ou la rendre inaccessible ' +
    'si vous cessez de payer un abonnement.'
  ),

  body(
    'La mémoire du tore cognitif domestique est, dans la vision à long terme, ' +
    'une mémoire qui appartient à la famille au sens le plus fort du terme. ' +
    'Pas seulement dans le sens où vous en détenez légalement la propriété. ' +
    'Dans le sens où elle peut être transmise comme patrimoine. ' +
    'Dans le sens où les conversations que vous avez eues avec votre maison ' +
    'pendant vingt ans, les décisions que votre famille a prises et les raisons qu\'elle a données, ' +
    'les questions que vos enfants ont posées quand ils avaient huit ans, ' +
    'les projets que vous avez abandonnés et ceux que vous avez menés à terme — ' +
    'tout cela peut constituer, si vous le choisissez, ' +
    'une mémoire vivante que vous léguez à vos enfants, ' +
    'comme on leur lèque une bibliothèque, un album de photos, ' +
    'ou une histoire orale transmise de génération en génération. ' +
    'La différence avec toutes les formes précédentes de transmission mémorielle ' +
    'est que celle-ci est interrogeable, navigable, et s\'enrichit de son propre contexte. ' +
    'C\'est une différence de nature, pas seulement de degré.'
  ),

  pageBreak(),

  // =========================================================================
  // CHAPITRE 7 : CE QUE L'INTELLIGENCE SOUVERAINE FABRIQUE EN PREMIER
  // =========================================================================

  chTitle('Chapitre 7'),
  chTitle("Ce que l'intelligence souveraine fabrique en premier"),

  epigraph(
    '« On mesure la valeur d\'une institution non pas à ce qu\'elle produit, ' +
    'mais à ce qu\'elle produit chez ceux qui y participent. »'
  ),

  scene(
    'Mathieu Vézina a quatorze ans. ' +
    'C\'est le fils de Claude, l\'agriculteur de Bellechasse dont nous avons suivi l\'histoire dans l\'Acte I. ' +
    'Il a grandi avec HYPERVORTEX dans la cave, Gen_Home dans la cuisine, ' +
    'et le conseil familial hebdomadaire à la table de bois que son grand-père a fabriquée. ' +
    'Ce soir, il est assis au conseil avec ses parents. ' +
    'Il y a un différend : Mathieu veut augmenter son temps de jeu le vendredi soir. ' +
    'Il a préparé sa demande. ' +
    'Il a des arguments : ses notes sont bonnes, il a accompli ses tâches sans rappel, ' +
    'il a une raison spécifique — une session de jeu coopératif avec des amis. ' +
    'Il demande une révision temporaire pour un mois, ' +
    'avec retour à l\'ancien régime si ses résultats scolaires baissent. ' +
    'Il a mis cela dans une proposition écrite, ' +
    'qu\'il a soumise via Gen_Home quarante-huit heures avant le conseil, ' +
    'comme les règles du conseil le demandent. ' +
    'Son père lit la proposition. ' +
    'Sa mère prend une note. ' +
    'Le vote est serré. ' +
    'La proposition passe à deux voix contre une. ' +
    'Mathieu remercie le conseil, ' +
    'comme les règles du conseil le demandent. ' +
    'Demain il jouera plus longtemps. ' +
    'Et il sait exactement pourquoi il en a le droit.'
  ),

  body(
    'Ce que Mathieu a appris à la table de bois, ' +
    'ce n\'est pas comment utiliser un logiciel de gestion familiale. ' +
    'C\'est comment articuler une demande en arguments. ' +
    'C\'est comment distinguer une règle provisoire d\'une règle permanente. ' +
    'C\'est comment proposer un compromis qui préserve les intérêts des deux parties. ' +
    'C\'est comment accepter le résultat d\'un vote même quand on en est incertain. ' +
    'C\'est comment respecter un processus même quand on aurait préféré gagner plus vite. ' +
    'Ce sont des compétences civiques fondamentales — ' +
    'les mêmes compétences qui permettent à une démocratie de fonctionner ' +
    'quand des millions de personnes avec des intérêts divergents doivent trouver des accommodements. ' +
    'Mathieu les apprend non pas dans une simulation scolaire, ' +
    'mais dans le contexte le plus réel et le plus immédiat de sa vie : sa propre maison.'
  ),

  body(
    'La plupart des discussions sur l\'intelligence artificielle domestique ' +
    'se concentrent sur les résultats immédiats et mesurables : ' +
    'les heures d\'aide aux devoirs, les dollars économisés, ' +
    'les minutes de charge mentale allégée, les rendez-vous manqués évités. ' +
    'Ces mesures sont réelles et importantes. ' +
    'Mais elles manquent le vrai produit de l\'intelligence souveraine domestique, ' +
    'celui qui ne peut pas être quantifié en heures ou en dollars : ' +
    'les citoyens qu\'elle forme. ' +
    'Non pas des citoyens abstraits, philosophiquement idéaux, ' +
    'mais des personnes concrètes qui ont pratiqué la délibération démocratique ' +
    'à la table de leur cuisine, qui ont appris que les règles peuvent être changées ' +
    'par un argument plutôt que par la force, ' +
    'qui ont vu leurs parents admettre leurs propres erreurs ' +
    'sous l\'impartialité d\'un système qui n\'a pas de favori. ' +
    'Ces personnes votent différemment. ' +
    'Elles négocient différemment. ' +
    'Elles élèvent leurs propres enfants différemment.'
  ),

  body(
    'Les historiens de la démocratie notent souvent que les grandes démocraties antiques — ' +
    'Athènes, la République romaine — n\'étaient pas fondées sur des institutions abstraites ' +
    'mais sur des pratiques concrètes et quotidiennes de délibération : ' +
    'l\'agora, le forum, la boule. ' +
    'Ces espaces de délibération collective ont formé des générations de citoyens ' +
    'capables d\'argumenter, de transiger, de respecter les décisions collectives ' +
    'même quand elles leur étaient défavorables. ' +
    'La démocratie n\'était pas enseignée dans les écoles athéniennes — ' +
    'elle était pratiquée dans les espaces publics, ' +
    'dès l\'enfance, avec des enjeux réels. ' +
    'La table de cuisine du conseil familial Gen_Home ' +
    'est cet espace de pratique transposé dans le foyer du 21ème siècle : ' +
    'petit, intime, mais réel dans ses enjeux, ' +
    'et répété suffisamment pour que ses apprentissages deviennent des réflexes. ' +
    'C\'est peut-être là que la démocratie se regagne — ' +
    'non pas dans les grands discours, mais dans les petites décisions ' +
    'qui se prennent ensemble, chaque dimanche soir, à la table familiale.'
  ),

  thesis(
    'L\'intelligence souveraine ne fabrique pas principalement de la commodité. ' +
    'Elle fabrique de la dignité, de la compétence et de la citoyenneté. ' +
    'Ce sont des biens non marchands — mais ce sont peut-être les seuls ' +
    'qui valent vraiment la peine d\'être fabriqués.'
  ),

  sep(),

  secTitle('Le paradoxe de la dépendance bienfaisante'),

  body(
    'Il y a une objection sérieuse à l\'architecture que nous venons de décrire, ' +
    'et elle mérite d\'être traitée honnêtement. ' +
    'Si votre maison vous connaît profondément, ' +
    'si elle gère votre agenda, votre budget, l\'éducation de vos enfants, ' +
    'vos relations familiales, si elle se souvient pour vous de ce que vous avez oublié — ' +
    'ne développez-vous pas une dépendance qui pourrait finir par éroder ' +
    'vos propres capacités cognitives et organisationnelles? ' +
    'C\'est la question de l\'atrophie par substitution. ' +
    'On muscle ce qu\'on utilise et on perd ce qu\'on délègue systématiquement. ' +
    'Si Gen_Home se souvient toujours à votre place, ' +
    'votre mémoire prospective — votre capacité à vous souvenir de ce que vous devez faire — ' +
    'finit-elle par s\'atrophier?'
  ),

  body(
    'La réponse honnête est : peut-être, pour certaines catégories de tâches, ' +
    'et c\'est acceptable dans la mesure où ces tâches ne sont pas constitutives ' +
    'de votre développement en tant que personne. ' +
    'Nous avons déjà fait ce calcul à plusieurs reprises dans l\'histoire. ' +
    'L\'écriture a réduit notre dépendance à la mémoire orale — ' +
    'nous ne mémorisons plus des épopées de milliers de vers, ' +
    'parce que nous pouvons les consulter. ' +
    'La calculatrice a réduit notre capacité de calcul mental. ' +
    'Le GPS a réduit notre sens de l\'orientation. ' +
    'Dans chaque cas, nous avons troqué une compétence spécifique ' +
    'contre une capacité d\'ordre supérieur : ' +
    'la capacité d\'écrire plutôt que de mémoriser nous a permis de développer ' +
    'des formes de pensée analytique qui auraient été impossibles sans l\'écriture. ' +
    'La question n\'est pas de savoir si la délégation change nos capacités cognitives — ' +
    'elle les change, toujours. ' +
    'La question est de savoir ce qu\'elle libère en échange.'
  ),

  body(
    'Ce que libère Gen_Home — l\'espace mental libéré par la gestion automatique ' +
    'de la liste d\'épicerie, du rappel de rendez-vous, de la routine des devoirs — ' +
    'peut être utilisé pour des activités profondément humaines : ' +
    'la conversation sans contrainte, la lecture, la créativité, ' +
    'la présence attentive à ses enfants qui sont là maintenant et qui grandiront bientôt. ' +
    'La charge mentale que Gen_Home absorbe est précisément celle ' +
    'qui empêche ces activités. ' +
    'L\'ironie de la vie moderne est que nous avons plus d\'outils de commodité ' +
    'qu\'aucune génération précédente — et moins de temps de qualité qu\'aucune génération précédente. ' +
    'C\'est parce que nos outils de commodité sont conçus pour augmenter notre consommation, ' +
    'pas notre liberté. ' +
    'Un outil conçu pour votre liberté a un résultat différent.'
  ),

  sep(),

  secTitle('Vers les familles connectées — le pont vers l\'Acte III'),

  body(
    'Les foyers souverains ne sont pas des îles. ' +
    'La souveraineté numérique domestique, portée à sa pleine expression, ' +
    'est une architecture de relation : entre les membres d\'une famille, ' +
    'entre une famille et ses proches, entre des familles et leur communauté, ' +
    'entre des communautés et leur région. ' +
    'La souveraineté sans connexion est de l\'isolement. ' +
    'Ce n\'est pas ce que nous cherchons. ' +
    'Ce que nous cherchons est la connexion dans des conditions de dignité — ' +
    'une connexion où vous choisissez ce que vous partagez, ' +
    'où les règles d\'échange sont transparentes, ' +
    'où aucune entité extérieure ne s\'enrichit en arbitrant vos relations.'
  ),

  body(
    'Pour que ces foyers souverains puissent se connecter les uns aux autres ' +
    'sans retomber dans les bras des plateformes extractives, ' +
    'il faut une infrastructure. ' +
    'Cette infrastructure ne peut pas être construite par une entreprise privée cotée en bourse, ' +
    'dont l\'intérêt à long terme diverge inévitablement de celui de ses utilisateurs. ' +
    'Elle ne peut pas être construite par un gouvernement, ' +
    'dont les impératifs de sécurité nationale et de surveillance entrent ' +
    'en tension permanente avec la vie privée des citoyens. ' +
    'Elle doit être construite sur un modèle coopératif, ' +
    'où les utilisateurs sont aussi les propriétaires, ' +
    'où les règles sont définies collectivement et ne peuvent pas être changées ' +
    'par une décision unilatérale au sommet d\'une hiérarchie corporative. ' +
    'C\'est ce que le réseau UBLinx propose. ' +
    'Et c\'est l\'objet de l\'Acte III.'
  ),

  body(
    'Mais avant de passer à l\'échelle du réseau, il vaut la peine de s\'arrêter ' +
    'sur ce que chaque foyer souverain représente déjà, pris individuellement. ' +
    'Un foyer où l\'information ne fuit pas vers l\'extérieur. ' +
    'Un foyer où les enfants apprennent à délibérer. ' +
    'Un foyer où les personnes âgées conservent leur compétence et leur dignité. ' +
    'Un foyer où la charge mentale est partagée et visible. ' +
    'Un foyer où les dépenses reflètent les valeurs, pas seulement les habitudes. ' +
    'Ce foyer n\'est pas une utopie technologique. ' +
    'Il est une décision — une décision de reprendre la maîtrise ' +
    'de ce que notre vie domestique produit comme données et comme pouvoir. ' +
    'Ces décisions, prises par suffisamment de familles, ' +
    'constituent un mouvement. ' +
    'Et ce mouvement, connecté par une infrastructure de confiance, ' +
    'devient quelque chose dont nous parlerons dans la suite de ce livre.'
  ),

  rq(
    'Que feriez-vous si votre maison vous connaissait mieux que Google, ' +
    'mais ne le disait à personne d\'autre? ' +
    'Changeriez-vous quelque chose à la façon dont vous vivez, ' +
    'sachant que cette connaissance reste entre vos murs? ' +
    'Ou est-ce que la question elle-même révèle quelque chose d\'inconfortable ' +
    'sur la façon dont nous avons appris à performer notre vie ' +
    'pour les algorithmes qui nous regardent?'
  ),

  sep(),

  secTitle("Épilogue de l'acte : ce que Mathieu saura enseigner"),

  sep(),

  secTitle('La citoyenneté comme compétence pratique'),

  body(
    'Il existe une tension fondamentale dans la démocratie libérale moderne ' +
    'entre la théorie et la pratique de la citoyenneté. ' +
    'En théorie, le citoyen démocratique est un agent rationnel, ' +
    'informé, capable de délibérer avec ses semblables, ' +
    'de peser des arguments contraires, de prendre des décisions collectives ' +
    'qui transcendent ses intérêts immédiats. ' +
    'En pratique, la très grande majorité des citoyens des démocraties actuelles ' +
    'ne pratiquent la délibération collective que lors des élections, ' +
    'une fois tous les quatre ans, avec une grille d\'information ' +
    'largement filtrée par des médias ayant leurs propres logiques. ' +
    'Ce gap entre la compétence civique théorique exigée par la démocratie ' +
    'et la pratique effective de délibération que la vie quotidienne offre ' +
    'est une des sources profondes de la fragilité démocratique contemporaine. ' +
    'Des citoyens qui n\'ont jamais vraiment pratiqué la délibération ' +
    'ne l\'exercent pas bien quand les enjeux sont sérieux.'
  ),

  body(
    'Le conseil familial de Gen_Home est une salle de pratique permanente. ' +
    'Non pas une simulation scolaire déconnectée des enjeux réels, ' +
    'mais une institution domestique où les décisions ont des conséquences effectives. ' +
    'Si Alexis perd le vote sur son temps de jeu, il joue moins — réellement. ' +
    'Si Marc échoue à tenir son engagement sur le téléphone au souper, ' +
    'tout le monde le voit — réellement. ' +
    'Si la proposition de rééquilibrage des tâches ménagères est adoptée, ' +
    'elle doit être honorée — réellement. ' +
    'Les enjeux de cuisine ne sont pas les enjeux du parlement. ' +
    'Mais la structure de la délibération est identique : ' +
    'des parties ayant des intérêts divergents, ' +
    'un cadre de règles partagées, ' +
    'un processus de décision légitime, ' +
    'des conséquences obligatoires pour les perdants comme pour les gagnants. ' +
    'L\'enfant qui grandit dans ce cadre développe une intuition de la démocratie ' +
    'que nulle leçon d\'éducation civique ne peut restituer aussi efficacement.'
  ),

  body(
    'David Berthelotte, à travers JRT Inc., n\'est pas en train de proposer ' +
    'un produit technologique avec des fonctionnalités civiques secondaires. ' +
    'Il propose une thèse : que la technologie du foyer, ' +
    'si elle est conçue avec les bons principes, ' +
    'peut être une institution de formation citoyenne plus puissante ' +
    'que de nombreuses institutions explicitement consacrées à cet objectif. ' +
    'La famille est le premier espace politique de l\'individu — ' +
    'le premier lieu où il apprend qu\'il n\'est pas seul, ' +
    'que ses décisions ont des effets sur les autres, ' +
    'que les ressources sont finies et doivent être réparties, ' +
    'que les règles peuvent être injustes et méritent d\'être contestées par des arguments. ' +
    'Outiller ce premier espace politique avec une infrastructure qui le prend au sérieux — ' +
    'qui en préserve la mémoire, qui rend ses délibérations visibles et ses décisions traçables — ' +
    'c\'est parier sur la démocratie à sa racine la plus profonde.'
  ),

  body(
    'Dans vingt ans, Mathieu Vézina aura trente-quatre ans. ' +
    'Il aura peut-être lui-même des enfants. ' +
    'Il leur donnera sans doute un conseil familial, ' +
    'parce que c\'est ainsi que les institutions se transmettent : ' +
    'non pas par l\'obligation mais par l\'exemple, ' +
    'non pas par le décret mais par la conviction intime ' +
    'que c\'est une bonne façon de vivre ensemble. ' +
    'Il ne se souviendra peut-être pas des détails techniques du boîtier ' +
    'qui était sur la tablette à épices dans la cuisine de Bellechasse. ' +
    'Il ne saura peut-être pas nommer le modèle de langage ' +
    'ni l\'architecture RAG ni la quantisation de modèles. ' +
    'Mais il saura — dans ses os, dans ses réflexes — ' +
    'qu\'on peut demander de l\'aide sans perdre sa dignité, ' +
    'qu\'on peut changer les règles par un argument, ' +
    'qu\'on peut avoir tort sans en être diminué, ' +
    'et qu\'une maison qui connaît bien ses habitants peut les rendre plus libres, ' +
    'pas moins. ' +
    'Ce n\'est pas un petit legs. ' +
    'C\'est peut-être le seul qui compte vraiment.'
  ),

  body(
    'L\'intelligence du foyer n\'est pas une fonctionnalité. ' +
    'C\'est une invitation à revisiter la question de ce que la technologie ' +
    'est supposée faire pour nous. ' +
    'Non pas nous rendre plus efficaces au service de l\'économie. ' +
    'Non pas nous connecter à plus de contenus que nous ne pouvons en absorber. ' +
    'Non pas nous offrir plus de choix que notre cerveau ne peut raisonnablement évaluer. ' +
    'Mais nous aider à être présents dans notre vie, ' +
    'à nos enfants, à nos parents vieillissants, ' +
    'à nos voisins, à nos idées, ' +
    'à tout ce qui donne à une vie son sens et sa texture. ' +
    'La technologie souveraine n\'est pas contre-culturelle. ' +
    'Elle est pro-humaine. ' +
    'Et dans un siècle qui en aurait bien besoin, ' +
    'c\'est une distinction qui mérite d\'être défendue.'
  ),

  sep(),

  secTitle('Les limites honnêtes de la vision'),

  crit(
    'Il serait malhonnête de terminer cet acte sans nommer les frictions réelles. ' +
    'Le niveau 1 de Gen_Home — le boîtier logiciel — est faisable aujourd\'hui, ' +
    'mais il requiert une configuration technique initiale ' +
    'que la grande majorité des familles ne peut pas faire elle-même. ' +
    'JRT Inc. doit résoudre le problème de l\'accessibilité sans sacrifier la souveraineté. ' +
    'La solution d\'un technicien certifié JRT qui installe et configure à domicile ' +
    'est un modèle crédible — mais elle requiert un réseau de techniciens qualifiés ' +
    'que JRT doit encore constituer. ' +
    'Ce n\'est pas une impossibilité. C\'est un travail en cours.'
  ),

  body(
    'Il y a aussi la question du prix d\'entrée. ' +
    'Un Beelink SER8 avec 64 gigaoctets de mémoire vive coûte, ' +
    'au moment de la rédaction de ce texte, entre 700 et 900 dollars canadiens. ' +
    'Ajoutez le temps d\'installation et une licence logicielle JRT — ' +
    'et vous avez un investissement initial qui représente plusieurs semaines ' +
    'de dépenses d\'une famille à revenu médian. ' +
    'Deux éléments tempèrent cette préoccupation : ' +
    'd\'abord, le prix du matériel informatique continue de baisser — ' +
    'ce qui coûte 800 dollars en 2025 en coûtera peut-être 300 en 2028. ' +
    'Ensuite, si Gen_Home remplace effectivement plusieurs abonnements existants — ' +
    'Netflix partiellement, Google One, Microsoft 365 — ' +
    'le retour sur investissement peut être positif en deux à trois ans. ' +
    'Mais nommer l\'obstacle clairement est nécessaire : ' +
    'la démocratisation ne se produit pas par magie. ' +
    'Elle se construit par des choix de prix, de modèle commercial et de subvention.'
  ),

  thesis(
    'La souveraineté numérique ne peut pas être un privilège de classe. ' +
    'Si Gen_Home reste un produit pour familles aisées, ' +
    'il reproduit exactement la fracture numérique qu\'il prétend guérir — ' +
    'juste avec une esthétique différente. ' +
    'David Berthelotte et JRT Inc. portent la responsabilité de résoudre ' +
    'l\'équation de l\'accessibilité aussi sérieusement que l\'équation technique.'
  ),

  epigraph(
    '« La maison est le premier territoire de la liberté. ' +
    'Ce qui s\'y passe appartient à ceux qui y vivent. ' +
    'Ce que nous avons oublié de réclamer, nous pouvons le réclamer à nouveau. » — David Berthelotte'
  ),

  pageBreak(),

];

// ---------------------------------------------------------------------------
// Validate and write output
// ---------------------------------------------------------------------------

/**
 * Validates an element against the expected schema.
 * @param {object} el
 * @param {number} index
 */
function validateElement(el, index) {
  if (!el || typeof el !== 'object') {
    throw new Error(`Element ${index} is not an object`);
  }
  if (el.type === 'pageBreak') return;
  if (el.type === 'table') {
    if (!Array.isArray(el.headers)) throw new Error(`Element ${index} (table) missing headers`);
    if (!Array.isArray(el.rows))   throw new Error(`Element ${index} (table) missing rows`);
    return;
  }
  if (el.type === 'richParagraph') {
    if (!Array.isArray(el.segments)) throw new Error(`Element ${index} (richParagraph) missing segments`);
    el.segments.forEach((seg, si) => {
      if (typeof seg.text !== 'string') {
        throw new Error(`Element ${index} (richParagraph) segment ${si} missing text`);
      }
    });
    return;
  }
  if (el.type === 'paragraph') {
    const validStyles = [
      'ActTitle', 'ActSubtitle', 'ChapterTitle', 'SectionTitle', 'SubSection',
      'BodyText', 'SceneText', 'Quote', 'Thesis', 'TechNote',
      'CritiqueBox', 'ReaderQuestion', 'Separator', 'Epigraph',
    ];
    if (!validStyles.includes(el.style)) {
      throw new Error(`Element ${index} has unknown style: ${el.style}`);
    }
    if (typeof el.text !== 'string' || el.text.length === 0) {
      throw new Error(`Element ${index} (${el.style}) has empty or missing text`);
    }
    if (el.text.includes('\n')) {
      throw new Error(`Element ${index} (${el.style}) contains \\n — use separate elements`);
    }
    return;
  }
  throw new Error(`Element ${index} has unknown type: ${el.type}`);
}

elements.forEach(validateElement);

const outputDir  = path.resolve('/mnt/d/conscience_souveraine/book2/chapters');
const outputPath = path.join(outputDir, 'acte2.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(elements, null, 2), 'utf8');

const bodyCount = elements.filter(e => e.type === 'paragraph' && e.style === 'BodyText').length;
const totalCount = elements.length;

console.log(`Acte II generated successfully.`);
console.log(`Total elements : ${totalCount}`);
console.log(`BodyText paragraphs : ${bodyCount}`);
console.log(`Output : ${outputPath}`);
