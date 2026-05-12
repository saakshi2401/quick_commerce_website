const https = require('https');
https.get('https://www.themealdb.com/images/ingredients/Avocado.png', (res) => {
  console.log('Status:', res.statusCode);
  process.exit(0);
});
