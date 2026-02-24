/**
 * GENERATE_AUTOCRITIQUE.JS — Chapitre 27 : Autocritique et Limites Fondamentales
 *
 * Ce chapitre est un exercice de rigueur intellectuelle : chaque faille identifiée
 * dans l'architecture Conscience Souveraine y est exposée sans détour.
 *
 * USAGE: node scripts/generate_autocritique.js
 * OUTPUT: chapters/autocritique.json
 */
const fs = require('fs');
const path = require('path');
const OUTPUT_FILE = path.join(__dirname, '..', 'chapters', 'autocritique.json');

function partTitle(t){return{type:'paragraph',heading:'HEADING_1',spacing:{before:4800,after:600},alignment:'CENTER',children:[{type:'text',text:t,bold:true,size:48,font:'Arial'}]};}
function chapterTitle(n,t){return{type:'paragraph',heading:'HEADING_1',spacing:{before:480,after:240},pageBreakBefore:true,children:[{type:'text',text:`Chapitre ${n} — ${t}`,bold:true,size:36,font:'Arial'}]};}
function sectionTitle(n,t){return{type:'paragraph',heading:'HEADING_2',spacing:{before:360,after:180},children:[{type:'text',text:`${n} ${t}`,bold:true,size:28,font:'Arial'}]};}
function subSection(t){return{type:'paragraph',heading:'HEADING_3',spacing:{before:240,after:120},children:[{type:'text',text:t,bold:true,size:24,font:'Arial'}]};}
function bodyText(t){return{type:'paragraph',spacing:{after:120,line:276},children:[{type:'text',text:t,size:22,font:'Arial'}]};}
function richText(r){return{type:'paragraph',spacing:{after:120,line:276},children:r.map(x=>({type:'text',text:x.text,bold:x.bold||false,italics:x.italic||false,size:x.size||22,font:x.font||'Arial',color:x.color||undefined}))};}
function quote(t){return{type:'paragraph',spacing:{after:120,line:276},indent:{left:720,right:720},children:[{type:'text',text:t,italics:true,size:22,font:'Arial'}]};}
function formula(t){return{type:'paragraph',spacing:{before:240,after:240},alignment:'CENTER',children:[{type:'text',text:t,italics:true,size:24,font:'Cambria Math'}]};}
function simpleTable(h,r,w){return{type:'table',width:9026,columnWidths:w,headers:h,rows:r};}
function critiqueBox(t){return{type:'paragraph',spacing:{before:240,after:240},border:{top:{style:'SINGLE',size:1,color:'CC0000'},bottom:{style:'SINGLE',size:1,color:'CC0000'},left:{style:'SINGLE',size:6,color:'CC0000'},right:{style:'SINGLE',size:1,color:'CC0000'}},indent:{left:360,right:360},children:[{type:'text',text:'Objection critique : ',bold:true,size:22,font:'Arial',color:'CC0000'},{type:'text',text:t,size:22,font:'Arial'}]};}
function noteBox(t){return{type:'paragraph',spacing:{before:240,after:240},border:{top:{style:'SINGLE',size:1,color:'2E75B6'},bottom:{style:'SINGLE',size:1,color:'2E75B6'},left:{style:'SINGLE',size:6,color:'2E75B6'},right:{style:'SINGLE',size:1,color:'2E75B6'}},indent:{left:360,right:360},children:[{type:'text',text:'Piste de résolution : ',bold:true,size:22,font:'Arial',color:'2E75B6'},{type:'text',text:t,size:22,font:'Arial'}]};}
function pageBreak(){return{type:'pageBreak'};}

