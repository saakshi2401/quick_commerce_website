import google from 'googlethis';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { groceryItems } from './data/groceryItems.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/images/products');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download an image robustly
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const run = async () => {
  console.log('Fetching Google Images for Zepto Clone Items...');
  
  const catalog = [];

  for (let i = 0; i < groceryItems.length; i++) {
    const item = groceryItems[i];
    try {
      const images = await google.image(`${item.name} packet transparent background`, { safe: false });
      
      let downloaded = false;
      let filename = `grocery_${i}.jpg`;
      let filepath = path.join(outputDir, filename);

      for(let j=0; j < Math.min(images.length, 5); j++) {
         try {
           await downloadImage(images[j].url, filepath);
           downloaded = true;
           break;
         } catch(e) {}
      }

      if (downloaded) {
         catalog.push({ ...item, localImage: `/images/products/${filename}` });
         console.log(`[${i+1}/${groceryItems.length}] Success: ${item.name}`);
      } else {
         catalog.push({ ...item, localImage: '/images/avocado.png' });
      }
    } catch (e) {
      catalog.push({ ...item, localImage: '/images/avocado.png' });
    }
  }

  const newFileContent = `export const groceryItems = ${JSON.stringify(catalog, null, 2)};`;
  fs.writeFileSync(path.join(__dirname, 'data', 'groceryItems.js'), newFileContent);
  console.log('All downloads complete and catalog updated!');

  import('child_process').then(({ execSync }) => {
     console.log('Automatically running seed.js...');
     execSync('npm run seed', { stdio: 'inherit' });
  });
};

run();
