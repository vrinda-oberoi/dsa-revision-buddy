/**
 * Script to generate crisp PNG icons for Chrome Extension using Node.js built-in zlib and fs
 * No external dependencies required.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = createCRC32Table();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function generatePNG(size) {
  // Raw RGBA pixels
  const rawBytes = Buffer.alloc(size * (size * 4 + 1));
  let offset = 0;

  const center = size / 2;
  const radius = size * 0.44;

  for (let y = 0; y < size; y++) {
    rawBytes[offset++] = 0; // Filter byte: None

    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // Gradient from Purple (#7C3AED: 124, 58, 237) to Coral (#F43F5E: 244, 63, 94)
        const t = (x + y) / (size * 2);
        const r = Math.round(124 + t * (244 - 124));
        const g = Math.round(58 + t * (63 - 58));
        const b = Math.round(237 + t * (94 - 237));

        // Draw an inner circular ring or brain/repeat loop symbol
        const ringInner = radius * 0.38;
        const ringOuter = radius * 0.72;
        const inRing = dist >= ringInner && dist <= ringOuter;

        // Gap in ring for arrow
        const angle = Math.atan2(dy, dx);
        const isGap = angle > 0.4 && angle < 1.0;

        if (inRing && !isGap) {
          // White symbol pixel
          rawBytes[offset++] = 255;
          rawBytes[offset++] = 255;
          rawBytes[offset++] = 255;
          rawBytes[offset++] = 255;
        } else {
          // Background gradient pixel
          rawBytes[offset++] = r;
          rawBytes[offset++] = g;
          rawBytes[offset++] = b;
          rawBytes[offset++] = 255;
        }
      } else {
        // Transparent outside rounded icon
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
      }
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawBytes);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr[8] = 8; // bit depth: 8
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const sizes = [16, 32, 48, 128];
const assetsDir = path.resolve('assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

for (const s of sizes) {
  const pngBuf = generatePNG(s);
  const filePath = path.join(assetsDir, `icon${s}.png`);
  fs.writeFileSync(filePath, pngBuf);
  console.log(`Generated: assets/icon${s}.png (${s}x${s}, ${pngBuf.length} bytes)`);
}
