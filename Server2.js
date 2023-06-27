const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs/promises");
const http = require("http");
const fsSync = require('fs');
const path = require("path");

app.use(cors());

let fd = 0;
let chunkCount = 0;

// if (!fs.existsSync(path.join(__dirname + `/uploads`))) {
//   fs.mkdirSync(path.join(__dirname + `/uploads`));
// }

(async() => {
  fd = await fs.open("uploaded-file.mp4", 'a');
})();

app.post("/uploadFile", () => {
  chunkCount = 0;
})

app.post("/upload", async(req, res) => {

  // const { filename } = req.params;

  const totalChunks = req.header('X-Total-Chunks');
  const noOfChunks = req.header('X-No-Of-Chunks');
  chunkCount = req.header('X-Chunk-Count');

  req.on("data", async(chunk) => {

    try {
      await fs.appendFile(fd, chunk);
      
    } catch (error) {
      console.error("Error writing chunk:", error);
      return res.sendStatus(500);
    }

  }); 

  req.on("end", async() => {
  
    res.sendStatus(200);

    if(chunkCount == totalChunks){
      chunkCount = 0;
      console.log("File upload Complete");
      await fd.close();
      return;
    }  
  });

  req.on("error", (error) => {
    console.error("Error in file upload:", error);
    res.sendStatus(500);
  });

});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});