'use strict';

/**
 * generate_prologue.js
 *
 * Generates /mnt/d/conscience_souveraine/book2/chapters/prologue.json
 *
 * Content: "Le Feu et le Foyer" — Prologue du livre narratif
 * Conscience Souveraine (style essai narratif, à la Harari)
 * Auteur : David Berthelotte
 *
 * Output format: JSON array of paragraph elements for docx assembly.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Element builders
// ---------------------------------------------------------------------------

/** @param {string} text */
const pageBreak = () => ({ type: 'pageBreak' });

/** @param {string} style @param {string} text */
const p = (style, text) => ({ type: 'paragraph', style, text });

/** @param {{ text: string, bold?: boolean, italics?: boolean, size?: number, color?: string }[]} segments */
const rich = (segments) => ({ type: 'richParagraph', segments });

const body    = (text) => p('BodyText',       text);
const scene   = (text) => p('SceneText',      text);
const quote   = (text) => p('Quote',          text);
const thesis  = (text) => p('Thesis',         text);
const tech    = (text) => p('TechNote',       text);
const rq      = (text) => p('ReaderQuestion', text);
const sep     = ()     => p('Separator',      '* * *');
const epigraph= (text) => p('Epigraph',       text);
const chTitle = (text) => p('ChapterTitle',   text);
const secTitle= (text) => p('SectionTitle',   text);
const actTitle= (text) => p('ActTitle',       text);
const actSub  = (text) => p('ActSubtitle',    text);

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const elements = [

  // =========================================================================
  // PROLOGUE TITLE PAGE
  // =========================================================================

  actTitle('CONSCIENCE SOUVERAINE'),
  actSub('Énergie, Intelligence et Idées : Reprendre Ce Qui Nous Appartient'),

  pageBreak(),

  // =========================================================================
  // DÉDICACE
  // =========================================================================

  p('Separator', ''),
  p('Separator', ''),
  p('Separator', ''),

  thesis('À Cynthia Richelieu,'),
  quote('Merci pour ton intelligence lumineuse, ta patience infinie et ton amour inconditionnel. Tu es le pilier sur lequel tout repose. Sans toi, rien de tout ceci n\'existerait.'),

  p('Separator', ''),

  thesis('À Jordane et Olivia,'),
  quote('Mes filles, qui motivent chaque ligne de ce livre. Merci d\'être la plus belle raison de construire, d\'inventer et de croire en l\'avenir.'),

  p('Separator', ''),

  thesis('À Yoshua Bengio,'),
  quote('Merci pour le courage de votre voix et la clarté de votre vision. Votre message d\'alerte a trouvé en moi un écho profond et durable, et il inspire chaque page de cet ouvrage.'),

  p('Separator', ''),
  p('Separator', ''),

  epigraph('David Berthelotte — Québec, 2026'),

  pageBreak(),

  chTitle('PROLOGUE'),
  chTitle('Le Feu et le Foyer'),

  epigraph(
    '« Focus » — du latin : foyer, feu domestique, point de convergence. ' +
    'Ce mot contenait autrefois tout ce dont une famille avait besoin pour vivre. ' +
    'Nous avons passé deux siècles à le démanteler. Ce livre est sur la façon de le reconstruire.'
  ),

  pageBreak(),

  // =========================================================================
  // OPENING SCENE
  // =========================================================================

  scene(
    'Janvier. Quelque part au Québec. La nuit est tombée à seize heures et la température ' +
    'a plongé à moins vingt-trois. À l\'intérieur d\'une cuisine, le vieux poêle à bois craque ' +
    'et ronfle. Une grand-mère y a posé une casserole de soupe aux pois. Un père explique ses ' +
    'factures à son fils de quatorze ans — facture d\'électricité, facture de chauffage, facture ' +
    'internet. Trois feuilles. Trois entreprises. Trois organismes auxquels cette famille doit ' +
    'rendre compte chaque mois pour avoir chaud, pour penser, pour communiquer. La grand-mère ' +
    'se rappelle une époque où tout cela venait du même endroit : le feu dans l\'âtre, ' +
    'la lumière d\'une lampe à huile, les histoires contées à voix haute. Elle ne dit rien. ' +
    'Elle remue la soupe.'
  ),

  body(
    'Ce tableau — un poêle, une famille, une conversation autour de la chaleur — ' +
    'est le point de départ de ce livre. Non par nostalgie. La vie pré-industrielle ' +
    'était dure, froide et courte. Mais parce que dans ce tableau simple, il y a ' +
    'une vérité architecturale que nous avons perdue de vue : pendant la plus grande ' +
    'partie de l\'histoire humaine, l\'énergie, l\'intelligence et les idées vivaient ' +
    'sous le même toit, dans les mains des mêmes personnes. Le feu chauffait. ' +
    'La famille pensait. Les savoirs se transmettaient de main en main, de voix en voix. ' +
    'Le mot latin qui désignait cet espace — focus — signifiait simultanément le feu, ' +
    'le foyer et la famille réunie. Un seul mot pour trois réalités indissociables. ' +
    'Ce n\'était pas une coïncidence. C\'était une description précise du monde tel qu\'il était.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 1 : LE MOT QUI CONTIENT TOUT
  // =========================================================================

  chTitle('I. Le mot qui contient tout'),

  secTitle('Etymologie d\'une civilisation'),

  body(
    'Le mot français « foyer » porte en lui toute une cosmologie. Il vient du latin ' +
    'focus, qui désignait le point central de la maison romaine : l\'âtre où l\'on cuisait ' +
    'la nourriture, où l\'on se réchauffait, où l\'on honorait les dieux Lares, ' +
    'où les décisions familiales étaient prises. C\'était à la fois une source d\'énergie, ' +
    'un centre de traitement de l\'information sociale, et le lieu de production et ' +
    'de transmission du savoir familial. Quand les Romains voulaient dire « rentrer chez soi », ' +
    'ils disaient « revenir au focus ». Ce mot a donné en français « foyer », en anglais ' +
    '« focus » (avec son sens de concentration, de point central), et par extension ' +
    'tous nos « focal points », nos « mise au point ». Nous n\'avons jamais tout à fait ' +
    'abandonné cette intuition : que la pensée, la chaleur et l\'appartenance partagent ' +
    'un centre commun.'
  ),

  body(
    'Prométhée, dans le mythe grec, ne vole pas une ressource industrielle. Il vole ' +
    'une condition de possibilité. Le feu qu\'il apporte aux humains n\'est pas seulement ' +
    'thermique — il est cognitif. Il permet de cuire les aliments, ce qui libère du temps ' +
    'et de l\'énergie mentale. Il permet de s\'éclairer la nuit, ce qui prolonge le temps ' +
    'de pensée. Il permet de se rassembler, ce qui crée la condition de l\'échange d\'idées. ' +
    'Les neuroscientifiques modernes ont montré que la maîtrise du feu, apparue il y a ' +
    'environ 400 000 ans, a probablement été l\'un des facteurs déterminants dans ' +
    'l\'expansion du cerveau humain. En chauffant la nourriture, nos ancêtres digéraient ' +
    'mieux les protéines, ce qui nourrissait des neurones plus nombreux. Le feu était ' +
    'littéralement un outil cognitif autant qu\'énergétique. Prométhée n\'apportait pas ' +
    'du chauffage. Il apportait de l\'intelligence.'
  ),

  body(
    'Pendant des millénaires, cette unité a tenu. Le paysan médiéval connaissait le bois ' +
    'qu\'il coupait, la bête qu\'il élevait, le champ qu\'il travaillait. Ses connaissances — ' +
    'cycles lunaires, signes météorologiques, propriétés médicinales des plantes — ' +
    'étaient à lui. Non pas dans un sens légal ou marchand, mais dans un sens viscéral : ' +
    'il les portait dans son corps, dans ses mains calleuses, dans sa mémoire transmise ' +
    'oralement de génération en génération. Son énergie venait de la forêt commune ou ' +
    'de son lopin. Son intelligence était locale, incarnée, non centralisée. Ses idées ' +
    'lui appartenaient d\'une façon qu\'aucun contrat ne formalisait parce qu\'aucun contrat ' +
    'n\'en avait besoin. Cette économie de l\'appartenance était fragile, inégale, ' +
    'souvent brutale. Mais elle préservait quelque chose que nous avons du mal ' +
    'à nommer aujourd\'hui : une intégralité. Un individu possédait les outils ' +
    'de sa propre existence.'
  ),

  secTitle('La révolution industrielle comme acte de démantèlement'),

  body(
    'La révolution industrielle n\'a pas seulement mécanisé la production. Elle a ' +
    'systématiquement séparé ce que le foyer avait toujours unifié. Première séparation : ' +
    'l\'énergie. Le charbon et la vapeur ont déplacé la production d\'énergie hors du foyer, ' +
    'vers les usines, puis vers les centrales. Ce mouvement était rationnel du point de vue ' +
    'de l\'efficacité pure : une grande centrale thermique produit de l\'électricité ' +
    'bien moins chère qu\'un générateur individuel. Mais il avait un coût invisible : ' +
    'la famille est devenue consommatrice d\'une énergie qu\'elle ne comprend plus, ' +
    'ne contrôle plus, ne peut pas produire elle-même. Le foyer est devenu un terminal ' +
    'de consommation, relié par un câble à une infrastructure qu\'elle ne possède pas.'
  ),

  body(
    'Deuxième séparation, plus subtile : l\'intelligence. Pendant des siècles, ' +
    'le calcul, la mémoire organisée et le raisonnement structuré étaient des capacités ' +
    'personnelles ou familiales. Un marchand tenait ses livres de comptes. Un architecte ' +
    'portait ses plans dans sa tête. Un médecin de campagne avait appris par corps ' +
    'les remèdes de sa région. La bureaucratisation du 19ème siècle a commencé à ' +
    'externaliser cette intelligence dans des institutions : administrations, universités, ' +
    'cabinets d\'experts. Puis l\'informatique du 20ème siècle a accéléré ce mouvement ' +
    'de façon exponentielle. IBM a d\'abord vendu des cerveaux de traitement aux grandes ' +
    'entreprises. Microsoft a démocratisé la machine, mais pas l\'intelligence — ' +
    'il fournissait les outils, les données restaient vôtres. Puis Google, Facebook, ' +
    'Amazon ont compris que les données elles-mêmes étaient la richesse. ' +
    'L\'intelligence collective de plusieurs milliards d\'humains a été aspirée, ' +
    'concentrée et revendue sous forme de publicité ciblée, de recommandations ' +
    'algorithmiques et de prédictions comportementales. Nous pensions utiliser ' +
    'des outils gratuits. Nous étions le produit.'
  ),

  body(
    'Troisième séparation, la moins visible mais peut-être la plus profonde : les idées. ' +
    'Le brevet, inventé au 15ème siècle à Venise pour encourager l\'innovation, ' +
    'était à l\'origine un contrat équitable : l\'inventeur révèle son secret en échange ' +
    'd\'un monopole temporaire. Pendant des siècles, ce système a fonctionné à peu près ' +
    'comme prévu, avec ses imperfections. Mais le 20ème siècle a transformé la propriété ' +
    'intellectuelle en actif financier abstrait, déconnecté de tout inventeur réel. ' +
    'Des cabinets d\'avocats spécialisés achètent des brevets pour poursuivre des entreprises ' +
    'innovantes. Des laboratoires pharmaceutiques bloquent pendant des décennies des ' +
    'médicaments essentiels. Des plateformes numériques s\'approprient les créations ' +
    'de leurs utilisateurs par des clauses contractuelles impénétrables. ' +
    'L\'inventeur individuel — le paysan qui crée un outil, l\'artisan qui invente un procédé, ' +
    'l\'entrepreneur de garage qui imagine une solution — se retrouve face à un système ' +
    'si coûteux et si complexe qu\'il en renonce, ou vend ses droits pour une bouchée de pain.'
  ),

  thesis(
    'Ces trois séparations — de l\'énergie, de l\'intelligence, des idées — ' +
    'sont l\'erreur structurelle fondamentale de la civilisation industrielle. ' +
    'Chacune était rationnelle en isolation. Ensemble, elles ont créé un individu ' +
    'nu : techniquement plus puissant que ses ancêtres, mais plus dépendant, ' +
    'plus surveillé et plus impuissant qu\'aucun serf médiéval n\'aurait pu l\'imaginer.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 2 : LA SÉPARATION ORIGINELLE
  // =========================================================================

  chTitle('II. La séparation originelle'),

  secTitle('Comment nous en sommes arrivés là'),

  body(
    'Pour comprendre où nous sommes, il faut suivre chaque fil séparément, ' +
    'voir comment chaque séparation s\'est produite et ce qu\'elle a coûté. ' +
    'Ce n\'est pas un récit de complot. Personne n\'a planifié de déposséder ' +
    'les familles de leur autonomie. C\'est un récit de logiques séduisantes ' +
    'appliquées sans vision d\'ensemble — ce que les systémiciens appellent ' +
    'une « optimisation locale sous-optimale globalement ». Chaque acteur, ' +
    'dans son domaine, a fait ce qui semblait rationnel. Et le résultat agrégé ' +
    'a été une catastrophe lente, si progressive que nous l\'avons normalisée.'
  ),

  secTitle('L\'énergie : de la forêt commune à la multinationale'),

  body(
    'Au début du 20ème siècle, la promesse de l\'électrification était extraordinaire. ' +
    'L\'électricité allait libérer les femmes des tâches ménagères les plus épuisantes. ' +
    'Elle allait éradiquer les incendies causés par les lampes à pétrole. Elle allait ' +
    'prolonger la journée productive, améliorer la santé, démocratiser la lumière. ' +
    'Et elle a tenu ces promesses. La question n\'est pas là. La question est le modèle ' +
    'institutionnel choisi pour la délivrer : la grande centrale, le réseau national, ' +
    'le monopole d\'État ou de corporation. Ce modèle était raisonnable dans les années 1920, ' +
    'quand les technologies décentralisées n\'existaient pas. Il est devenu un verrou ' +
    'idéologique au 21ème siècle, quand elles existent. Le panneau solaire sur un toit, ' +
    'la petite éolienne, le stockage par batterie domestique : tout cela existe. ' +
    'Mais les régimes tarifaires, les obstacles réglementaires et la culture institutionnelle ' +
    'maintiennent la grande dépendance, même quand elle n\'est plus techniquement nécessaire.'
  ),

  body(
    'La crise climatique est en grande partie une conséquence directe de cette ' +
    'centralisation énergétique. Un réseau centralisé optimise pour le coût moyen ' +
    'et la puissance de pointe — pas pour l\'impact environnemental ou la résilience locale. ' +
    'Hydro-Québec inonde des territoires cris pour produire de l\'électricité vendue ' +
    'à perte à des alumineries américaines. Enbridge fait passer des pipelines sous ' +
    'des rivières sauvages parce que le réseau de distribution centralisé l\'exige. ' +
    'EDF en France maintient 56 réacteurs nucléaires vieillissants parce que son modèle ' +
    'd\'affaires ne peut pas survivre à la décentralisation. Ce ne sont pas des décisions ' +
    'de mauvaises personnes. Ce sont des décisions rationnelles dans un système ' +
    'dont la structure même est devenue le problème. On n\'optimise pas un système ' +
    'défaillant en l\'améliorant à la marge. On le restructure.'
  ),

  secTitle('L\'intelligence : de la salle de classe à la ferme de données'),

  body(
    'L\'intelligence numérique a suivi une trajectoire parallèle. Dans les années 1970, ' +
    'les pionniers de l\'informatique personnelle — Wozniak, Jobs, Kay, Nelson — ' +
    'rêvaient d\'un ordinateur comme outil cognitif personnel, une extension du cerveau ' +
    'de l\'individu. « A bicycle for the mind », disait Steve Jobs. Cette vision ' +
    'était authentiquement émancipatrice. L\'ordinateur personnel devait renforcer ' +
    'les capacités individuelles, non les remplacer ni les surveiller. ' +
    'Les premières deux décennies de l\'internet ont largement tenu cette promesse : ' +
    'on publiait, on créait, on apprenait, on communiquait sans intermédiaire. ' +
    'Les données restaient locales. Le modèle économique était la vente de logiciels ' +
    'et de matériel. L\'utilisateur était client, pas produit.'
  ),

  body(
    'Le tournant s\'est produit avec le modèle publicitaire de Google, ' +
    'raffiné puis généralisé par Facebook. La logique était simple : ' +
    'si vous rendez le service gratuit, les utilisateurs vous donnent ' +
    'leurs données comportementales. Ces données permettent une publicité ' +
    'si ciblée qu\'elle devient extraordinairement lucrative. ' +
    'La démocratisation de l\'accès (tout est gratuit) a été achetée au prix ' +
    'de la démocratisation de la surveillance (tout est observé). ' +
    'Et l\'IA générative contemporaine — ChatGPT, Gemini, Claude, Llama — ' +
    'a ajouté une dimension supplémentaire : l\'intelligence distribuée, ' +
    'incarnée dans des milliards de conversations humaines, a été concentrée ' +
    'dans des modèles propriétaires détenus par une poignée d\'entreprises. ' +
    'Nous avons collectivement entraîné ces systèmes. Ils ne nous appartiennent pas. ' +
    'Ils tournent sur des serveurs que nous ne contrôlons pas, ' +
    'consomment une énergie que nous ne voyons pas, ' +
    'obéissent à des politiques que nous n\'avons pas choisies.'
  ),

  body(
    'Le coût de cette centralisation de l\'intelligence n\'est pas seulement économique ' +
    'ou politique. Il est psychologique et social. Une personne âgée qui ne comprend ' +
    'pas pourquoi l\'algorithme lui refuse un prêt perd quelque chose de fondamental : ' +
    'la sensation d\'habiter un monde intelligible. Un parent qui voit son enfant ' +
    'passer des heures sur une application conçue pour maximiser l\'engagement ' +
    'perd le contrôle de l\'environnement cognitif où son enfant grandit. ' +
    'Un travailleur dont le rendement est surveillé à la seconde par un système ' +
    'opaque perd la dignité de l\'artisan qui connaît son métier. ' +
    'Ces pertes sont diffuses, difficiles à quantifier, rarement étudiées ' +
    'dans les rapports économiques. Mais elles s\'accumulent. Elles construisent ' +
    'une civilisation où les humains sont de plus en plus les exécutants ' +
    'd\'une intelligence qui leur échappe.'
  ),

  secTitle('Les idées : de l\'atelier à l\'actif financier'),

  body(
    'La troisième séparation est la plus cruelle pour l\'inventeur individuel. ' +
    'Le système des brevets, dans sa forme contemporaine, est un paradoxe vivant : ' +
    'il est officiellement conçu pour protéger les inventeurs, ' +
    'mais dans les faits il les protège rarement et freine souvent l\'innovation. ' +
    'Un brevet coûte entre 10 000 et 50 000 dollars canadiens à déposer correctement, ' +
    'avec des renouvellements annuels pendant vingt ans. Sa défense en cas de ' +
    'violation coûte des centaines de milliers, voire des millions. ' +
    'Un individu ou une petite entreprise qui voit son brevet violé par une grande ' +
    'corporation n\'a généralement pas les moyens de se défendre. ' +
    'La protection est nominale. La dépossession est réelle.'
  ),

  body(
    'Et pendant ce temps, l\'économie open-source a montré une autre voie. ' +
    'Linux, Wikipedia, Arduino, le Human Genome Project : des communs intellectuels ' +
    'où la connaissance se partage, se combine et s\'accélère. ' +
    'Mais l\'open-source classique pose un autre problème : ' +
    'il ne récompense pas économiquement ceux qui contribuent le plus. ' +
    'Les mainteneurs de bibliothèques critiques travaillent souvent bénévolement ' +
    'pendant des années, tandis que des corporations milliardaires utilisent ' +
    'leur travail sans rien reverser. La dichotomie entre « propriété fermée ' +
    'qui enrichit sans partager » et « commun ouvert qui partage sans rémunérer » ' +
    'n\'est pas une fatalité. C\'est une limite d\'imagination institutionnelle ' +
    'que des outils modernes — blockchain, contrats intelligents, gouvernance distribuée — ' +
    'permettent désormais de dépasser.'
  ),

  rq(
    'Qu\'ont en commun la facture d\'électricité que vous payez sans comprendre, ' +
    'l\'algorithme qui décide ce que vos enfants voient sur leur écran, ' +
    'et le brevet que vous n\'avez pas les moyens de défendre ? ' +
    'Ils vous rappellent chacun, à leur façon, que quelqu\'un d\'autre ' +
    'contrôle les conditions de votre existence.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 3 : TROIS FILS, UNE TRESSE
  // =========================================================================

  chTitle('III. Trois fils, une tresse'),

  secTitle('Des réponses concrètes à une erreur structurelle'),

  body(
    'Ce livre est né d\'une conviction simple : les séparations décrites ' +
    'dans le chapitre précédent ne sont pas des fatalités. Elles sont des ' +
    'constructions humaines, et les constructions humaines peuvent être ' +
    'déconstruites et reconstruites autrement. Pas à l\'échelle d\'un gouvernement ' +
    'ou d\'une institution internationale — du moins pas dans un premier temps. ' +
    'À l\'échelle d\'une famille. D\'un foyer. D\'un quartier. ' +
    'C\'est pour cela que ce livre parle de trois projets concrets, ' +
    'nés de la même intuition fondatrice : redonner au foyer ce que le ' +
    '20ème siècle lui a pris. Pas par nostalgie, encore une fois. ' +
    'Mais parce que la technologie du 21ème siècle rend enfin cela possible, ' +
    'à un coût accessible, avec une complexité gérable. Le moment est venu.'
  ),

  secTitle('HYPERVORTEX V4.0 : reprendre sa propre énergie'),

  body(
    'Le premier projet s\'appelle HYPERVORTEX V4.0. Son nom sonne comme quelque chose ' +
    'sorti d\'un film de science-fiction, et l\'objet lui-même est effectivement ' +
    'remarquable. Mais le principe qui le sous-tend est vieux comme la métallurgie : ' +
    'certains matériaux perdent leur magnétisme quand on les chauffe au-delà ' +
    'd\'une température critique, appelée température de Curie. ' +
    'Pierre Curie lui-même l\'avait décrit en 1895. Ce qui n\'existait pas alors, ' +
    'c\'est la capacité de fabriquer des nanoparticules magnétiques avec une précision ' +
    'suffisante pour concevoir un moteur fonctionnant exclusivement ' +
    'sur cette transition de phase. HYPERVORTEX V4.0 est, dans son essence, ' +
    'une roue de Curie fluide : un ferrofluide supercritique composé de nanoparticules ' +
    'dont le comportement magnétique change selon leur position dans un gradient ' +
    'thermique soigneusement conçu. Le fluide circule. Les nanoparticules s\'aimantent ' +
    'et se désaimantent. Le mouvement crée de l\'électricité. ' +
    'Il n\'y a pas de pièces solides en rotation. Il n\'y a pas d\'usure mécanique ' +
    'classique. Le moteur est, en quelque sorte, un vortex thermomagnétique permanent.'
  ),

  tech(
    'Paramètres cibles HYPERVORTEX V4.0 : rotor ferrofluide supercritique, ' +
    'nanoparticules Fe₃O₄ dopées (Ø 10-50 nm), température de Curie modulable ' +
    '85-180°C, rendement Carnot estimé 65-90%, puissance cible 3-15 kW ' +
    'selon configuration résidentielle. Sources thermiques compatibles : ' +
    'géothermie basse enthalpie, chaleur résiduelle industrielle, ' +
    'solaire thermique concentré. Zéro émission directe, maintenance minimale.'
  ),

  body(
    'L\'objectif d\'HYPERVORTEX n\'est pas de remplacer le réseau électrique national ' +
    'ou de défier Hydro-Québec. C\'est plus modeste et plus radical à la fois : ' +
    'permettre à une maison, une ferme, un petit immeuble, de produire ' +
    'une fraction significative de son énergie à partir de sources thermiques locales ' +
    'et renouvelables — la chaleur du sol, la chaleur résiduelle d\'un four de boulangerie, ' +
    'la chaleur solaire captée par un collecteur sur le toit. ' +
    'Ce n\'est pas l\'autonomie totale immédiate. C\'est la souveraineté partielle immédiate, ' +
    'avec un chemin vers l\'autonomie croissante. Un foyer qui produit 30% de son énergie ' +
    'n\'est pas indépendant du réseau. Mais il n\'est plus entièrement dépendant non plus. ' +
    'La différence psychologique est massive. La différence économique, sur vingt ans, l\'est encore plus.'
  ),

  secTitle('Gen_Home : reprendre son propre cerveau numérique'),

  body(
    'Le deuxième projet s\'appelle Gen_Home. Son nom est délibérément domestique. ' +
    'C\'est un cerveau numérique familial : une intelligence artificielle qui vit ' +
    'chez vous, tourne sur du matériel que vous possédez, ' +
    'ne transmet aucune donnée à l\'extérieur par défaut, ' +
    'et dont la mémoire est chiffrée avec des clés que vous seuls détenez. ' +
    'Dans sa version à court terme — celle que vous pouvez déployer aujourd\'hui, ' +
    'avec du matériel vendu en ligne pour moins de 500 dollars — ' +
    'il s\'agit d\'un petit ordinateur compact (un Beelink SER8, par exemple), ' +
    'faisant tourner un modèle de langage local via Ollama, ' +
    'avec reconnaissance vocale via Whisper, ' +
    'et une interface adaptée aux besoins de la famille : ' +
    'aide aux devoirs, mémoire des médicaments, ' +
    'traduction instantanée pour les grands-parents allophones, ' +
    'journal de bord familial consultable en langage naturel. ' +
    'Rien de tout cela ne quitte la maison. Rien de tout cela n\'est vendu à un annonceur.'
  ),

  body(
    'Mais Gen_Home a une vision à long terme qui va bien au-delà d\'un ordinateur compact. ' +
    'David Berthelotte a conçu une architecture physique pour une génération suivante : ' +
    'un tore de nanotubes de carbone, tournant à 50 000 tours par minute, ' +
    'avec des chemins neuronaux en triple hélice et des jonctions Josephson ' +
    'pour le calcul supraconducteur à basse température. ' +
    'Ce n\'est pas de la science-fiction — chaque composante de cette architecture ' +
    'existe déjà dans un laboratoire, même si leur intégration reste un défi d\'ingénierie. ' +
    'La caractéristique la plus remarquable de cette vision : ' +
    'la chaleur produite par le calcul serait récupérée pour chauffer la maison. ' +
    'Penser réchaufferait le foyer. La cognition deviendrait littéralement domestique, ' +
    'au sens premier du mot : utile à la maison, produite par la maison, ' +
    'appartenant à la maison. Le cercle ouvert par Prométhée se refermerait.'
  ),

  tech(
    'Vision Gen_Home long terme : substrat toroïdal en nanotubes de carbone (Ø 30 cm), ' +
    'vitesse de rotation 50 000 RPM, jonctions Josephson pour calcul quantique partiel, ' +
    'architecture triple hélice neuromorphique, cogénération thermique (chaleur résiduelle ' +
    'récupérée pour le chauffage résidentiel), consommation nette inférieure à 200W en régime nominal. ' +
    'Phase actuelle : prototypage logiciel sur Beelink SER8 + Ollama + Whisper, ' +
    'zéro télémétrie, chiffrement familial bout-en-bout.'
  ),

  body(
    'Il faut être honnête sur ce que Gen_Home n\'est pas. ' +
    'Ce n\'est pas ChatGPT. Dans sa version actuelle, un modèle local de 7 milliards ' +
    'de paramètres est moins capable qu\'un modèle de 70 milliards hébergé dans le cloud. ' +
    'Il répond moins vite. Il fait plus d\'erreurs sur des questions encyclopédiques. ' +
    'Il ne peut pas naviguer sur internet en temps réel. ' +
    'Ces limitations sont réelles. Mais elles doivent être mises en balance ' +
    'avec ce que Gen_Home offre que les géants du cloud ne peuvent pas offrir : ' +
    'le fait que votre conversation sur l\'état de santé de votre mère ' +
    'ne se retrouve pas dans un corpus d\'entraînement. ' +
    'Le fait que votre enfant puisse poser des questions embarrassantes sans que cela ' +
    'construise un profil comportemental vendu à une assurance. ' +
    'Le fait que l\'IA soit là quand le réseau est coupé, quand la compagnie décide ' +
    'de changer ses conditions d\'utilisation, quand le monde déraille. ' +
    'La résilience a une valeur que la performance brute ne mesure pas.'
  ),

  secTitle('UBLinx : reprendre ses propres idées'),

  body(
    'Le troisième projet s\'appelle UBLinx. C\'est le plus abstrait des trois, ' +
    'et peut-être le plus important pour la transformation à long terme. ' +
    'UBLinx est une plateforme de propriété intellectuelle distribuée : ' +
    'un réseau pair-à-pair combinant blockchain et calcul distribué, ' +
    'où les inventeurs peuvent déposer, protéger et monétiser leurs idées ' +
    'sans intermédiaire institutionnel coûteux. ' +
    'Le concept central est ce que Berthelotte appelle le « brevet équitable ouvert » : ' +
    'une invention déposée sur UBLinx est automatiquement accessible en lecture et en étude ' +
    'à quiconque — enseignants, chercheurs, curieux. ' +
    'Son usage commercial déclenche automatiquement, via contrat intelligent, ' +
    'des royalties versées directement à l\'inventeur. ' +
    'L\'usage personnel sous un seuil minimal (moins de cinq copies) est gratuit. ' +
    'Pas de cabinet d\'avocats. Pas de frais de renouvellement annuels. ' +
    'Pas de prédateurs de brevets pouvant acheter vos droits à bas prix pour vous les retourner contre.'
  ),

  body(
    'La validation des inventions sur UBLinx suit un protocole à deux phases. ' +
    'Première phase : un filtre de pré-validation par apprentissage automatique, ' +
    'qui vérifie la nouveauté relative et l\'absence de violations de brevets existants. ' +
    'Deuxième phase : une validation humaine par des experts pairs, ' +
    'rémunérés en cryptomonnaie de la plateforme pour leurs évaluations. ' +
    'Ce système n\'est pas parfait — aucun système de validation ne l\'est. ' +
    'Mais il est accessible. Un inventeur au Québec, au Sénégal, en Inde ou en Bolivie ' +
    'peut soumettre une idée pour le coût d\'une connexion internet ' +
    'et d\'un peu de temps. La géographie et le capital ne sont plus ' +
    'des conditions préalables à la protection intellectuelle. ' +
    'C\'est un changement de civilisation, pas seulement d\'outil.'
  ),

  secTitle('Pas trois produits : un seul acte'),

  body(
    'HYPERVORTEX, Gen_Home et UBLinx pourraient sembler trois projets distincts ' +
    'dans trois secteurs différents — énergie, numérique, droit. ' +
    'Ce livre soutient qu\'ils sont trois aspects d\'un seul et même acte : ' +
    'restituer au foyer humain ce que la logique industrielle et numérique ' +
    'lui a progressivement retiré. L\'énergie, l\'intelligence et les idées ' +
    'n\'ont jamais dû être séparées. Leur réunification n\'est pas une utopie : ' +
    'c\'est un projet d\'ingénierie, d\'architecture institutionnelle et de design social ' +
    'que la technologie contemporaine rend enfin faisable. ' +
    'Ce n\'est pas non plus une révolution au sens d\'un renversement brutal. ' +
    'C\'est une reconversion, progressive, distribuée, choisie par des individus ' +
    'et des familles qui décident, un à un, de reprendre leur focus.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 4 : LA QUESTION CENTRALE
  // =========================================================================

  chTitle('IV. La question centrale'),

  secTitle('Ce que ce livre explore vraiment'),

  body(
    'Avant de continuer, une honnêteté s\'impose. Ce livre aurait pu être ' +
    'un manifeste techno-optimiste de plus : « Voici les solutions, ' +
    'voici comment elles vont tout changer, le futur est radieux. » ' +
    'Il aurait pu être aussi le récit d\'un inventeur solitaire ' +
    'triomphant contre les forces du marché. Ces deux livres existent déjà, ' +
    'en de nombreuses versions. Ce n\'est pas celui-là. ' +
    'Ce livre pose une question plus difficile, plus honnête, ' +
    'et finalement plus utile : qu\'arrive-t-il réellement quand un individu, ' +
    'une famille, un quartier reprend le contrôle de son énergie, ' +
    'de son intelligence numérique et de ses idées ? ' +
    'La réponse n\'est pas simple. Elle conduit au meilleur et au pire. ' +
    'Et c\'est cette tension qui rend la question valable.'
  ),

  thesis(
    'Qu\'arrive-t-il quand un individu ordinaire possède réellement ' +
    'son énergie, son intelligence numérique et ses idées ? ' +
    'Ce livre ne prétend pas avoir la réponse définitive. ' +
    'Il l\'explore. Et l\'exploration honnête mène à des territoires inconfortables ' +
    'autant qu\'à des horizons lumineux.'
  ),

  body(
    'Commençons par les horizons lumineux, parce qu\'ils sont réels ' +
    'et qu\'il serait malhonnête de les minimiser. ' +
    'Un foyer qui produit une partie de son énergie développe un rapport ' +
    'différent à la consommation. Non pas par vertu morale imposée de l\'extérieur, ' +
    'mais par compréhension directe du coût réel. ' +
    'Quand vous voyez en temps réel que votre chauffage consomme ' +
    'trois fois plus que votre éclairage, et que cet écart est visible ' +
    'sur l\'écran de votre générateur domestique, votre comportement change. ' +
    'Pas radicalement, pas du jour au lendemain, mais progressivement, ' +
    'naturellement. L\'information incarnée dans l\'expérience directe ' +
    'est plus puissante que n\'importe quelle campagne de sensibilisation. ' +
    'Les études sur les ménages ayant installé des panneaux solaires ' +
    'montrent systématiquement une réduction supplémentaire de 15 à 20% ' +
    'de leur consommation globale, simplement parce que le rapport ' +
    'à l\'énergie a changé de nature : d\'invisible à visible, ' +
    'd\'abstrait à concret, de subi à choisi.'
  ),

  body(
    'Un foyer qui possède son intelligence numérique développe des usages ' +
    'que les plateformes centralisées ne permettent pas ou ne permettront jamais, ' +
    'parce que ces usages ne sont pas monétisables. Un journal de famille ' +
    'consultable par la grand-mère de 80 ans en langage naturel. ' +
    'Un assistant qui connaît les allergies, les médicaments, les anniversaires ' +
    'et les aspirations de chaque membre, sans jamais trahir cette intimité ' +
    'à un tiers. Un outil d\'apprentissage adapté aux difficultés spécifiques ' +
    'd\'un enfant dyslexique, patient à l\'infini, disponible à 2h du matin ' +
    'quand l\'angoisse d\'un examen empêche de dormir. ' +
    'Ces usages existent dans les discours publicitaires de Google et Microsoft. ' +
    'Ils n\'existent pas dans la réalité, parce que leur réalisation nécessiterait ' +
    'de laisser des données sensibles hors du reach des annonceurs, ' +
    'ce que le modèle économique ne peut pas se permettre.'
  ),

  body(
    'Un inventeur qui peut protéger et monétiser ses idées sans intermédiaire ' +
    'coûteux explore des solutions que les grands laboratoires ne cherchent pas, ' +
    'parce que ces solutions ne sont pas assez lucratives à grande échelle ' +
    'mais sont transformatrices à petite échelle. ' +
    'Un système de chauffage passif pour les maisons inuites. ' +
    'Un dispositif de purification d\'eau solaire pour les régions sans électricité. ' +
    'Un outil de traduction orale pour les langues autochtones en danger. ' +
    'Ces inventions existent dans des esprits partout dans le monde. ' +
    'Elles ne sortent pas des ateliers de garage parce que le chemin ' +
    'vers la protection et la commercialisation est trop coûteux, trop complexe, ' +
    'trop décourageant. Un système de propriété intellectuelle accessible ' +
    'débloque ce réservoir d\'innovation distribuée. ' +
    'C\'est un bien public immense, même si aucun rapport du FMI ne le mesurera jamais.'
  ),

  secTitle('Les territoires inconfortables'),

  body(
    'Mais voici les territoires inconfortables, ceux que les manifestes techno-optimistes ' +
    'omettent soigneusement. La souveraineté énergétique peut créer de nouvelles inégalités. ' +
    'Si les maisons qui peuvent se payer un système HYPERVORTEX ou des panneaux solaires ' +
    'se déconnectent partiellement du réseau, qui finance l\'entretien de ce réseau ' +
    'pour ceux qui ne peuvent pas se le payer ? ' +
    'La mutualisation du risque et de l\'infrastructure a une valeur sociale ' +
    'que la souveraineté individuelle peut éroder. ' +
    'Ce livre ne prétend pas que la souveraineté est sans coûts collectifs. ' +
    'Il soutient que ces coûts peuvent être gérés si on les anticipe honnêtement, ' +
    'et qu\'ils sont moins importants que le coût de la dépendance totale. ' +
    'Mais l\'honnêteté exige de les nommer.'
  ),

  body(
    'L\'intelligence numérique locale peut aussi devenir un vecteur d\'enfermement. ' +
    'Un foyer dont le cerveau numérique n\'est jamais mis à jour, ' +
    'jamais confronté à des perspectives extérieures, ' +
    'peut amplifier ses propres biais et préjugés sans correctif. ' +
    'La chambre d\'écho n\'est pas une invention des réseaux sociaux centralisés : ' +
    'elle est une tendance humaine fondamentale que la technologie ' +
    'peut amplifier ou atténuer selon son design. ' +
    'Gen_Home doit être conçu pour connecter les familles au monde ' +
    'tout en protégeant leur intimité — non pour les en couper. ' +
    'La différence entre une membrane sélective et un mur n\'est pas technique. ' +
    'Elle est architecturale et culturelle. Elle se joue dans les choix de design ' +
    'faits dès le début, et si ces choix sont mauvais, l\'outil devient son contraire.'
  ),

  body(
    'Et la propriété intellectuelle distribuée ? Elle peut libérer l\'inventeur, ' +
    'mais elle peut aussi fragmenter la base de connaissance commune ' +
    'qui rend la science possible. ' +
    'Si chaque idée est immédiatement protégée et monétisée, ' +
    'les collaborations spontanées, les échanges informels, ' +
    'la fertilisation croisée des disciplines se compliquent. ' +
    'Les scientifiques qui travaillent en open access le savent : ' +
    'il y a une tension réelle entre la protection des droits individuels ' +
    'et la vitalité des communs intellectuels. ' +
    'UBLinx doit naviguer cette tension — et ce livre expliquera comment, ' +
    'avec lucidité sur les compromis inévitables.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 5 : LA DIGNITÉ COMME PRODUIT
  // =========================================================================

  chTitle('V. La dignité comme produit'),

  secTitle('Ce que la technologie souveraine fabrique vraiment'),

  body(
    'Voici une reformulation de la question centrale : ' +
    'qu\'est-ce que ces trois projets produisent en réalité ? ' +
    'Pas de l\'électricité, pas de la puissance de calcul, pas des brevets. ' +
    'Ils produisent quelque chose de plus fondamental et de plus difficile à quantifier. ' +
    'Ils produisent de la dignité. ' +
    'Ce mot risque de sonner creux dans un contexte technologique. ' +
    'Laissons-lui une chance de trouver sa précision. ' +
    'La dignité, ici, n\'est pas un concept philosophique abstrait. ' +
    'C\'est une expérience vécue, concrète, corporelle. ' +
    'C\'est la sensation de comprendre ce qui vous arrive. ' +
    'C\'est la capacité de dire non, de choisir autrement, de refuser ' +
    'sans conséquence catastrophique. ' +
    'C\'est la possibilité d\'expliquer à votre enfant comment fonctionne ' +
    'le système qui gère votre vie, parce que vous le comprenez vous-même.'
  ),

  body(
    'Prenons des exemples concrets, parce que c\'est là que la dignité se révèle. ' +
    'Une personne âgée confrontée à une interface numérique incompréhensible ' +
    'ne perd pas seulement de l\'efficacité. ' +
    'Elle perd quelque chose de plus précieux : le sentiment d\'être compétente ' +
    'dans sa propre vie. Chaque formulaire incompréhensible, chaque message d\'erreur cryptique, ' +
    'chaque « désolé, je ne comprends pas votre demande » d\'un chatbot institutionnel ' +
    'est une petite humiliation. Accumulées sur des années, ' +
    'ces petites humiliations construisent une narrative intime : ' +
    '« Je suis trop vieux pour ce monde. » ' +
    'Cette narrative est fausse — la personne n\'est pas incompétente, ' +
    'l\'interface est mal conçue. Mais la narrative s\'installe. ' +
    'Elle détermine des comportements. Elle crée une dépendance envers ' +
    'les membres plus jeunes de la famille, qui eux-mêmes ne comprennent souvent ' +
    'pas vraiment les systèmes qu\'ils utilisent — ils les subissent avec plus ' +
    'd\'aisance apparente, ce qui n\'est pas la même chose que la compréhension. ' +
    'Un assistant numérique familial qui parle la langue de la grand-mère, ' +
    'qui connaît son histoire, qui répond à ses questions sans jugement ' +
    'et sans envoyer ses données médicales à une compagnie d\'assurance : ' +
    'ce n\'est pas du luxe. C\'est de la dignité restaurée.'
  ),

  body(
    'Un parent qui ne comprend pas ce que son enfant regarde, apprend ' +
    'ou pense via ses écrans ne perd pas seulement de l\'autorité parentale. ' +
    'Il perd quelque chose de plus fondamental : la capacité d\'être un repère. ' +
    'L\'humiliation du parent qui se fait corriger par son enfant de dix ans ' +
    'sur le fonctionnement d\'une application est réelle. ' +
    'Ce n\'est pas une humiliation qui blesse son ego de chef de famille. ' +
    'C\'est une humiliation qui lui signale qu\'il n\'habite plus le même monde ' +
    'que son enfant, qu\'il n\'a plus prise sur l\'environnement où son enfant ' +
    'se forme. Ce signal est destructeur du lien familial d\'une façon ' +
    'que les discours sur l\'addiction aux écrans ne capturent pas. ' +
    'Ce n\'est pas seulement que les écrans volent du temps de présence. ' +
    'C\'est qu\'ils créent un fossé de compréhension qui transforme ' +
    'le parent en étranger dans la vie numérique de son enfant. ' +
    'Un foyer qui maîtrise son infrastructure numérique — qui sait ce qui tourne, ' +
    'qui peut en expliquer le fonctionnement à son enfant, ' +
    'qui peut choisir ce qui entre et ce qui sort — est un foyer ' +
    'où le parent peut rester un repère dans l\'espace numérique autant que physique.'
  ),

  body(
    'Une mère qui gère logistiquement un foyer — repas, médicaments, rendez-vous, ' +
    'budget, relations avec les institutions — accomplit un travail cognitif ' +
    'considérable que notre économie ne mesure pas, ne reconnaît pas ' +
    'et ne rémunère pas. Quand un outil numérique traite cette gestion ' +
    'comme une série de tâches banales, automatisables, sans valeur intrinsèque, ' +
    'il reproduit et renforce l\'invisibilité de ce travail. ' +
    'Un assistant de foyer conçu dans le respect de ce travail — ' +
    'qui mémorise les préférences de chaque membre, qui anticipe les besoins, ' +
    'qui documente les décisions pour que la valeur de la gestion domestique ' +
    'soit visible et transmissible — change quelque chose dans la façon ' +
    'dont cette femme (ou cet homme) se perçoit elle-même. ' +
    'Ce n\'est pas de la reconnaissance sentimentale. ' +
    'C\'est de la reconnaissance architecturale : le système reconnaît ' +
    'la complexité de ce qui se passe ici. ' +
    'La dignité, ici, c\'est d\'être vu.'
  ),

  body(
    'Un adolescent traité par les algorithmes des réseaux sociaux ' +
    'comme une série de biais exploitables — acheter ceci, voter pour ça, ' +
    'ressentir cela — n\'est pas seulement manipulé. Il est formé à se penser ' +
    'comme exploitable. Il intègre un modèle du monde où les entités puissantes ' +
    'utilisent les entités faibles, et où la faiblesse est la condition normale ' +
    'du citoyen ordinaire. Ce modèle est peut-être la chose la plus dangereuse ' +
    'que la technologie centralise ait produite : une génération qui, ' +
    'ayant grandi dans des systèmes conçus pour les exploiter, ' +
    'ne peut pas imaginer des systèmes conçus pour les servir. ' +
    'Un adolescent qui comprend comment fonctionne l\'IA dans sa maison, ' +
    'qui peut en modifier les paramètres, qui sait pourquoi elle répond ' +
    'ce qu\'elle répond, qui peut lui poser des questions et obtenir ' +
    'des réponses honnêtes sur ses limites — cet adolescent développe ' +
    'un rapport à la technologie radicalement différent. ' +
    'Pas nécessairement plus technophile. Peut-être plus sceptique, ' +
    'plus exigeant, plus citoyen. La technologie souveraine ne fabrique pas ' +
    'des consommateurs de technologie. Elle fabrique des citoyens de la technologie.'
  ),

  quote(
    '« La souveraineté n\'est pas un mur. C\'est une membrane. ' +
    'Elle ne coupe pas du monde — elle donne le choix de comment on s\'y connecte. »'
  ),

  body(
    'Cette distinction entre mur et membrane est le fil conducteur philosophique ' +
    'de ce livre. Un mur protège en isolant. Une membrane protège en filtrant. ' +
    'La souveraineté que nous décrivons ici n\'est pas un repli sur soi, ' +
    'une déconnexion du monde, une utopie autonomiste naïve. ' +
    'C\'est la capacité choisie de se connecter selon ses propres termes. ' +
    'Une maison qui produit son énergie peut quand même être connectée au réseau ' +
    'et lui vendre son surplus. Elle choisit quand et comment. ' +
    'Un foyer avec son propre cerveau numérique peut quand même utiliser ' +
    'les services cloud pour certaines tâches. Il choisit lesquelles, ' +
    'en sachant quelles données partent et pourquoi. ' +
    'Un inventeur qui protège ses idées sur UBLinx peut quand même ' +
    'publier certaines découvertes en open access total. Il choisit. ' +
    'Ce choix est la dignité.'
  ),

  sep(),

  // =========================================================================
  // CHAPITRE 6 : CARTE DU VOYAGE
  // =========================================================================

  chTitle('VI. Carte du voyage'),

  secTitle('Ce que vous trouverez dans ce livre'),

  body(
    'Ce livre est organisé en quatre actes, qui correspondent ' +
    'à quatre niveaux de profondeur dans la même question. ' +
    'Le premier acte, « Le Feu volé », raconte comment nous sommes arrivés ici. ' +
    'L\'histoire de la dépossession énergétique, numérique et intellectuelle ' +
    'que ce prologue a introduite. Ce n\'est pas une histoire de méchants et de victimes. ' +
    'C\'est une histoire de systèmes qui ont leurs propres logiques, ' +
    'leurs propres inerties, leurs propres points aveugles. ' +
    'Comprendre ces logiques est la condition préalable pour les transformer. ' +
    'On ne combat pas ce qu\'on ne comprend pas.'
  ),

  body(
    'Le deuxième acte, « Les Trois Feux », présente les projets en détail. ' +
    'HYPERVORTEX V4.0, avec sa physique des ferrofluides supercritiques, ' +
    'ses défis d\'ingénierie, ses cas d\'usage réels et son chemin vers le marché. ' +
    'Gen_Home, avec son architecture en deux phases — ' +
    'le logiciel déployable aujourd\'hui et la vision à long terme du tore neuromorphique — ' +
    'ses usages familiaux concrets et ses limites honnêtement exposées. ' +
    'UBLinx, avec son modèle de gouvernance distribuée, ' +
    'son protocole de validation à deux phases, ' +
    'et sa vision d\'un Internet de la propriété intellectuelle ' +
    'accessible à tout inventeur sur la planète. ' +
    'Cet acte n\'est pas un catalogue de vente. ' +
    'C\'est un laboratoire ouvert : voici comment cela fonctionne, ' +
    'voici ce qui marche, voici ce qui reste à résoudre.'
  ),

  body(
    'Le troisième acte, « Le Foyer Reconstruit », est le plus spéculatif et le plus humain. ' +
    'Il imagine — à travers des scènes et des portraits composites, ' +
    'jamais de vrais individus identifiables — ' +
    'ce que vivrait une famille qui aurait adopté les trois projets ensemble. ' +
    'La grand-mère et l\'assistant vocal. Le père et la facture d\'énergie réduite. ' +
    'L\'adolescent et sa première déposition d\'idée sur UBLinx. ' +
    'La mère et la reconnaissance de son travail invisible. ' +
    'Ce n\'est pas de la propagande utopiste. C\'est une exploration narrative ' +
    'des possibilités réelles, avec leurs frictions, leurs résistances, ' +
    'leurs demi-succès et leurs surprises. ' +
    'Les technologies changent les comportements de façons imprévisibles. ' +
    'Ce livre essaie d\'imaginer ces imprévisibilités honnêtement.'
  ),

  body(
    'Le quatrième acte, « La Flamme Commune », zoome hors du foyer individuel. ' +
    'Si des milliers, puis des dizaines de milliers de foyers adoptaient ' +
    'ces technologies souveraines, que se passerait-il au niveau collectif ? ' +
    'Quelles nouvelles institutions seraient nécessaires ? ' +
    'Quelles résistances institutionnelles et politiques se manifesteraient ? ' +
    'Comment une ville, une région, une nation pourrait-elle évoluer ' +
    'si la souveraineté individuelle devenait une norme sociale ' +
    'plutôt qu\'une exception militante ? ' +
    'Cet acte est le plus politique du livre, et le moins certain. ' +
    'Il pose des questions sans prétendre avoir toutes les réponses. ' +
    'Il offre des hypothèses de travail, des scenarios alternatifs, ' +
    'des mises en garde contre les utopies trop propres.'
  ),

  secTitle('Une invitation'),

  body(
    'Ce livre n\'est pas écrit pour les ingénieurs en chef des grandes entreprises ' +
    'énergétiques, pour les directeurs de produit des géants du numérique, ' +
    'ou pour les équipes juridiques des cabinets de propriété intellectuelle. ' +
    'Ces personnes ont leurs propres ressources, leurs propres consultants, ' +
    'leurs propres raisons de ne pas vouloir ce que ce livre propose. ' +
    'Ce livre est écrit pour l\'ingénieur curieux qui se demande si sa carrière ' +
    'pourrait avoir plus de sens. Pour la famille qui cherche des voies ' +
    'concrètes vers une plus grande autonomie. Pour l\'inventeur de garage ' +
    'qui a une idée qui mérite d\'exister. Pour l\'enseignant qui cherche ' +
    'des façons de rendre les technologies compréhensibles à ses étudiants. ' +
    'Pour le décideur municipal qui veut savoir ce que « résilience énergétique » ' +
    'signifie concrètement. Pour quiconque ressent, même confusément, ' +
    'que quelque chose d\'important a été perdu et qu\'il est peut-être ' +
    'temps de le reprendre.'
  ),

  body(
    'David Berthelotte a développé ces projets au Québec, ' +
    'dans le contexte spécifique d\'une province nordique ' +
    'avec une forte tradition d\'autonomie communautaire, ' +
    'une économie de l\'innovation encore en construction, ' +
    'et des enjeux énergétiques et climatiques particulièrement urgents. ' +
    'Mais les problèmes auxquels ces projets répondent ne sont pas québécois. ' +
    'Ils sont universels. La dépendance énergétique touche chaque famille ' +
    'sur chaque continent. La colonisation numérique de l\'intimité ' +
    'n\'a pas de frontières. L\'inaccessibilité du système des brevets ' +
    'est particulièrement cruelle dans les pays les moins riches, ' +
    'où l\'inventivité individuelle est souvent la seule ressource disponible. ' +
    'Les solutions proposées ici sont développées dans un contexte ' +
    'mais destinées à un usage universel. ' +
    'L\'ambition est aussi simple et aussi grande que cela.'
  ),

  body(
    'La famille québécoise autour du vieux poêle à bois avec laquelle nous avons commencé ' +
    'n\'a pas besoin de nostalgie. Elle a besoin d\'outils qui lui rendent, ' +
    'avec les technologies du 21ème siècle, ce que l\'âtre du 18ème siècle offrait : ' +
    'la chaleur qu\'elle produit elle-même, l\'intelligence qu\'elle partage entre elle, ' +
    'et les idées qu\'elle transmet de génération en génération. ' +
    'Le feu de Prométhée n\'a jamais appartenu aux dieux. ' +
    'Il appartient à ceux qui savent quoi en faire. ' +
    'Ce livre est une proposition sur ce qu\'il est possible d\'en faire maintenant.'
  ),

  quote(
    '« La grande-mère remue la soupe. Elle n\'a pas besoin qu\'on lui explique ' +
    'la thermodynamique du foyer. Elle sait ce que le feu signifie. ' +
    'Elle attend que nous rattrapions son intuition. »'
  ),

  pageBreak(),

];

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------

const outputDir  = '/mnt/d/conscience_souveraine/book2/chapters';
const outputPath = `${outputDir}/prologue.json`;

// Ensure output directory exists
if (!require('fs').existsSync(outputDir)) {
  require('fs').mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(elements, null, 2), 'utf8');

const wordCount = elements
  .filter(el => el.text)
  .reduce((acc, el) => acc + el.text.split(/\s+/).length, 0);

console.log(`Prologue JSON written to: ${outputPath}`);
console.log(`Total elements: ${elements.length}`);
console.log(`Estimated word count: ${wordCount}`);
console.log(`Estimated pages (300 words/page): ~${Math.round(wordCount / 300)}`);
