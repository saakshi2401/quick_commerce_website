import google from 'googlethis';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { luxuryItems } from './data/luxuryItems.js';
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
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const run = async () => {
  console.log('Starting Google Image Download for 200 Premium Products...');
  
  const fullItems = [...luxuryItems];
  if (fullItems.length < 200) {
     fullItems.push({ name: 'Premium Mineral Water', category: 'Beverages', keyword: 'water' });
     fullItems.push({ name: 'Reserve Truffle Oil', category: 'Pantry', keyword: 'oil' });
  }

  const catalog = [];

  for (let i = 0; i < fullItems.length; i++) {
    const item = fullItems[i];
    try {
      // Query Google Images
      const images = await google.image(`${item.name} high quality food photography`, { safe: false });
      
      let downloaded = false;
      let filename = `product_${i}.jpg`;
      let filepath = path.join(outputDir, filename);

      // Attempt to download the first reliable image
      for(let j=0; j < Math.min(images.length, 5); j++) {
         try {
           const url = images[j].url;
           // Skip webp/svg just for simplicity if it throws an extension error, but usually google.image returns jpg/png
           await downloadImage(url, filepath);
           downloaded = true;
           break;
         } catch(e) {
           // try next image
         }
      }

      if (downloaded) {
         catalog.push({
           ...item,
           localImage: `/images/products/${filename}`
         });
         console.log(`[${i+1}/200] Success: ${item.name}`);
      } else {
         console.log(`[${i+1}/200] Failed to download any images for ${item.name}, using fallback.`);
         catalog.push({ ...item, localImage: '/images/wagyu.png' });
      }

    } catch (e) {
      console.log(`[${i+1}/200] Error querying google for ${item.name}: ${e.message}`);
      catalog.push({ ...item, localImage: '/images/wagyu.png' });
    }
  }

  // Overwrite luxuryItems.js with the new localImage mappings
  const newFileContent = `export const luxuryItems = ${JSON.stringify(catalog, null, 2)};`;
  fs.writeFileSync(path.join(__dirname, 'data', 'luxuryItems.js'), newFileContent);
  console.log('All downloads complete and catalog updated!');

  console.log('Automatically running seed.js...');
  import { execSync } from 'child_process';
  execSync('npm run seed', { stdio: 'inherit' });
};

run();
