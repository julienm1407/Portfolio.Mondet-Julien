/**
 * JPEG mal nommés .png → vrais PNG. Fond noir : uniquement par remplissage
 * depuis les bords (pixels « fond » connectés au cadre), pour ne pas effacer
 * du texte noir à l’intérieur du logo (ex. « Play » sur le pictogramme).
 *
 * Usage : node scripts/process-review-logos.mjs
 *
 * LNA Santé (fond blanc, JPEG) : conversion PNG seule via sharp (sans flood),
 *   voir historique ou `sharp(buf).png()` sur ce fichier.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assets = path.join(__dirname, "../src/assets");

/**
 * @param {Buffer} rgba
 * @param {number} width
 * @param {number} height
 * @param {{ maxChannel: number; satMax: number }} opts
 */
function edgeFloodTransparent(rgba, width, height, opts) {
  const { maxChannel, satMax } = opts;
  const w = width;
  const h = height;
  const out = Buffer.from(rgba);

  const isBg = (x, y) => {
    const i = (y * w + x) * 4;
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    return mx < maxChannel && mx - mn < satMax;
  };

  const seen = new Uint8Array(w * h);
  const q = [];

  const add = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const id = y * w + x;
    if (seen[id]) return;
    if (!isBg(x, y)) return;
    seen[id] = 1;
    q.push(x, y);
  };

  for (let x = 0; x < w; x++) {
    add(x, 0);
    add(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    add(0, y);
    add(w - 1, y);
  }

  for (let qi = 0; qi < q.length; qi += 2) {
    const x = q[qi];
    const y = q[qi + 1];
    const i = (y * w + x) * 4;
    out[i + 3] = 0;
    add(x + 1, y);
    add(x - 1, y);
    add(x, y + 1);
    add(x, y - 1);
  }

  return out;
}

async function processFile(filename, floodOpts) {
  const inPath = path.join(assets, filename);
  const buf = await fs.readFile(inPath);
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.channels !== 4) {
    throw new Error(`${filename}: expected 4 channels, got ${info.channels}`);
  }
  const processed = edgeFloodTransparent(data, info.width, info.height, floodOpts);
  const tmpPath = `${inPath}.tmp.png`;
  await sharp(processed, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmpPath);
  await fs.rename(tmpPath, inPath);
  console.log("OK", filename, `→ ${info.width}×${info.height} PNG`, floodOpts);
}

/** Play Impact : pictogramme coloré coupe le fond noir → « Play » sur le visuel reste. */
await processFile("play-impact-logo.png", { maxChannel: 44, satMax: 46 });

/** WinWinSports : même logique. */
await processFile("winwinsports-logo.png", { maxChannel: 48, satMax: 50 });

console.log("Done.");
