const fs = require('fs-extra');
const moment = require('moment');
const chalk = require('chalk');
const nodeID3 = require('node-id3');

const CliProgress = require('cli-progress');

const mp3DirPath = 'mp3';
const progress = new CliProgress.Bar({}, CliProgress.Presets.shades_classic);

async function readDir() {
  try {
    const files = await fs.readdir(mp3DirPath);
    console.log(chalk.blue(' Files have been read \n'));
    return files;
  } catch (err) {
    console.error(chalk.red(err));
  }
}

readDir().then((files) => {
  progress.start(files.length, 0);
  const output = files.map((file, i) => {
    progress.update(i);
    const stats = fs.statSync(`${mp3DirPath}/${file}`);
    const fileData = nodeID3.read(`${mp3DirPath}/${file}`);
    // console.log(fileData);
    return {
      schema: "ipfs:\/\/QmNpi8rcXEkohca8iXu7zysKKSJYqCvBJn3xJwga8jXqWU",
      nftType: "audio.v0",
      description: "From " + fileData.album + " by " + fileData.artist,
      image: 'ipfs://bafybeicek6shpkabae3ozzsyblkoedf5fvdhxyezwnvcydbb5xv7avqeq4',
      fileUrl: `URI for ${file}`,
      title: fileData.title,
      artist: fileData.artist,
      album: fileData.album,
      performer: fileData.performerInfo,
      composer: fileData.composer,
      trackNumber: fileData.trackNumber,
      discNumer: fileData.partOfSet,
      genre: fileData.genre,
      bpm: fileData.bpm,
      fileSize: stats.size
    };
  });
  fs.writeFile('data.json', JSON.stringify(output, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(chalk.red(err));
      throw err;
    }
    progress.stop();
    console.log(chalk.green('\n Process run complete'),chalk.blue('\n\n Output saved to ./data.json\n'));
  });
});
