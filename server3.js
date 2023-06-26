const express = require("express");
const app = express();
const fs = require("fs/promises");
const http = require("http");
const fsSync = require('fs');
const path = require("path");
const { Semaphore } = require("async-mutex"); // Import the async-mutex library

const concurrencyLimit = 5; // Set the concurrency limit
const semaphore = new Semaphore(concurrencyLimit); // Create a semaphore with the limit

let fd = 0;
let chunkCount = 0;
let chunkGroup = 0;

(async () => {
  fd = await fs.open("uploaded-file.txt", 'a');
})();

app.post("lo/upload", async (req, res) => {
  const totalChunks = req.header('X-Total-Chunks');
  const noOfChunks = req.header('X-No-Of-Chunks');

  try {
    await semaphore.acquire(); // Acquire a lock from the semaphore

    req.on("data", async (chunk) => {
      try {
        await fs.appendFile(fd, chunk);
      } catch (error) {
        console.error("Error writing chunk:", error);
        return res.sendStatus(500);
      }
    });

    req.on("end", async () => {
      chunkCount++;
      console.log(`Chunks received - ${chunkCount}`);
      res.sendStatus(200);

      if (chunkCount == totalChunks) {
        console.log("File upload Complete");
        await fd.close();
        semaphore.release(); // Release the lock from the semaphore
        return;
      }
    });

    req.on("error", (error) => {
      console.error("Error in file upload:", error);
      res.sendStatus(500);
      semaphore.release(); // Release the lock from the semaphore in case of an error
    });
  } catch (error) {
    console.error("Concurrency limit exceeded:", error);
    res.sendStatus(503); // Return a 503 Service Unavailable status code if the concurrency limit is exceeded
  } finally {
    semaphore.release(); // Release the lock from the semaphore in case of any unexpected scenario
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});