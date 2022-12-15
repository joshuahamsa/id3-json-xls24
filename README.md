# ID3 to JSON - XLS24

Takes a folder full of mp3 files and output all the tags to a JSON file in the XLS24 NFT standard for audio files minted on XRP Ledger.

## Install

* clone directory
* run `npm install`

## How to

~ Before starting, upload your album art and audio files to ipfs ~

* Create a folder in the cloned directory titled 'mp3' (without quotes).

* Copy all of your mp3 files into the `mp3` folder.

* In the app.js file, replace the image ipfs link with the ipfs link to your album art. You can also do this afterwards, but if you are uploading an album or collection, it would be easier to do in this step ;)

* `npm start`

* Check output file in `./data.json`

* For each track, replace the ipfs link with the ipfs link to your audio file.

🎉