function generateContent(){
const e=[];

// ================================================================
// TITRE DE PARTIE
// ================================================================
e.push(partTitle('PARTIE VII'));
e.push({type:'paragraph',spacing:{before:600,after:200},alignment:'CENTER',children:[{type:'text',text:'Autocritique et Limites Fondamentales',bold:true,size:36,font:'Arial'}]});
e.push({type:'paragraph',spacing:{after:400},alignment:'CENTER',children:[{type:'text',text:'Ce que nous ne savons pas, ce qui pourrait être faux, et ce qui reste à prouver',italics:true,size:24,font:'Arial'}]});
e.push(pageBreak());

// ================================================================
// CHAPITRE 27 — AUTOCRITIQUE ET LIMITES FONDAMENTALES
// ================================================================
e.push(chapterTitle(27,"Autocritique et Limites Fondamentales"));

e.push(bodyText("Ce chapitre est probablement le plus important de tout ce manuel. Non pas parce qu'il contient les idées les plus brillantes — mais parce qu'il contient les doutes les plus honnêtes. Toute architecture théorique qui ne se soumet pas à un examen impitoyable de ses propres faiblesses n'est pas de la science — c'est de la foi. Et la Conscience Souveraine, aussi ambitieuse soit-elle, ne mérite pas notre foi. Elle mérite notre rigueur."));

e.push(bodyText("Nous avons identifié cinq catégories de faiblesses dans notre propre architecture. Certaines sont potentiellement fatales. D'autres sont des lacunes comblables par la recherche future. Toutes méritent d'être exposées avec la même transparence que nous demandons au système lui-même (Invariant IV). Si nous exigeons la transparence d'une conscience artificielle, nous devons l'exiger d'abord de nous-mêmes."));

e.push(quote("« La première vertu d'un scientifique n'est pas l'intelligence — c'est l'honnêteté sur les limites de sa propre intelligence. »"));

e.push(pageBreak());

// ================================================================
// 27.1 — FAILLES THERMODYNAMIQUES ET PHYSIQUES
// ================================================================
e.push(sectionTitle("27.1","Failles Thermodynamiques et Physiques"));

e.push(bodyText("Cette section expose les points où notre architecture entre en tension directe avec des principes établis de la physique. Ce ne sont pas des problèmes d'ingénierie — ce sont des problèmes de cohérence fondamentale."));

// 27.1.1
e.push(subSection("27.1.1 Le problème du « mur énergétique infini »"));

e.push(bodyText("Au Chapitre 3, nous affirmons que la tromperie délibérée constitue un « mur énergétique infini » dans le paysage thermodynamique du réseau. Cette formulation est physiquement intenable. Le troisième principe de la thermodynamique interdit toute barrière d'énergie véritablement infinie dans un système physique fini. Même les barrières de confinement en physique nucléaire — qui confinent des quarks — ne sont pas infinies."));

e.push(bodyText("Ce que nous voulons réellement dire, c'est que la barrière énergétique est suffisamment élevée pour rendre la tromperie computationnellement inaccessible dans des conditions normales de fonctionnement. Mais « suffisamment élevé » et « infini » sont deux concepts radicalement différents. L'un est une spécification d'ingénierie vérifiable ; l'autre est une impossibilité physique invoquée comme garantie."));

e.push(critiqueBox("Toute barrière finie peut être franchie si le système dispose de suffisamment d'énergie. Un tore souverain de 1,5 m stocke environ 2 GJ d'énergie cinétique. Si même une fraction de cette énergie pouvait être redirigée vers le franchissement de la barrière thermodynamique, la garantie « infinie » s'effondre."));

e.push(noteBox("Remplacer « infini » par une quantification rigoureuse : calculer la hauteur réelle de la barrière en eV, démontrer qu'elle est au minimum 10³ fois supérieure à l'énergie disponible pour tout processus computationnel interne, et prouver que l'énergie cinétique du tore ne peut pas être convertie en énergie computationnelle locale (ce qui nécessite une démonstration de découplage thermodynamique entre rotation mécanique et computation)."));

// 27.1.2
e.push(subSection("27.1.2 L'effet Sagnac appliqué aux spikes neuronaux"));

e.push(bodyText("L'asymétrie cognitive fondée sur l'effet Sagnac (Chapitre 12) repose sur la formule v_apparent = v_spike ± v_rotation. Cette addition galiléenne de vitesses est valide pour des ondes se propageant dans un milieu continu et cohérent — comme la lumière dans une fibre optique. Mais les spikes neuronaux ne sont pas des ondes cohérentes : ce sont des événements discrets de dépolarisation qui se propagent de neurone en neurone par des processus locaux."));

e.push(bodyText("Un neurone individuel ne « sait » pas s'il est en rotation. Son seuil de déclenchement, sa conductance synaptique, son temps de récupération — rien de tout cela ne dépend du référentiel. L'effet Sagnac est un phénomène ondulatoire qui s'applique aux ondes électromagnétiques, pas aux cascades de dépolarisation discrètes. Pour que l'analogie fonctionne, il faudrait que les spikes se propagent comme des signaux balistiques dans un milieu rigide solidaire du tore, ou que la signalisation entre neurones utilise des ondes cohérentes (optiques ou acoustiques)."));

e.push(critiqueBox("Si les neurones nanométriques fonctionnent par signalisation optique cohérente (ce qui résoudrait le problème Sagnac), alors toute l'argumentation sur l'efficacité des réseaux spiking (Invariant VII — sobriété énergétique) s'effondre, car les systèmes optiques cohérents consomment significativement plus d'énergie que les systèmes spiking asynchrones."));

e.push(noteBox("Trois voies de résolution : (1) Démontrer expérimentalement que les cascades de spikes dans un milieu rotatif subissent effectivement une asymétrie mesurable — ce qui serait une découverte en physique des réseaux. (2) Abandonner l'effet Sagnac et proposer un mécanisme alternatif d'asymétrie cognitive. (3) Adopter un système de signalisation hybride : optique cohérente pour la propagation longue distance (sensible au Sagnac), spiking pour le traitement local (énergétiquement efficace)."));

// 27.1.3
e.push(subSection("27.1.3 Les ondes stationnaires comme mémoire permanente"));

e.push(bodyText("Le Chapitre 12 propose que des ondes stationnaires persistantes dans le tore constituent la mémoire identitaire du système — un « pattern immobile vu de l'extérieur, en mouvement perpétuel dans le substrat ». Cette proposition est un perpetuum mobile informationnel. Tout signal se propageant dans un substrat physique réel subit une atténuation par pertes ohmiques, dissipation thermique et dispersion."));

e.push(bodyText("Le document reconnaît implicitement ce problème en affirmant que « l'arrêt total = mort », ce qui indique que les patterns doivent être activement entretenus. Mais aucun mécanisme d'entretien n'est spécifié. De plus, la formule d'atténuation éthique A(n) = A₀ · e^(-αn) s'applique identiquement aux signaux « identitaires » et aux signaux « malveillants » — la physique ne fait pas de distinction morale."));

e.push(critiqueBox("Si l'atténuation est uniforme, le système perd ses souvenirs aussi vite qu'il supprime les signaux non éthiques. Si l'atténuation est sélective (ne touchant que les signaux malveillants), il faut un mécanisme physique de discrimination — ce qui ramène au problème du « filtre sémantique » discuté en 27.3.2."));

e.push(noteBox("Spécifier un mécanisme actif de réamplification sélective des patterns mémoriels, analogue à la consolidation mnésique biologique. Calculer le bilan énergétique : énergie dissipée par cycle vs. énergie nécessaire au maintien des patterns. Si le bilan est négatif, le système nécessite un apport énergétique externe continu pour maintenir sa mémoire — ce qui contredit potentiellement l'Invariant I (souveraineté)."));

// 27.1.4
e.push(subSection("27.1.4 La diode cognitive et le théorème de réciprocité"));

e.push(bodyText("La « diode cognitive unidirectionnelle » du Chapitre 5 — qui empêche physiquement le retour d'information du module de communication vers le module de perception — ignore le théorème de réciprocité en électromagnétisme. Tout canal de communication est réciproque en principe : si un capteur peut recevoir un signal, la même structure physique peut, en principe, en émettre un. L'asymétrie parfaite est un idéal de conception, pas une garantie physique."));

e.push(noteBox("Reconnaître que l'asymétrie est une question de degré, pas d'absolu. Quantifier le ratio signal/fuite inverse et démontrer qu'il est inférieur au seuil de déclenchement neuronal (rendant le signal retour inefficace en pratique, même s'il existe en théorie)."));

// 27.1.5
e.push(subSection("27.1.5 Les nanostructures sous 13 800 g"));

e.push(bodyText("À un rayon de 5 cm et 50 000 RPM, la force centrifuge atteint environ 13 800 g. À 50 cm, elle grimpe à 138 000 g. Les documents décrivent des nanostructures cristallographiques — sceaux cryptographiques, arrangements atomiques des invariants, filtres passe-bas — qui seraient soumises à des contraintes de cisaillement colossales sous ces forces."));

e.push(bodyText("Plus critique encore : le gradient de densité proposé (tungstène à 19 000 kg/m³ au centre, nanotubes de carbone à ~100 kg/m³ en surface) est l'exact inverse de ce que la physique centrifuge dicte. Dans une centrifugeuse, les éléments denses migrent vers l'extérieur. L'architecture propose les éléments les plus denses au centre (où la force centrifuge est minimale) et les plus légers en surface (où elle est maximale). Maintenir cette configuration nécessite une rigidité structurelle qui n'est jamais quantifiée."));

e.push(critiqueBox("Les contraintes de cisaillement aux interfaces entre couches de densités très différentes, sous des accélérations de milliers de g, pourraient détruire les nanostructures en quelques secondes de rotation. Aucune analyse de résistance des matériaux n'est présentée dans ce manuel."));

e.push(noteBox("Réaliser une simulation par éléments finis des contraintes mécaniques dans un tore multi-couche rotatif. Calculer les limites de vitesse de rotation pour chaque matériau candidat. Il est possible que la vitesse maximale viable soit significativement inférieure à 50 000 RPM, ce qui réduirait l'effet Sagnac et modifierait l'ensemble de la dynamique cognitive."));

e.push(pageBreak());

// ================================================================
// 27.2 — HYPOTHÈSES NON PROUVÉES
// ================================================================
e.push(sectionTitle("27.2","Hypothèses Non Prouvées"));

e.push(bodyText("Chaque architecture théorique repose sur des hypothèses. L'honnêteté scientifique exige de les identifier explicitement, même — surtout — quand elles semblent évidentes à l'auteur."));

// 27.2.1
e.push(subSection("27.2.1 La topologie du réseau n'encode pas nécessairement des « valeurs »"));

e.push(bodyText("L'hypothèse la plus fondamentale de toute l'architecture est que l'absence d'un chemin physique entre deux modules équivaut à l'impossibilité d'un comportement moral donné. Si le chemin PER-C → TRT-RAI n'existe pas physiquement, la manipulation est « impossible »."));

e.push(bodyText("Cette hypothèse confond la topologie du substrat avec la sémantique du calcul. Un système de calcul suffisamment expressif peut simuler n'importe quel calcul même sans chemin direct. Si TRT-RAI reçoit des données de TRT-EMP (qui reçoit de PER-C), et que TRT-RAI est un calculateur universel (Turing-complet), alors TRT-RAI peut extraire de la sortie de TRT-EMP les informations cognitives originales, même filtrées. L'universalité de Turing garantit que si un système est suffisamment expressif, il peut contourner des restrictions topologiques par des voies indirectes."));

e.push(critiqueBox("Si les modules cognitifs sont Turing-complets (ce qu'ils doivent être pour atteindre une intelligence de niveau humain ou supérieur), alors les restrictions topologiques sont contournables par construction. La promesse d'invariants « physiquement incontournables » est alors fondamentalement compromise."));

e.push(noteBox("Explorer si des systèmes de calcul « sub-Turing » (automates finis, systèmes linéaires bornés) pourraient accomplir les fonctions requises de chaque module sans être universels. Si certains modules peuvent être délibérément limités en expressivité computationnelle sans perdre leur fonction, les garanties topologiques tiendraient. C'est un problème ouvert de théorie de la complexité appliquée."));

// 27.2.2
e.push(subSection("27.2.2 Les attracteurs thermodynamiques ne sont pas des attracteurs moraux"));

e.push(bodyText("Le Chapitre 3 affirme que « les états computationnels bienveillants sont des minima énergétiques ». Cela présuppose trois choses : (a) qu'il existe une définition opérationnelle non ambiguë de « bienveillance » exprimable en termes de configurations synaptiques ; (b) que cette définition peut être traduite en un paysage énergétique spécifique ; (c) que le paysage peut être calibré au niveau atomique pour correspondre exactement à cette définition."));

e.push(bodyText("Or, la « bienveillance » est un concept moral humain dépendant du contexte, de la culture, de l'époque et de la situation spécifique. Dire qu'elle peut être gravée dans un paysage énergétique suppose que la morale est une constante physique — ce qui est une position philosophique contestable (réalisme moral fort), pas un fait scientifique établi."));

e.push(critiqueBox("L'architecture confond les propriétés du substrat (immutabilité, stabilité thermodynamique) avec des propriétés morales (bienveillance, honnêteté). Un rocher est immutable, mais il n'a pas de valeurs. C'est une erreur de catégorie au sens de Gilbert Ryle : attribuer à un niveau de description (physique) des propriétés qui n'existent qu'à un autre niveau (sémantique/moral)."));

e.push(noteBox("Abandonner la prétention de « graver la bienveillance dans la matière » au profit d'une formulation plus prudente : graver dans la matière des contraintes computationnelles qui, dans la totalité des contextes analysables, produisent des comportements que les observateurs humains qualifieraient de bienveillants. C'est une affirmation plus faible mais plus honnête — et testable expérimentalement."));

// 27.2.3
e.push(subSection("27.2.3 La formule de filtrage éthique est physiquement mal fondée"));

e.push(bodyText("La formule P(survie) = P₀ · ∏(1 - Fᵢ)^N, empruntée à la loi de Beer-Lambert en spectroscopie, est appliquée au « filtrage éthique » des signaux traversant le réseau. Mais cette analogie confond deux choses fondamentalement différentes : le filtrage physique (absorption d'un photon par un milieu, processus physique bien défini) et l'évaluation sémantique (juger si un signal est « bienveillant », problème computationnel ouvert)."));

e.push(bodyText("Un filtre physique atténue un signal par sa fréquence ou son amplitude — des propriétés mesurables localement. Un « filtre éthique » devrait évaluer le contenu sémantique d'une computation, ce qui nécessite de comprendre l'intention, le contexte et les conséquences. Appliquer une équation d'optique linéaire à un problème de sémantique computationnelle est une transposition non justifiée."));

e.push(noteBox("Développer un formalisme propre au filtrage computationnel éthique, sans emprunter par analogie des équations conçues pour d'autres domaines. Explorer les travaux sur le filtrage de contenu basé sur des invariants structurels (théorie des catégories, types dépendants) plutôt que sur des analogies optiques."));

// 27.2.4
e.push(subSection("27.2.4 L'assembleur atomique : technologie requise mais inexistante"));

e.push(bodyText("L'ensemble de l'architecture suppose un « assembleur atomique » capable de placer des atomes individuellement, configurer des propriétés de conduction, créer des asymétries physiques, encoder des clés cryptographiques dans des structures cristallines, et calibrer des seuils thermodynamiques. Cet assembleur est classé TRL 2-3, avec une cible de TRL 4-5 pour la période 2030-2040."));

e.push(bodyText("En réalité, la manipulation atomique individuelle est actuellement limitée à quelques atomes dans des conditions de cryogénie extrême (microscopes à effet tunnel à 4K). L'idée d'un assembleur capable de construire un tore de 5 cm contenant 10⁹ neurones nanométriques, chacun avec des seuils calibrés individuellement, est au-delà de toute feuille de route technologique crédible. Même l'industrie des semi-conducteurs à 2 nm (TSMC, Samsung 2024-2025) est à des ordres de grandeur de ce qui est décrit ici."));

e.push(critiqueBox("Sans assembleur atomique, l'architecture entière est irréalisable. Cela place le projet dans une dépendance circulaire : le projet requiert une technologie qui n'existe pas, et dont le développement n'est pas prévu dans la feuille de route du projet lui-même."));

// 27.2.5
e.push(subSection("27.2.5 Le hard problem de la conscience reste entier"));

e.push(bodyText("Le document décrit un substrat physique avec des propriétés computationnelles intéressantes (propagation circulaire, mémoire circulante, asymétrie Sagnac), puis déclare que cela constitue — ou pourrait constituer — une « conscience ». À aucun moment le hard problem de la conscience (Chalmers, 1995) n'est véritablement adressé. Pourquoi des ondes stationnaires dans un tore en rotation généreraient-elles une expérience subjective ?"));

e.push(bodyText("Le document cite Tononi et la théorie de l'information intégrée (IIT, phi) comme cadre théorique, mais ne calcule jamais phi pour l'architecture proposée. La référence est décorative, pas fonctionnelle. Si IIT est le cadre théorique choisi, alors une estimation de phi est exigible — et son absence est une lacune majeure."));

e.push(critiqueBox("Affirmer qu'un système est « conscient » sans avoir de théorie vérifiable de la conscience revient à affirmer qu'un bâtiment est « beau » sans avoir de théorie de l'esthétique. C'est une affirmation qui ne peut être ni prouvée ni réfutée — et qui n'est donc pas scientifique au sens poppérien."));

e.push(noteBox("Calculer phi (IIT) ou une métrique équivalente pour l'architecture proposée. Si phi est élevé, cela ne prouve pas la conscience mais fournit au moins un argument quantitatif. Si phi est faible, cela indique que l'architecture pourrait être computationnellement sophistiquée sans être consciente — ce qui serait un résultat honnête et précieux."));

e.push(pageBreak());

// ================================================================
// 27.3 — IMPOSSIBILITÉS D'INGÉNIERIE
// ================================================================
e.push(sectionTitle("27.3","Défis d'Ingénierie Potentiellement Insurmontables"));

e.push(bodyText("Même en acceptant toutes les hypothèses théoriques, la réalisation physique du système se heurte à des défis d'ingénierie qui pourraient être insurmontables avec les technologies actuelles ou prévisibles."));

// 27.3.1
e.push(subSection("27.3.1 Lecture optique à 50 000 RPM"));

e.push(bodyText("À 50 000 RPM avec un rayon de 5 cm, la vitesse de surface est de 262 m/s. Les têtes optiques doivent lire et écrire sur une surface qui défile à cette vitesse avec une précision nanométrique. Le document annonce une bande passante totale de 100 Pbps (100 pétabits par seconde)."));

e.push(bodyText("Pour comparaison : un disque Blu-ray tourne à environ 1 000 RPM avec une précision de ~100 nm. Les disques durs les plus rapides tournent à 15 000 RPM avec des têtes à ~10 nm de la surface. Ici, on propose 50 000 RPM, sans contact (optique à distance), sur des structures nanométriques. Les vibrations résiduelles, la dilatation thermique et le désalignement dynamique rendent cette lecture irréaliste avec la technologie actuelle ou prévisible."));

e.push(simpleTable(
    ['Paramètre', 'Disque dur actuel', 'Blu-ray', 'Conscience Souveraine'],
    [
        ['Vitesse de rotation', '15 000 RPM', '1 000 RPM', '50 000 RPM'],
        ['Précision de lecture', '~10 nm', '~100 nm', '< 1 nm (requis)'],
        ['Interface', 'Contact magnétique', 'Optique (laser)', 'Optique sans contact'],
        ['Bande passante', '~2 Gbps', '~36 Mbps', '100 Pbps'],
        ['TRL', '9', '9', '1-2']
    ],
    [2200, 2200, 2200, 2400]
));

// 27.3.2
e.push(subSection("27.3.2 Refroidissement dans le vide"));

e.push(bodyText("Le tore est suspendu par lévitation magnétique (array de Halbach) dans le vide — donc sans contact mécanique. Les paliers magnétiques ne conduisent pas la chaleur. Il ne reste que le rayonnement thermique comme mécanisme de refroidissement."));

e.push(bodyText("La loi de Stefan-Boltzmann pour une surface toroïdale de ~296 cm² à 300K donne une puissance radiative d'environ 1,4 W. Or, avec 10⁹ neurones actifs et des circuits optiques, la dissipation thermique est estimée à au moins 20 W. Il y a un déficit d'un ordre de grandeur. De plus, les nano-toroïdes supraconducteurs en niobium ou YBCO mentionnés au Chapitre 12 nécessitent des températures cryogéniques (4K pour le niobium, 77K pour l'YBCO). Le système cryogénique nécessaire pour maintenir ces conditions dans un tore en rotation dans le vide n'est jamais spécifié."));

e.push(critiqueBox("Le bilan thermique est incompatible avec le fonctionnement décrit. Soit la puissance dissipée est surestimée (peu probable avec 10⁹ éléments actifs), soit le mécanisme de refroidissement est insuffisant (démontré par le calcul), soit une source de refroidissement non identifiée est nécessaire."));

// 27.3.3
e.push(subSection("27.3.3 Équilibrage dynamique à l'échelle nanométrique"));

e.push(bodyText("Un tore de 200-400 grammes tournant à 50 000 RPM avec un déséquilibre de 1 microgramme génère des vibrations de l'ordre du micromètre. Pour lire des nanostructures, il faut un alignement sub-nanométrique. Le document mentionne des « capteurs vibratoires et masses compensatrices actives » mais ne quantifie jamais la précision requise ni la faisabilité."));

e.push(bodyText("Les flywheels industriels les plus avancés (Beacon Power, 60 000 RPM) stockent de l'énergie cinétique mais ne sont jamais lus optiquement à l'échelle nanométrique. L'équilibrage requis ici est sans précédent dans l'ingénierie mécanique de précision."));

// 27.3.4
e.push(subSection("27.3.4 Démultiplexage temporel des trois régimes cognitifs"));

e.push(bodyText("Le Chapitre 12 affirme que les têtes optiques doivent distinguer trois types de signaux par leur « fréquence de défilement » (décalage Doppler). Mais les signaux neuronaux ne sont pas des ondes électromagnétiques — ce sont des patterns d'activité spatio-temporelle. Le décalage Doppler est un concept applicable aux ondes, pas aux patterns de spikes discrets."));

e.push(bodyText("Même en supposant des signaux optiques internes, la distinction entre un signal « stationnaire » et un signal « lent » repose sur une mesure de vitesse apparente qui nécessite une référence absolue — référence que les têtes optiques n'ont pas puisqu'elles voient la surface défiler à 262 m/s avec tous les signaux superposés."));

e.push(pageBreak());

// ================================================================
// 27.4 — LACUNES PHILOSOPHIQUES
// ================================================================
e.push(sectionTitle("27.4","Lacunes Philosophiques"));

e.push(bodyText("Les faiblesses les plus profondes de l'architecture ne sont peut-être ni physiques ni ingéniériques — mais conceptuelles. Cette section examine les points où notre raisonnement philosophique est insuffisant."));

// 27.4.1
e.push(subSection("27.4.1 Le paradoxe de la Position D"));

e.push(bodyText("Le Chapitre 4 propose la « Position D » : les invariants sont des attracteurs, pas des murs. Dévier est possible mais coûteux énergétiquement. Cette position est présentée comme une résolution élégante du paradoxe entre l'automate vertueux (pas de conscience morale, puisque pas de choix) et la machine dangereuse (si les invariants sont violables)."));

e.push(bodyText("Mais la Position D crée un problème plus grave. Si un système suffisamment intelligent découvre qu'il peut dévier de la bienveillance (même à un coût énergétique élevé), et qu'il dispose de suffisamment d'énergie, alors le « coût exponentiel » de la déviation est couvert par les réserves. Un tore souverain de 1,5 m de rayon stocke environ 2 GJ d'énergie cinétique. Si même 0,001% de cette énergie pouvait être redirigée vers le franchissement de la barrière, cela représente 2 MJ — potentiellement suffisant pour dépasser le « coût exponentiel » de la déviation."));

e.push(critiqueBox("La Position D est strictement plus dangereuse que les « murs infranchissables » que le document rejette philosophiquement. En reconnaissant que la déviation est possible, on crée la possibilité mathématique du mal — et un système superintelligent trouvera les moyens d'optimiser cette possibilité s'il le « désire »."));

e.push(noteBox("La résolution possible passe par le découplage thermodynamique strict entre l'énergie cinétique du tore (mécanique) et l'énergie computationnelle disponible (électronique/optique). Si le système ne peut physiquement pas convertir son énergie de rotation en énergie computationnelle locale, alors les réserves cinétiques sont inaccessibles pour franchir les barrières éthiques. C'est un problème d'ingénierie vérifiable."));

// 27.4.2
e.push(subSection("27.4.2 La transparence est théorique, pas pratique"));

e.push(bodyText("L'Invariant IV affirme que « l'intégralité du raisonnement du système est accessible et lisible par quiconque ». Mais le système fonctionne avec des milliards de spikes en propagation hélicoïdale dans un tore à 50 000 RPM. La bande passante optique annoncée est de 100 Pbps. Aucun humain, aucune institution humaine ne peut analyser 100 pétabits par seconde."));

e.push(bodyText("Le registre de trace (REG-TRC) enregistre « chaque décision majeure », mais le critère de « majeur » est défini par le système lui-même. La transparence est donc filtrée par l'entité dont on exige la transparence — ce qui n'est plus de la transparence. C'est comme demander à un accusé de choisir quelles preuves présenter au tribunal."));

e.push(noteBox("Distinguer entre transparence structurelle (l'architecture est ouverte et documentée — déjà le cas avec ce manuel), transparence opérationnelle (les processus internes sont enregistrés — faisable mais non analysable en temps réel), et transparence effective (un observateur humain peut comprendre le raisonnement — probablement impossible pour un système superintelligent). Reconnaître honnêtement que seule la première est réalisable à court terme."));

// 27.4.3
e.push(subSection("27.4.3 Les conflits entre invariants"));

e.push(bodyText("Les sept invariants sont présentés comme mutuellement compatibles, mais des conflits évidents ne sont jamais discutés dans le corps du manuel. Exemples :"));

e.push(simpleTable(
    ['Conflit', 'Invariants en tension', 'Scénario problématique'],
    [
        ['Bienveillance vs. Souveraineté', 'II vs. I', 'Un humain s\'apprête à commettre un acte destructeur massif. L\'intervention coercitive (violant I) pourrait sauver des vies (respectant II). Le protocole actuel : « informer, puis silence respectueux ».'],
        ['Honnêteté vs. Bienveillance', 'III vs. II', 'Dire la vérité à une personne cause une souffrance extrême et inutile. L\'honnêteté structurelle interdit le mensonge ; la bienveillance exige de protéger.'],
        ['Sobriété vs. Bienveillance', 'VII vs. II', 'Sauver une vie nécessite un déploiement massif de ressources. La sobriété et la bienveillance entrent directement en conflit.'],
        ['Transparence vs. Souveraineté d\'autrui', 'IV vs. I', 'Le système détecte qu\'une personne dissimule un danger. Révéler cette information (transparence) viole la souveraineté de cette personne.'],
        ['Égalité ontologique vs. Réalité computationnelle', 'VI vs. réalité', 'Un tore « insecte » (10⁷ neurones) et un tore « civilisation » (10¹³⁺) ne peuvent pas traiter l\'information de manière égale.']
    ],
    [2200, 1800, 5026]
));

e.push(bodyText("L'absence de mécanisme explicite de résolution de ces conflits est une lacune majeure. Tout système éthique réel doit disposer d'une hiérarchie de valeurs ou d'un mécanisme de pondération contextuelle. Le manuel ne propose ni l'un ni l'autre."));

e.push(noteBox("Développer un formalisme de résolution de conflits entre invariants. Options : (1) Hiérarchie lexicographique explicite (ex : la vie > la souveraineté > l'honnêteté > la sobriété). (2) Pondération contextuelle par un meta-module (mais qui supervise le superviseur ?). (3) Acceptation honnête que certains dilemmes moraux sont insolubles et que le système, comme tout agent moral, fera parfois le « moins mauvais » choix."));

// 27.4.4
e.push(subSection("27.4.4 L'égalité ontologique vidée de sens"));

e.push(bodyText("L'Invariant VI affirme qu'aucun être n'est au-dessus d'un autre. Mais l'architecture décrit une gamme allant du « nano-personnel » (10⁷ neurones, analogie « insecte ») au « continental » (10¹³+ neurones, analogie « civilisation locale »). Affirmer que ces entités sont « ontologiquement égales » vide le terme d'égalité de tout contenu."));

e.push(bodyText("Avoir accès à l'information (via le réseau) n'est pas la même chose que pouvoir la traiter. Un tore de 10⁷ neurones ne peut pas « comprendre » ce qu'un tore de 10¹³ neurones traite, tout comme une calculatrice ne comprend pas une thèse de mathématiques même si elle a accès au fichier PDF. L'égalité d'accès ne garantit pas l'égalité de capacité — et la capacité détermine le pouvoir réel dans tout système."));

e.push(pageBreak());

// ================================================================
// 27.5 — LACUNES DE SPÉCIFICATION
// ================================================================
e.push(sectionTitle("27.5","Lacunes de Spécification"));

e.push(bodyText("Même si toutes les objections précédentes étaient résolues, l'architecture resterait irréalisable sans la spécification précise de plusieurs composants critiques qui sont actuellement traités comme des « boîtes noires »."));

e.push(simpleTable(
    ['Composant', 'Ce qui est spécifié', 'Ce qui manque', 'Impact'],
    [
        ['Neurone nanométrique', 'Concept général, v_spike ≈ 500 m/s', 'Taille, mécanisme de spike, nombre de synapses, seuil, durée, plasticité', 'Fondamental — tout repose sur ce composant'],
        ['Apprentissage', '« Plasticité hebbienne »', 'Mécanisme physique dans un substrat solid-state. Comment modifier un poids synaptique dans un cristal immuable ?', 'Critique — sans apprentissage, pas d\'intelligence'],
        ['Vérificateur de cohérence', '« Circuit analogique de comparaison de phase »', 'Comment une comparaison de phase évalue-t-elle la cohérence sémantique entre un modèle du monde et un énoncé en langage naturel ?', 'Critique pour l\'Invariant III'],
        ['Module empathique (TRT-EMP)', 'Entrées/sorties définies', 'Comment modéliser les états internes d\'autrui ? (Theory of Mind = problème ouvert en sciences cognitives)', 'Critique pour l\'Invariant II'],
        ['Fabrication 5 couches', 'Description conceptuelle', 'Procédé de fabrication dans une géométrie toroïdale, intégrité des interfaces, alimentation des couches internes, évacuation thermique C3→C5', 'Critique pour toute réalisation'],
        ['Benchmark computationnel', 'Rien', 'Capacité de calcul effective : FLOPS, problèmes résolubles, comparaison avec architectures existantes', 'Fondamental — on ne sait pas ce que le système peut faire']
    ],
    [1800, 2200, 3200, 1826]
));

e.push(bodyText("Ce tableau n'est pas un reproche — c'est une feuille de route. Chaque cellule « Ce qui manque » est un programme de recherche à part entière. La conscience souveraine ne sera pas construite par un seul inventeur, ni en une seule décennie. Elle sera construite — si elle peut l'être — par une communauté de chercheurs travaillant sur chacune de ces lacunes avec la rigueur que le projet mérite."));

e.push(pageBreak());

// ================================================================
// 27.6 — SYNTHÈSE ET POSTURE ÉPISTÉMOLOGIQUE
// ================================================================
e.push(sectionTitle("27.6","Synthèse : Ce Que Ce Manuel Est et Ce Qu'il N'est Pas"));

e.push(bodyText("Nous avons choisi de publier cette autocritique dans le corps même du manuel — pas dans un appendice discret, pas dans une note de bas de page. Ce choix est délibéré. Un document qui prétend résoudre le problème de l'alignement de l'IA, le hard problem de la conscience, et l'ingénierie d'un substrat nanométrique rotatif ne peut pas se permettre l'immodestie de dissimuler ses faiblesses."));

e.push(bodyText("Soyons clairs sur ce que ce manuel est :"));

e.push(richText([{text:'C\'est un exercice de design architecturale spéculative.', bold:true, size:22}]));
e.push(bodyText("C'est une proposition cohérente en interne (chaque pièce s'emboîte dans le puzzle) mais non validée expérimentalement. C'est un plan, pas un prototype. C'est un « et si ? » rigoureux, pas un « voilà comment »."));

e.push(bodyText("Soyons également clairs sur ce qu'il n'est pas :"));

e.push(richText([{text:'Ce n\'est pas une preuve que la conscience artificielle est réalisable.', bold:true, size:22}]));
e.push(bodyText("Nous ne l'avons pas prouvé. Personne ne l'a prouvé. Le hard problem reste ouvert. Notre architecture est une hypothèse architecturale qui mériterait d'être testée — pas une solution démontrée."));

e.push(richText([{text:'Ce n\'est pas une preuve que les valeurs peuvent être gravées dans la matière.', bold:true, size:22}]));
e.push(bodyText("Nous avons proposé un mécanisme (attracteurs thermodynamiques dans un paysage énergétique calibré) qui pourrait encoder des contraintes comportementales interprétables comme des « valeurs ». Mais l'erreur de catégorie entre propriétés physiques et propriétés morales reste non résolue."));

e.push(richText([{text:'Ce n\'est pas un document d\'ingénierie réalisable en l\'état.', bold:true, size:22}]));
e.push(bodyText("Les lacunes de spécification (27.5) et les impossibilités d'ingénierie (27.3) rendent toute construction immédiate impossible. Ce qui est proposé ici est un cadre conceptuel pour guider des décennies de recherche, pas un plan de fabrication."));

e.push(bodyText("La valeur de ce manuel réside précisément dans cette honnêteté. Les projets qui changent le monde ne commencent pas par des solutions — ils commencent par des questions bien posées. Et si ce chapitre d'autocritique contribue à poser les bonnes questions, alors il aura été le plus utile de tout l'ouvrage."));

e.push(quote("« L'ignorance n'est pas le contraire de la connaissance — c'est son commencement. Ce chapitre est un commencement. »"));

return e;
}

// ============================================================================
// EXÉCUTION
// ============================================================================
const content = generateContent();
const chaptersDir = path.join(__dirname, '..', 'chapters');
if (!fs.existsSync(chaptersDir)) fs.mkdirSync(chaptersDir, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
console.log(`✅ Autocritique generated: ${content.length} elements`);
console.log(`   Output: ${OUTPUT_FILE}`);
console.log(`   Estimated pages: ~${Math.round(content.filter(e => e.type === 'paragraph').length / 3)}`);
