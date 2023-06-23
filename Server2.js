const express = require("express");
const app = express();
const fs = require("fs/promises");
const { pipeline } = require("stream/promises");

let fd = 0;
let chunkCount = 0;

(async() => {
  fd = await fs.open("uploaded-file.txt", 'w');
})();


app.post("/upload", async(req, res) => {
  const totalChunks = req.header('X-Total-Chunks');
  const noOfChunks = req.header('X-No-Of-Chunks');

  req.on("data", async(chunk) => {
    try {
    await fs.appendFile(fd, chunk); 
    } catch (error) {
      console.error("Error writing chunk:", error);
      res.sendStatus(500);
    }
  }); 

  req.on("end", async() => {
    chunkCount++;
    console.log(`Chunks received - ${chunkCount}`);
    res.sendStatus(200);

    if(chunkCount == totalChunks){
      await fd.close();
      console.log("File upload Complete");
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