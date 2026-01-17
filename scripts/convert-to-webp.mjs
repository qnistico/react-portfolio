import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';

async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const outputPath = inputPath.replace(ext, '.webp');

  // Skip if WebP already exists and is newer
  if (fs.existsSync(outputPath)) {
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    if (outputStats.mtime > inputStats.mtime) {
      console.log(`Skipping (already converted): ${inputPath}`);
      return;
    }
  }

  try {
    const inputStats = fs.statSync(inputPath);
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    console.log(`Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      await convertToWebP(fullPath);
    }
  }
}

console.log('Converting images to WebP...\n');
await processDirectory(IMAGES_DIR);
console.log('\nDone!');
