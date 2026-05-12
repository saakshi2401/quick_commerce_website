import google from 'googlethis';

async function test() {
  try {
    const images = await google.image('Wagyu Ribeye raw', { safe: false });
    console.log(images[0].url);
  } catch (err) {
    console.error(err);
  }
}

test();
