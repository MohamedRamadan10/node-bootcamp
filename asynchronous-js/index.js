const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('The is not found!!!');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file!!!');
      resolve(data);
    });
  });
};

// readFilePro(`${__dirname}/data.txt`)
//   .then((data) => {
//     console.log(data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(console.log('Random dog image save to file!!'))
//   .catch((err) => console.log(err));

const getDogImg = async () => {
  try {
    const data = await readFilePro(`${__dirname}/data.txt`);
    console.log(data);

    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // console.log(res.body.message);

    const res1Pic = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pic = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pic = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pic, res2Pic, res3Pic]);
    const imgs = all.map((img) => img.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));

    console.log('Random dog image save to file!!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '🐶🐕🐩🐕‍🦺';
};

// console.log('Done 1');
// getDogImg()
//   .then((x) => console.log(x))
//   .catch(() => console.log('Error 💥'));
// console.log('Done 3');

(async () => {
  try {
    console.log('Done 1');
    await getDogImg()
      .then((x) => console.log(x))
      .catch(() => console.log('Error 💥'));
    console.log('Done 3');
  } catch (err) {
    console.log(err);
  }
})();
