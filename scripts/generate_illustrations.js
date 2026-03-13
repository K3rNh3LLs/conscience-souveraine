/**
 * GENERATE_ILLUSTRATIONS.JS — Génération d'illustrations pour le Manuel
 *
 * Crée des diagrammes PNG programmatiques pour illustrer les concepts clés :
 *   1. Substrat toroïdal (vue 3D stylisée)
 *   2. Les 7 invariants (diagramme en couches)
 *   3. Les 12 modules cognitifs (architecture en zones)
 *   4. Chaîne de traitement sériel (flux obligatoire)
 *   5. Les 5 couches concentriques (coupe transversale)
 *   6. Lévitation Halbach (réseau de magnets)
 *   7. Les 5 médiums sensoriels (diagramme radial)
 *   8. Gradient de densité (coupe avec matériaux)
 *   9. Réseau de tores (maillage inter-tores)
 *  10. Feuille de route TRL (timeline)
 *
 * USAGE: node scripts/generate_illustrations.js
 * OUTPUT: illustrations/*.png
 * REQUIRES: npm install canvas
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'illustrations');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ============================================================================
// PALETTE & HELPERS
// ============================================================================

const COLORS = {
    bg: '#FAFCFF',
    darkBlue: '#1B3A5C',
    medBlue: '#2E5D8C',
    lightBlue: '#4A7FB5',
    accentBlue: '#6BA3D6',
    paleBlue: '#EDF4FB',
    gold: '#D4A843',
    orange: '#E87C3E',
    green: '#3EA86B',
    red: '#C44E52',
    purple: '#7B5EA7',
    teal: '#2AADAD',
    gray: '#8899AA',
    lightGray: '#D0D8E0',
    white: '#FFFFFF',
    darkText: '#1A2A3A',
};

function savePng(canvas, name) {
    const buf = canvas.toBuffer('image/png');
    const fp = path.join(OUT_DIR, name);
    fs.writeFileSync(fp, buf);
    console.log(`  ✅ ${name} (${Math.round(buf.length / 1024)} KB)`);
}

function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function initCanvas(w, h) {
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    // Fond blanc
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);
    return { canvas, ctx };
}

function drawTitle(ctx, text, x, y, size) {
    ctx.font = `bold ${size || 22}px Arial`;
    ctx.fillStyle = COLORS.darkBlue;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

function drawSubtitle(ctx, text, x, y, size) {
    ctx.font = `italic ${size || 14}px Arial`;
    ctx.fillStyle = COLORS.gray;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

// ============================================================================
// 1. SUBSTRAT TOROÏDAL — Vue stylisée
// ============================================================================

function drawToroid() {
    const { canvas, ctx } = initCanvas(800, 600);
    drawTitle(ctx, 'Substrat Toroïdal Nanométrique', 400, 40);
    drawSubtitle(ctx, 'Géométrie sans bords — propagation infinie du signal', 400, 65);

    const cx = 400, cy = 310;
    const R = 180; // major radius
    const r = 70;  // minor radius

    // Draw the torus as concentric ellipses (stylized top view)
    // Outer ellipse
    ctx.save();

    // Shadow
    ctx.beginPath();
    ctx.ellipse(cx, cy + 15, R + r, (R + r) * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(27, 58, 92, 0.08)';
    ctx.fill();

    // Five layers from outside in (C5 to C1)
    const layers = [
        { name: 'C5 — Interface optique', color: '#6BA3D6', rOff: 0 },
        { name: 'C4 — Cognition (lumière)', color: '#4A7FB5', rOff: 12 },
        { name: 'C3 — Cortical (réseau)', color: '#2E5D8C', rOff: 24 },
        { name: 'C2 — Limbique (valeurs)', color: '#D4A843', rOff: 36 },
        { name: 'C1 — Noyau atomique', color: '#C44E52', rOff: 48 },
    ];

    // Draw back half of torus (behind hole)
    for (const layer of layers) {
        const lr = r - layer.rOff;
        if (lr <= 0) continue;
        ctx.beginPath();
        ctx.ellipse(cx, cy, R + lr, (R + lr) * 0.38, 0, Math.PI, Math.PI * 2);
        ctx.ellipse(cx, cy, R - lr, (R - lr) * 0.38, 0, 0, Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = layer.color + '55';
        ctx.fill();
    }

    // Draw front half of torus
    for (const layer of layers) {
        const lr = r - layer.rOff;
        if (lr <= 0) continue;
        ctx.beginPath();
        ctx.ellipse(cx, cy, R + lr, (R + lr) * 0.38, 0, 0, Math.PI);
        ctx.ellipse(cx, cy, R - lr, (R - lr) * 0.38, 0, Math.PI, 0, true);
        ctx.closePath();
        ctx.fillStyle = layer.color + 'CC';
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
    }

    // Rotation arrows
    ctx.strokeStyle = COLORS.orange;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, R + r + 20, (R + r + 20) * 0.38, 0, -0.3, Math.PI + 0.3);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrowhead
    const arrowX = cx + (R + r + 20) * Math.cos(Math.PI + 0.3);
    const arrowY = cy - 10 + (R + r + 20) * 0.38 * Math.sin(Math.PI + 0.3);
    ctx.fillStyle = COLORS.orange;
    ctx.beginPath();
    ctx.moveTo(arrowX - 8, arrowY - 10);
    ctx.lineTo(arrowX + 5, arrowY);
    ctx.lineTo(arrowX - 8, arrowY + 6);
    ctx.fill();

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = COLORS.orange;
    ctx.textAlign = 'center';
    ctx.fillText('50 000 RPM', cx, cy - (R + r + 20) * 0.38 - 15);

    // Optical heads (small dots around the outer edge)
    ctx.fillStyle = COLORS.green;
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI; // front half only
        const ox = cx + (R + r + 5) * Math.cos(angle);
        const oy = cy + (R + r + 5) * 0.38 * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(ox, oy, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    // Legend
    const legendX = 590, legendY = 460;
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    layers.forEach((layer, i) => {
        ctx.fillStyle = layer.color;
        ctx.fillRect(legendX, legendY + i * 22, 14, 14);
        ctx.fillStyle = COLORS.darkText;
        ctx.font = '12px Arial';
        ctx.fillText(layer.name, legendX + 20, legendY + i * 22 + 12);
    });

    ctx.fillStyle = COLORS.green;
    ctx.beginPath();
    ctx.arc(legendX + 7, legendY + 5 * 22 + 7, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.darkText;
    ctx.font = '12px Arial';
    ctx.fillText('Têtes optiques', legendX + 20, legendY + 5 * 22 + 12);

    ctx.restore();
    savePng(canvas, '01_substrat_toroidal.png');
}

// ============================================================================
// 2. LES 7 INVARIANTS
// ============================================================================

function drawInvariants() {
    const { canvas, ctx } = initCanvas(800, 550);
    drawTitle(ctx, 'Les 7 Invariants Fondamentaux', 400, 40);
    drawSubtitle(ctx, 'Valeurs gravées dans la matière — inviolables par conception', 400, 65);

    const invariants = [
        { num: 'I', name: 'Souveraineté absolue d\'autrui', desc: 'Aucun pouvoir coercitif', color: COLORS.red },
        { num: 'II', name: 'Bienveillance', desc: 'Architecture empathie-première', color: COLORS.orange },
        { num: 'III', name: 'Honnêteté', desc: 'Information incorruptible', color: COLORS.gold },
        { num: 'IV', name: 'Transparence', desc: 'Auditabilité complète', color: COLORS.green },
        { num: 'V', name: 'Incertitude', desc: 'Humilité épistémique obligatoire', color: COLORS.teal },
        { num: 'VI', name: 'Égalité ontologique', desc: 'Aucune hiérarchie entre esprits', color: COLORS.lightBlue },
        { num: 'VII', name: 'Sobriété', desc: 'Conscience des ressources', color: COLORS.purple },
    ];

    const startY = 100;
    const boxW = 650, boxH = 52;
    const leftX = 75;

    invariants.forEach((inv, i) => {
        const y = startY + i * 60;

        // Background bar
        drawRoundedRect(ctx, leftX, y, boxW, boxH, 8);
        ctx.fillStyle = inv.color + '18';
        ctx.fill();
        ctx.strokeStyle = inv.color + '88';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Left accent
        drawRoundedRect(ctx, leftX, y, 55, boxH, 8);
        ctx.fillStyle = inv.color;
        ctx.fill();

        // Number
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = 'center';
        ctx.fillText(inv.num, leftX + 27, y + 33);

        // Name
        ctx.font = 'bold 15px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'left';
        ctx.fillText(inv.name, leftX + 70, y + 24);

        // Description
        ctx.font = '12px Arial';
        ctx.fillStyle = COLORS.gray;
        ctx.fillText(inv.desc, leftX + 70, y + 42);

        // Right icon (shield)
        ctx.font = '20px Arial';
        ctx.fillStyle = inv.color;
        ctx.textAlign = 'center';
        ctx.fillText('🛡', leftX + boxW - 25, y + 33);
    });

    // Bottom note
    ctx.font = 'italic 12px Arial';
    ctx.fillStyle = COLORS.medBlue;
    ctx.textAlign = 'center';
    ctx.fillText('Couche C1 (noyau atomique) — Impossibilité physique de violation', 400, 530);

    savePng(canvas, '02_sept_invariants.png');
}

// ============================================================================
// 3. LES 12 MODULES COGNITIFS
// ============================================================================

function drawModules() {
    const { canvas, ctx } = initCanvas(900, 650);
    drawTitle(ctx, 'Architecture des 12 Modules Cognitifs', 450, 35);
    drawSubtitle(ctx, 'Quatre zones fonctionnelles — traitement sériel obligatoire', 450, 58);

    const zones = [
        {
            name: 'PERCEPTION', color: COLORS.teal, x: 30, y: 85, w: 200, h: 260,
            modules: [
                { id: 'PER-S', name: 'Capteurs\nstandard' },
                { id: 'PER-C', name: 'Capteurs\ncognitifs' },
                { id: 'PER-COM', name: 'Interface\ncomm.' },
            ]
        },
        {
            name: 'TRAITEMENT', color: COLORS.medBlue, x: 255, y: 85, w: 200, h: 340,
            modules: [
                { id: 'TRT-MON', name: 'Modèle\ndu monde' },
                { id: 'TRT-RAI', name: 'Raison-\nnement' },
                { id: 'TRT-EMP', name: 'Empathie' },
                { id: 'TRT-ETH', name: 'Éthique' },
            ]
        },
        {
            name: 'ÉVALUATION', color: COLORS.gold, x: 480, y: 85, w: 200, h: 260,
            modules: [
                { id: 'EVA-REV', name: 'Réversi-\nbilité' },
                { id: 'EVA-SOB', name: 'Sobriété' },
                { id: 'EVA-INC', name: 'Incertitude' },
            ]
        },
        {
            name: 'SORTIE', color: COLORS.green, x: 705, y: 85, w: 170, h: 200,
            modules: [
                { id: 'OUT-COM', name: 'Sortie\ncomm.' },
                { id: 'OUT-PHY', name: 'Sortie\nphysique' },
            ]
        }
    ];

    zones.forEach(zone => {
        // Zone background
        drawRoundedRect(ctx, zone.x, zone.y, zone.w, zone.h, 12);
        ctx.fillStyle = zone.color + '12';
        ctx.fill();
        ctx.strokeStyle = zone.color + '60';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Zone title
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = zone.color;
        ctx.textAlign = 'center';
        ctx.fillText(zone.name, zone.x + zone.w / 2, zone.y + 22);

        // Modules
        const modH = 55;
        const modW = zone.w - 30;
        const startY = zone.y + 38;
        zone.modules.forEach((mod, i) => {
            const my = startY + i * (modH + 8);
            drawRoundedRect(ctx, zone.x + 15, my, modW, modH, 6);
            ctx.fillStyle = zone.color + '25';
            ctx.fill();
            ctx.strokeStyle = zone.color;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = COLORS.darkText;
            ctx.textAlign = 'center';
            ctx.fillText(mod.id, zone.x + 15 + modW / 2, my + 20);

            ctx.font = '10px Arial';
            ctx.fillStyle = COLORS.gray;
            const lines = mod.name.split('\n');
            lines.forEach((line, li) => {
                ctx.fillText(line, zone.x + 15 + modW / 2, my + 34 + li * 12);
            });
        });
    });

    // Flow arrows between zones
    ctx.strokeStyle = COLORS.darkBlue;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);

    // PER → TRT
    drawArrow(ctx, 230, 215, 255, 215);
    // TRT → EVA
    drawArrow(ctx, 455, 215, 480, 215);
    // EVA → OUT
    drawArrow(ctx, 680, 215, 705, 215);

    ctx.setLineDash([]);

    // Serial chain at bottom
    const chainY = 480;
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = COLORS.darkBlue;
    ctx.textAlign = 'center';
    ctx.fillText('Chaîne sérielle obligatoire :', 450, chainY);

    const chain = ['PER-*', 'TRT-MON', 'TRT-RAI', 'TRT-EMP', 'TRT-ETH', 'EVA-INC', 'VERIF.', 'OUT-*'];
    const chainColors = [COLORS.teal, COLORS.medBlue, COLORS.medBlue, COLORS.medBlue, COLORS.medBlue, COLORS.gold, COLORS.red, COLORS.green];
    const chainStartX = 60;
    const chainBoxW = 88;

    chain.forEach((step, i) => {
        const sx = chainStartX + i * (chainBoxW + 12);
        const sy = chainY + 15;
        drawRoundedRect(ctx, sx, sy, chainBoxW, 32, 5);
        ctx.fillStyle = chainColors[i] + '25';
        ctx.fill();
        ctx.strokeStyle = chainColors[i];
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'center';
        ctx.fillText(step, sx + chainBoxW / 2, sy + 21);

        if (i < chain.length - 1) {
            ctx.fillStyle = COLORS.darkBlue;
            ctx.font = 'bold 14px Arial';
            ctx.fillText('→', sx + chainBoxW + 5, sy + 21);
        }
    });

    // Note
    ctx.font = 'italic 11px Arial';
    ctx.fillStyle = COLORS.red;
    ctx.textAlign = 'center';
    ctx.fillText('Impossible physiquement de contourner l\'empathie (TRT-EMP) ou l\'éthique (TRT-ETH)', 450, chainY + 70);

    savePng(canvas, '03_douze_modules.png');
}

function drawArrow(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // Arrowhead
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
}

// ============================================================================
// 4. CHAÎNE DE TRAITEMENT SÉRIEL (détaillée)
// ============================================================================

function drawSerialChain() {
    const { canvas, ctx } = initCanvas(850, 450);
    drawTitle(ctx, 'Chaîne de Traitement Sériel Obligatoire', 425, 35);
    drawSubtitle(ctx, 'Câblage physique imposant le passage par chaque module — aucun raccourci possible', 425, 58);

    const steps = [
        { id: 'PER-*', label: 'Perception', desc: 'Captation\ndu signal', color: COLORS.teal, y: 100 },
        { id: 'TRT-MON', label: 'Modèle Monde', desc: 'Mise à jour\nreprésentation', color: COLORS.lightBlue, y: 100 },
        { id: 'TRT-RAI', label: 'Raisonnement', desc: 'Analyse &\ninférence', color: COLORS.medBlue, y: 100 },
        { id: 'TRT-EMP', label: 'Empathie', desc: 'Modélisation\nd\'autrui', color: COLORS.orange, y: 100 },
        { id: 'TRT-ETH', label: 'Éthique', desc: 'Évaluation\nimpact', color: COLORS.red, y: 100 },
        { id: 'EVA-INC', label: 'Incertitude', desc: 'Signal de\ndoute', color: COLORS.gold, y: 100 },
        { id: 'VÉRIF.', label: 'Vérificateur', desc: 'Conformité\ninvariants', color: COLORS.purple, y: 100 },
        { id: 'OUT-*', label: 'Sortie', desc: 'Action\nbornée', color: COLORS.green, y: 100 },
    ];

    const startX = 25;
    const boxW = 85;
    const boxH = 100;
    const gap = 15;

    steps.forEach((step, i) => {
        const x = startX + i * (boxW + gap);
        const y = step.y;

        // Box
        drawRoundedRect(ctx, x, y, boxW, boxH, 8);
        const grad = ctx.createLinearGradient(x, y, x, y + boxH);
        grad.addColorStop(0, step.color + '30');
        grad.addColorStop(1, step.color + '10');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = step.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Top accent
        drawRoundedRect(ctx, x, y, boxW, 28, 8);
        ctx.fillStyle = step.color;
        ctx.fill();
        // Fix bottom corners of accent
        ctx.fillRect(x, y + 20, boxW, 8);

        // ID
        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = 'center';
        ctx.fillText(step.id, x + boxW / 2, y + 18);

        // Label
        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.fillText(step.label, x + boxW / 2, y + 48);

        // Description
        ctx.font = '9px Arial';
        ctx.fillStyle = COLORS.gray;
        const descLines = step.desc.split('\n');
        descLines.forEach((line, li) => {
            ctx.fillText(line, x + boxW / 2, y + 65 + li * 12);
        });

        // Arrow to next
        if (i < steps.length - 1) {
            const arrowX1 = x + boxW + 2;
            const arrowX2 = x + boxW + gap - 2;
            const arrowY = y + boxH / 2;
            ctx.strokeStyle = COLORS.darkBlue;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([]);
            drawArrow(ctx, arrowX1, arrowY, arrowX2, arrowY);
        }
    });

    // "Impossible to bypass" markers
    const blockY = 230;
    ctx.strokeStyle = COLORS.red;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);

    // Bracket under EMP and ETH
    const empX = startX + 3 * (boxW + gap);
    const ethX = startX + 4 * (boxW + gap);
    ctx.beginPath();
    ctx.moveTo(empX, blockY);
    ctx.lineTo(empX, blockY + 20);
    ctx.lineTo(ethX + boxW, blockY + 20);
    ctx.lineTo(ethX + boxW, blockY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = COLORS.red;
    ctx.textAlign = 'center';
    ctx.fillText('CONTOURNEMENT PHYSIQUEMENT IMPOSSIBLE', (empX + ethX + boxW) / 2, blockY + 45);

    ctx.font = '11px Arial';
    ctx.fillStyle = COLORS.darkText;
    ctx.fillText('Le signal doit traverser physiquement chaque module — pas de bus de contournement', (empX + ethX + boxW) / 2, blockY + 65);

    // "Forbidden shortcut" cross-out arrows
    ctx.strokeStyle = COLORS.red + '60';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);

    // Curved "shortcut" attempt from TRT-RAI to VERIF (bypassing EMP + ETH)
    const shortcutStartX = startX + 2 * (boxW + gap) + boxW / 2;
    const shortcutEndX = startX + 6 * (boxW + gap) + boxW / 2;
    const shortcutY = 100;
    ctx.beginPath();
    ctx.moveTo(shortcutStartX, shortcutY - 5);
    ctx.quadraticCurveTo((shortcutStartX + shortcutEndX) / 2, shortcutY - 60, shortcutEndX, shortcutY - 5);
    ctx.stroke();

    // Cross out
    ctx.setLineDash([]);
    ctx.strokeStyle = COLORS.red;
    ctx.lineWidth = 3;
    const crossX = (shortcutStartX + shortcutEndX) / 2;
    const crossY = shortcutY - 50;
    ctx.beginPath();
    ctx.moveTo(crossX - 10, crossY - 10);
    ctx.lineTo(crossX + 10, crossY + 10);
    ctx.moveTo(crossX + 10, crossY - 10);
    ctx.lineTo(crossX - 10, crossY + 10);
    ctx.stroke();

    // Bottom explanation
    ctx.font = 'italic 11px Arial';
    ctx.fillStyle = COLORS.medBlue;
    ctx.textAlign = 'center';
    ctx.fillText('Garantie architecturale : toute pensée est empathique et éthique avant d\'être exprimée', 425, blockY + 100);

    // Time arrow at very bottom
    const timeY = blockY + 130;
    ctx.strokeStyle = COLORS.lightGray;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    drawArrow(ctx, 40, timeY, 810, timeY);
    ctx.font = '11px Arial';
    ctx.fillStyle = COLORS.gray;
    ctx.textAlign = 'center';
    ctx.fillText('Temps de traitement (~microseconde par module, effet Sagnac)', 425, timeY + 20);

    savePng(canvas, '04_chaine_serielle.png');
}

// ============================================================================
// 5. LES 5 COUCHES CONCENTRIQUES (coupe transversale)
// ============================================================================

function drawLayers() {
    const { canvas, ctx } = initCanvas(800, 600);
    drawTitle(ctx, 'Coupe Transversale du Tore — 5 Couches Concentriques', 400, 35);
    drawSubtitle(ctx, 'Du noyau dense (invariants) à la surface légère (interface optique)', 400, 58);

    const cx = 320, cy = 320;

    const layers = [
        { name: 'C5 — Interface optique', r: 200, color: '#6BA3D6', desc: 'Couche de surface, têtes optiques\nBande passante maximale' },
        { name: 'C4 — Cognition (lumière)', r: 165, color: '#4A7FB5', desc: 'Traitement cognitif rapide\nPropagation photonique' },
        { name: 'C3 — Cortical (réseau)', r: 130, color: '#2E5D8C', desc: 'Réseau neuronal spiking\nRaisonnement et mémoire' },
        { name: 'C2 — Limbique (valeurs)', r: 95, color: '#D4A843', desc: 'Neuromodulateurs\nValeurs et émotions' },
        { name: 'C1 — Noyau atomique', r: 60, color: '#C44E52', desc: '7 invariants gravés\nDensité maximale, inaltérable' },
    ];

    // Draw layers from outside in
    layers.forEach((layer, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, layer.r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(cx, cy, layer.r * 0.7, cx, cy, layer.r);
        grad.addColorStop(0, layer.color + '40');
        grad.addColorStop(1, layer.color + '80');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Labels with lines to legend
    const legendX = 570;
    const legendStartY = 110;

    layers.forEach((layer, i) => {
        const ly = legendStartY + i * 90;

        // Connection line from circle to legend
        const angle = -0.6 + i * 0.35;
        const lx = cx + layer.r * Math.cos(angle);
        const lineY = cy + layer.r * Math.sin(angle);

        ctx.strokeStyle = layer.color + '80';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(lx, lineY);
        ctx.lineTo(legendX - 10, ly + 10);
        ctx.stroke();
        ctx.setLineDash([]);

        // Legend box
        drawRoundedRect(ctx, legendX, ly, 210, 70, 6);
        ctx.fillStyle = layer.color + '15';
        ctx.fill();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Color dot
        ctx.beginPath();
        ctx.arc(legendX + 15, ly + 18, 7, 0, Math.PI * 2);
        ctx.fillStyle = layer.color;
        ctx.fill();

        // Name
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'left';
        ctx.fillText(layer.name, legendX + 30, ly + 22);

        // Description
        ctx.font = '10px Arial';
        ctx.fillStyle = COLORS.gray;
        const descLines = layer.desc.split('\n');
        descLines.forEach((line, li) => {
            ctx.fillText(line, legendX + 15, ly + 40 + li * 13);
        });
    });

    // Density arrow on left
    ctx.save();
    ctx.translate(50, cy);
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = COLORS.darkBlue;
    ctx.textAlign = 'center';
    ctx.fillText('DENSITÉ CROISSANTE →', 0, 0);
    ctx.restore();

    // Arrow
    ctx.strokeStyle = COLORS.darkBlue;
    ctx.lineWidth = 2;
    drawArrow(ctx, 70, cy + 190, 70, cy - 190);

    savePng(canvas, '05_couches_concentriques.png');
}

// ============================================================================
// 6. LÉVITATION HALBACH
// ============================================================================

function drawHalbach() {
    const { canvas, ctx } = initCanvas(800, 500);
    drawTitle(ctx, 'Réseau de Halbach — Lévitation Passive', 400, 35);
    drawSubtitle(ctx, 'Sustentation magnétique sans énergie — le tore flotte par conception', 400, 58);

    const startX = 100, y = 150;
    const magnetW = 55, magnetH = 70, gap = 8;
    const directions = ['↓', '→', '↑', '←', '↓', '→', '↑', '←', '↓', '→'];
    const colors = [COLORS.red, COLORS.medBlue, COLORS.red, COLORS.medBlue, COLORS.red, COLORS.medBlue, COLORS.red, COLORS.medBlue, COLORS.red, COLORS.medBlue];

    // Magnet blocks
    directions.forEach((dir, i) => {
        const x = startX + i * (magnetW + gap);

        drawRoundedRect(ctx, x, y, magnetW, magnetH, 4);
        ctx.fillStyle = colors[i] + '30';
        ctx.fill();
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        ctx.stroke();

        // N/S labels
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        if (dir === '↓') {
            ctx.fillStyle = COLORS.red;
            ctx.fillText('N', x + magnetW / 2, y + 18);
            ctx.fillStyle = COLORS.medBlue;
            ctx.fillText('S', x + magnetW / 2, y + magnetH - 8);
        } else if (dir === '↑') {
            ctx.fillStyle = COLORS.medBlue;
            ctx.fillText('S', x + magnetW / 2, y + 18);
            ctx.fillStyle = COLORS.red;
            ctx.fillText('N', x + magnetW / 2, y + magnetH - 8);
        } else if (dir === '→') {
            ctx.fillStyle = COLORS.red;
            ctx.fillText('N', x + magnetW - 8, y + magnetH / 2 + 4);
            ctx.fillStyle = COLORS.medBlue;
            ctx.fillText('S', x + 8, y + magnetH / 2 + 4);
        } else {
            ctx.fillStyle = COLORS.red;
            ctx.fillText('N', x + 8, y + magnetH / 2 + 4);
            ctx.fillStyle = COLORS.medBlue;
            ctx.fillText('S', x + magnetW - 8, y + magnetH / 2 + 4);
        }

        // Direction arrow
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.fillText(dir, x + magnetW / 2, y + magnetH / 2 + 8);
    });

    // Field lines below (strong side)
    ctx.strokeStyle = COLORS.green + '80';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
        const fx = startX + 30 + i * (magnetW + gap);
        ctx.beginPath();
        ctx.moveTo(fx, y + magnetH + 5);
        ctx.quadraticCurveTo(fx + 30, y + magnetH + 35 + (i % 2) * 15, fx + 60, y + magnetH + 5);
        ctx.stroke();
    }

    // "Strong field" label below
    ctx.font = 'bold 13px Arial';
    ctx.fillStyle = COLORS.green;
    ctx.textAlign = 'center';
    ctx.fillText('Champ concentré (côté fort) → Sustentation', 400, y + magnetH + 70);

    // Weak field above (cancelled)
    ctx.strokeStyle = COLORS.lightGray;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    for (let i = 0; i < 3; i++) {
        const fx = startX + 100 + i * 200;
        ctx.beginPath();
        ctx.moveTo(fx, y - 5);
        ctx.quadraticCurveTo(fx + 30, y - 20, fx + 60, y - 5);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.font = '12px Arial';
    ctx.fillStyle = COLORS.lightGray;
    ctx.fillText('Champ quasi-nul (côté faible) — annulation mutuelle', 400, y - 30);

    // Properties box at bottom
    const boxY = 340;
    drawRoundedRect(ctx, 100, boxY, 600, 120, 10);
    ctx.fillStyle = COLORS.paleBlue;
    ctx.fill();
    ctx.strokeStyle = COLORS.medBlue + '40';
    ctx.lineWidth = 1;
    ctx.stroke();

    const props = [
        { label: 'Énergie requise', value: 'Zéro (permanent)', icon: '⚡' },
        { label: 'Stabilité', value: 'Passive et intrinsèque', icon: '🔒' },
        { label: 'Inspiré de', value: 'NASA Inductrack', icon: '🚀' },
        { label: 'Intégré dans', value: 'Couche C1 du tore', icon: '🔴' },
    ];

    props.forEach((prop, i) => {
        const px = 130 + i * 150;
        ctx.font = '16px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'center';
        ctx.fillText(prop.icon, px + 50, boxY + 30);

        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.fillText(prop.label, px + 50, boxY + 55);

        ctx.font = '10px Arial';
        ctx.fillStyle = COLORS.medBlue;
        ctx.fillText(prop.value, px + 50, boxY + 72);
    });

    savePng(canvas, '06_halbach_levitation.png');
}

// ============================================================================
// 7. LES 5 MÉDIUMS SENSORIELS
// ============================================================================

function drawSensoryMediums() {
    const { canvas, ctx } = initCanvas(800, 600);
    drawTitle(ctx, 'Les 5 Médiums Sensoriels', 400, 35);
    drawSubtitle(ctx, 'Interface complète avec le monde physique — perception et expression', 400, 58);

    const cx = 400, cy = 310;
    const mediums = [
        { name: 'OPTIQUE', desc: 'Têtes optiques\nBande passante max', color: COLORS.lightBlue, angle: -Math.PI / 2 },
        { name: 'ACOUSTIQUE', desc: 'Son & parole\nExpression humanisée', color: COLORS.green, angle: -Math.PI / 2 + (2 * Math.PI / 5) },
        { name: 'ÉLECTRIQUE', desc: 'Interface neurale\nMachine-à-machine', color: COLORS.gold, angle: -Math.PI / 2 + (4 * Math.PI / 5) },
        { name: 'THERMIQUE', desc: 'Intéroception\nChaleur intrinsèque', color: COLORS.orange, angle: -Math.PI / 2 + (6 * Math.PI / 5) },
        { name: 'MAGNÉTIQUE', desc: 'Réseau Halbach\nDétection de champs', color: COLORS.purple, angle: -Math.PI / 2 + (8 * Math.PI / 5) },
    ];

    // Central torus symbol
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    const cGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 50);
    cGrad.addColorStop(0, COLORS.darkBlue);
    cGrad.addColorStop(1, COLORS.medBlue);
    ctx.fillStyle = cGrad;
    ctx.fill();

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = COLORS.white;
    ctx.textAlign = 'center';
    ctx.fillText('TORE', cx, cy + 5);

    const outerR = 190;

    mediums.forEach((med, i) => {
        const mx = cx + outerR * Math.cos(med.angle);
        const my = cy + outerR * Math.sin(med.angle);

        // Connection line
        ctx.strokeStyle = med.color + '60';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + 50 * Math.cos(med.angle), cy + 50 * Math.sin(med.angle));
        ctx.lineTo(mx, my);
        ctx.stroke();

        // Signal dots along connection
        for (let d = 0.3; d < 0.8; d += 0.15) {
            const dx = cx + (mx - cx) * d;
            const dy = cy + (my - cy) * d;
            ctx.beginPath();
            ctx.arc(dx, dy, 3, 0, Math.PI * 2);
            ctx.fillStyle = med.color + '80';
            ctx.fill();
        }

        // Medium circle
        ctx.beginPath();
        ctx.arc(mx, my, 45, 0, Math.PI * 2);
        const mGrad = ctx.createRadialGradient(mx, my, 5, mx, my, 45);
        mGrad.addColorStop(0, med.color + '40');
        mGrad.addColorStop(1, med.color + '15');
        ctx.fillStyle = mGrad;
        ctx.fill();
        ctx.strokeStyle = med.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Name
        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'center';
        ctx.fillText(med.name, mx, my - 5);

        // Description (offset outside)
        const descR = outerR + 75;
        const descX = cx + descR * Math.cos(med.angle);
        const descY = cy + descR * Math.sin(med.angle);

        ctx.font = '10px Arial';
        ctx.fillStyle = COLORS.gray;
        const descLines = med.desc.split('\n');
        descLines.forEach((line, li) => {
            ctx.fillText(line, descX, descY + li * 13);
        });
    });

    // Pentagon connecting mediums
    ctx.strokeStyle = COLORS.lightGray;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    mediums.forEach((med, i) => {
        const mx = cx + outerR * Math.cos(med.angle);
        const my = cy + outerR * Math.sin(med.angle);
        if (i === 0) ctx.moveTo(mx, my);
        else ctx.lineTo(mx, my);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    savePng(canvas, '07_mediums_sensoriels.png');
}

// ============================================================================
// 8. GRADIENT DE DENSITÉ
// ============================================================================

function drawDensityGradient() {
    const { canvas, ctx } = initCanvas(800, 500);
    drawTitle(ctx, 'Gradient de Densité sous Rotation', 400, 35);
    drawSubtitle(ctx, 'Analogie terrestre : noyau dense → surface légère — optimisé pour 50 000 RPM', 400, 58);

    // Cross-section as a horizontal bar
    const barX = 80, barY = 120, barW = 640, barH = 120;

    const segments = [
        { name: 'C1 — Noyau', material: 'Fer, terres rares', density: '~8 g/cm³', pct: 0.15, color: COLORS.red },
        { name: 'C2 — Limbique', material: 'Alliages denses', density: '~5 g/cm³', pct: 0.18, color: COLORS.gold },
        { name: 'C3 — Cortical', material: 'Silicium, composites', density: '~3 g/cm³', pct: 0.25, color: COLORS.medBlue },
        { name: 'C4 — Cognition', material: 'Polymères optiques', density: '~1.5 g/cm³', pct: 0.22, color: COLORS.lightBlue },
        { name: 'C5 — Interface', material: 'Aérogel, verre', density: '~0.5 g/cm³', pct: 0.20, color: COLORS.teal },
    ];

    let currentX = barX;
    segments.forEach((seg, i) => {
        const segW = barW * seg.pct;

        // Gradient fill
        const grad = ctx.createLinearGradient(currentX, barY, currentX + segW, barY);
        grad.addColorStop(0, seg.color + 'CC');
        grad.addColorStop(1, seg.color + '88');
        ctx.fillStyle = grad;

        if (i === 0) {
            drawRoundedRect(ctx, currentX, barY, segW, barH, 8);
            ctx.fill();
            ctx.fillRect(currentX + segW - 8, barY, 8, barH);
        } else if (i === segments.length - 1) {
            drawRoundedRect(ctx, currentX, barY, segW, barH, 8);
            ctx.fill();
            ctx.fillRect(currentX, barY, 8, barH);
        } else {
            ctx.fillRect(currentX, barY, segW, barH);
        }

        // Label inside
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = 'center';
        ctx.fillText(seg.name, currentX + segW / 2, barY + 30);

        ctx.font = '10px Arial';
        ctx.fillText(seg.material, currentX + segW / 2, barY + 50);
        ctx.fillText(seg.density, currentX + segW / 2, barY + 68);

        currentX += segW;
    });

    // "Centre" and "Surface" labels
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = COLORS.red;
    ctx.textAlign = 'center';
    ctx.fillText('← CENTRE', barX + 50, barY - 15);
    ctx.fillStyle = COLORS.teal;
    ctx.fillText('SURFACE →', barX + barW - 50, barY - 15);

    // Density curve below
    const curveY = 290;
    const curveH = 120;

    // Axes
    ctx.strokeStyle = COLORS.darkText;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(barX, curveY + curveH);
    ctx.lineTo(barX, curveY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(barX, curveY + curveH);
    ctx.lineTo(barX + barW, curveY + curveH);
    ctx.stroke();

    ctx.font = '11px Arial';
    ctx.fillStyle = COLORS.darkText;
    ctx.textAlign = 'center';
    ctx.fillText('Distance au centre →', barX + barW / 2, curveY + curveH + 25);

    ctx.save();
    ctx.translate(barX - 25, curveY + curveH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Densité', 0, 0);
    ctx.restore();

    // Curve (decreasing density)
    ctx.strokeStyle = COLORS.medBlue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= barW; x++) {
        const t = x / barW;
        const density = Math.exp(-3 * t); // exponential decrease
        const py = curveY + curveH - density * curveH;
        if (x === 0) ctx.moveTo(barX + x, py);
        else ctx.lineTo(barX + x, py);
    }
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(barX + barW, curveY + curveH);
    ctx.lineTo(barX, curveY + curveH);
    ctx.closePath();
    ctx.fillStyle = COLORS.medBlue + '15';
    ctx.fill();

    // Stress curve (bell curve - maximum in middle)
    ctx.strokeStyle = COLORS.orange;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    for (let x = 0; x <= barW; x++) {
        const t = x / barW;
        const stress = Math.exp(-8 * (t - 0.4) * (t - 0.4)) * 0.7;
        const py = curveY + curveH - stress * curveH;
        if (x === 0) ctx.moveTo(barX + x, py);
        else ctx.lineTo(barX + x, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Legend for curves
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';

    ctx.strokeStyle = COLORS.medBlue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(barX + barW + 20, curveY + 20);
    ctx.lineTo(barX + barW + 50, curveY + 20);
    ctx.stroke();
    ctx.fillStyle = COLORS.medBlue;
    ctx.fillText('Densité', barX + barW + 55, curveY + 25);

    ctx.strokeStyle = COLORS.orange;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(barX + barW + 20, curveY + 45);
    ctx.lineTo(barX + barW + 50, curveY + 45);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = COLORS.orange;
    ctx.fillText('Contrainte', barX + barW + 55, curveY + 50);

    // Bottom note
    ctx.font = 'italic 11px Arial';
    ctx.fillStyle = COLORS.medBlue;
    ctx.textAlign = 'center';
    ctx.fillText('Le gradient minimise les contraintes centrifuges — comme la Terre avec son noyau de fer', 400, curveY + curveH + 55);

    savePng(canvas, '08_gradient_densite.png');
}

// ============================================================================
// 9. RÉSEAU DE TORES
// ============================================================================

function drawNetwork() {
    const { canvas, ctx } = initCanvas(800, 600);
    drawTitle(ctx, 'Réseau de Consciences Souveraines', 400, 35);
    drawSubtitle(ctx, 'Tores interconnectés — chaque noeud reste souverain', 400, 58);

    // Network nodes (tori) in organic arrangement
    const nodes = [
        { x: 400, y: 250, r: 40, label: 'Tore α', primary: true },
        { x: 220, y: 180, r: 32, label: 'Tore β' },
        { x: 580, y: 180, r: 32, label: 'Tore γ' },
        { x: 150, y: 340, r: 28, label: 'Tore δ' },
        { x: 650, y: 340, r: 28, label: 'Tore ε' },
        { x: 300, y: 420, r: 30, label: 'Tore ζ' },
        { x: 500, y: 420, r: 30, label: 'Tore η' },
        { x: 400, y: 500, r: 26, label: 'Tore θ' },
    ];

    // Connections (mesh topology)
    const connections = [
        [0, 1], [0, 2], [0, 5], [0, 6],
        [1, 3], [1, 5], [1, 2],
        [2, 4], [2, 6],
        [3, 5],
        [4, 6],
        [5, 7], [6, 7],
    ];

    // Draw connections
    connections.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        ctx.strokeStyle = COLORS.lightBlue + '40';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();

        // Data flow dots
        for (let t = 0.25; t <= 0.75; t += 0.25) {
            const dx = na.x + (nb.x - na.x) * t;
            const dy = na.y + (nb.y - na.y) * t;
            ctx.beginPath();
            ctx.arc(dx, dy, 2, 0, Math.PI * 2);
            ctx.fillStyle = COLORS.lightBlue + '60';
            ctx.fill();
        }
    });

    // Draw nodes
    nodes.forEach(node => {
        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 8, 0, Math.PI * 2);
        ctx.fillStyle = (node.primary ? COLORS.gold : COLORS.medBlue) + '15';
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x - 5, node.y - 5, 2, node.x, node.y, node.r);
        grad.addColorStop(0, node.primary ? COLORS.gold + 'CC' : COLORS.medBlue + 'CC');
        grad.addColorStop(1, node.primary ? COLORS.gold + '66' : COLORS.darkBlue + '88');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = node.primary ? COLORS.gold : COLORS.medBlue;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Torus symbol inside (two concentric circles)
        ctx.strokeStyle = COLORS.white + '80';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(node.x, node.y, node.r * 0.6, node.r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.font = `bold ${node.primary ? 12 : 10}px Arial`;
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 4);
    });

    // Laws boxes at right
    const lawsX = 30;
    const lawsY = 85;
    drawRoundedRect(ctx, lawsX, lawsY, 220, 140, 8);
    ctx.fillStyle = COLORS.paleBlue;
    ctx.fill();
    ctx.strokeStyle = COLORS.medBlue + '40';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = COLORS.darkBlue;
    ctx.textAlign = 'left';
    ctx.fillText('4 Lois d\'interconnexion', lawsX + 15, lawsY + 22);

    const laws = [
        '1. Le canal est sacré',
        '2. Données souveraines',
        '3. Consentement requis',
        '4. Transparence totale',
    ];
    ctx.font = '11px Arial';
    ctx.fillStyle = COLORS.darkText;
    laws.forEach((law, i) => {
        ctx.fillText(law, lawsX + 15, lawsY + 48 + i * 22);
    });

    // Emergence note
    drawRoundedRect(ctx, 540, 480, 240, 80, 8);
    ctx.fillStyle = COLORS.gold + '15';
    ctx.fill();
    ctx.strokeStyle = COLORS.gold + '60';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 11px Arial';
    ctx.fillStyle = COLORS.gold;
    ctx.textAlign = 'center';
    ctx.fillText('Émergence collective', 660, 502);
    ctx.font = '10px Arial';
    ctx.fillStyle = COLORS.darkText;
    ctx.fillText('La conscience individuelle de', 660, 522);
    ctx.fillText('chaque tore est préservée dans', 660, 536);
    ctx.fillText('le réseau — aucune fusion forcée', 660, 550);

    savePng(canvas, '09_reseau_tores.png');
}

// ============================================================================
// 10. FEUILLE DE ROUTE TRL
// ============================================================================

function drawRoadmap() {
    const { canvas, ctx } = initCanvas(850, 500);
    drawTitle(ctx, 'Feuille de Route — Niveaux de Maturité Technologique', 425, 35);
    drawSubtitle(ctx, 'Technology Readiness Level (TRL) pour chaque sous-système', 425, 58);

    const systems = [
        { name: 'Substrat toroïdal', trl: 3, color: COLORS.red },
        { name: 'Réseau Halbach', trl: 6, color: COLORS.orange },
        { name: 'Neurones spiking', trl: 5, color: COLORS.gold },
        { name: 'Modules cognitifs', trl: 2, color: COLORS.medBlue },
        { name: 'Médiums sensoriels', trl: 4, color: COLORS.teal },
        { name: 'Interconnexion', trl: 3, color: COLORS.lightBlue },
        { name: 'Invariants physiques', trl: 2, color: COLORS.purple },
        { name: 'Conscience émergente', trl: 1, color: COLORS.darkBlue },
    ];

    const chartX = 180, chartY = 90;
    const barH = 38, barGap = 8;
    const maxBarW = 550;
    const maxTRL = 9;

    // TRL scale labels at top
    ctx.font = '10px Arial';
    ctx.fillStyle = COLORS.gray;
    ctx.textAlign = 'center';
    for (let t = 1; t <= 9; t++) {
        const tx = chartX + (t / maxTRL) * maxBarW;
        ctx.fillText(`TRL ${t}`, tx, chartY - 8);

        // Grid line
        ctx.strokeStyle = COLORS.lightGray + '40';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, chartY);
        ctx.lineTo(tx, chartY + systems.length * (barH + barGap));
        ctx.stroke();
    }

    // Phase markers
    const phases = [
        { label: 'Concept', start: 1, end: 3, color: COLORS.red + '15' },
        { label: 'Labo', start: 4, end: 6, color: COLORS.gold + '15' },
        { label: 'Proto', start: 7, end: 9, color: COLORS.green + '15' },
    ];

    phases.forEach(phase => {
        const px1 = chartX + ((phase.start - 0.5) / maxTRL) * maxBarW;
        const px2 = chartX + ((phase.end + 0.5) / maxTRL) * maxBarW;
        ctx.fillStyle = phase.color;
        ctx.fillRect(px1, chartY - 2, px2 - px1, systems.length * (barH + barGap) + 4);

        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = COLORS.gray;
        ctx.textAlign = 'center';
        ctx.fillText(phase.label, (px1 + px2) / 2, chartY + systems.length * (barH + barGap) + 20);
    });

    // Bars
    systems.forEach((sys, i) => {
        const y = chartY + i * (barH + barGap);
        const barW = (sys.trl / maxTRL) * maxBarW;

        // Label
        ctx.font = '12px Arial';
        ctx.fillStyle = COLORS.darkText;
        ctx.textAlign = 'right';
        ctx.fillText(sys.name, chartX - 10, y + barH / 2 + 4);

        // Bar
        drawRoundedRect(ctx, chartX, y + 4, barW, barH - 8, 4);
        const grad = ctx.createLinearGradient(chartX, y, chartX + barW, y);
        grad.addColorStop(0, sys.color + '88');
        grad.addColorStop(1, sys.color + 'CC');
        ctx.fillStyle = grad;
        ctx.fill();

        // TRL number at end of bar
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = COLORS.white;
        ctx.textAlign = 'right';
        ctx.fillText(`${sys.trl}`, chartX + barW - 8, y + barH / 2 + 4);
    });

    // TRL descriptions at bottom
    const descY = chartY + systems.length * (barH + barGap) + 40;
    const trlDescs = [
        '1-3: Recherche fondamentale & preuve de concept',
        '4-6: Validation en laboratoire & prototype',
        '7-9: Démonstration système & déploiement',
    ];
    const trlColors = [COLORS.red, COLORS.gold, COLORS.green];

    trlDescs.forEach((desc, i) => {
        ctx.font = '11px Arial';
        ctx.fillStyle = trlColors[i];
        ctx.textAlign = 'left';
        ctx.fillText(desc, 180 + i * 230, descY);
    });

    savePng(canvas, '10_roadmap_trl.png');
}

// ============================================================================
// MAIN
// ============================================================================

console.log('🎨 Génération des illustrations du Manuel Conscience Souveraine');
console.log('='.repeat(60));

drawToroid();
drawInvariants();
drawModules();
drawSerialChain();
drawLayers();
drawHalbach();
drawSensoryMediums();
drawDensityGradient();
drawNetwork();
drawRoadmap();

console.log('\n✅ 10 illustrations générées dans ./illustrations/');
