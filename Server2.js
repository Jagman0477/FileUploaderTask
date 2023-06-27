const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs/promises");
const http = require("http");
const fsSync = require('fs');
const path = require("path");

app.use(cors());

let fd = 0;
let chunkCount = 0
let chunkGroup = 0;
let chunks = [];
// let writeStream = fsSync.createWriteStream("uploaded-file.txt", {flags: 'a'});


(async() => {
  fd = await fs.open("uploaded-file.mp4", 'a');
})();

app.post("/uploadFile", () => {
  chunkCount = 0;
})

app.post("/upload", async(req, res) => {
  const totalChunks = req.header('X-Total-Chunks');
  const noOfChunks = req.header('X-No-Of-Chunks');
  chunkCount = req.header('X-Chunk-Count');

  req.on("data", async(chunk) => {

    try {

      console.log(chunkCount);
      await fs.appendFile("uploaded-file.mp4", chunk);
      // if(chunkCount%noOfChunks === 0){
      //   chunkGroup++
      // }
      // await fs.appendFile(__dirname+`/files/${chunkGroup}.txt`, chunk);
      
    } catch (error) {
      console.error("Error writing chunk:", error);
      return res.sendStatus(500);
    }

  }); 

  req.on("end", async() => {
  
    // if(req.header('X-Chunk-Count') == chunkCount){
      // console.log(`Chunks received - ${chunkCount}`);
      // console.log(req.header('X-Chunk-Count'))
    // }
    res.sendStatus(200);

    if(chunkCount == totalChunks){
      // writeStream.end();
      chunkCount = 0;
      console.log("File upload Complete");
      // await fd.close();
      return;
    }  
  });

  req.on("error", (error) => {
    console.error("Error in file upload:", error);
    res.sendStatus(500);
  });

});

// async function processChunks(chunk){

// }

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});