const { createReadStream, createWriteStream } = require("fs");
const fs = require("fs/promises");
const { pipeline } = require("stream/promises");
const axios = require('axios');

const axiosInstance = axios.create({
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  });

//   let chunkArray = []
  let chunkId = 0

// let data = Buffer.alloc(0);
const sendChunkToServer = async(chunk, totalChunks, noOfChunks) => {
    // if(chunkArray.length == noOfChunks){
        // data = Buffer.concat([data, chunk])
        return new Promise(async (resolve, reject) => {
            chunkId++
            const res = await axiosInstance.post('http://localhost:3000/upload', chunk, {headers: {"Content-Type": "application/json", 'X-Total-Chunks': totalChunks,'X-No-Of-Chunks': noOfChunks }
            }) 
            if(res.status === 200){
                resolve("Successfull transfer.")
                // chunkArray = []
            }  
            else
                reject("Request failed")
            // const res = await fs.appendFile("newtext.txt",chunk)
            //     .then(() => {
            //       resolve("hi")  
            //     })
            //     .catch(() => {
            //         reject("Error")
            //     })
        })
    // }
    // chunkArray.push(chunk)
}

const folderRequest = async() => {
    // data = Buffer.concat([data, chunk])
    return new Promise(async (resolve, reject) => {
        const res = await axiosInstance.post('http://localhost:3000/uploadFile', {headers: {"Content-Type": "application/octet-stream"}
        }) 
        if(res.status === 200)
            resolve(upload());
        else
            reject("Request failed")
        // const res = await fs.appendFile("newtext.txt",chunk)
        //     .then(() => {
        //       resolve("hi")  
        //     })
        //     .catch(() => {
        //         reject("Error")
        //     })
    })
    
}

const upload = async () => {
    console.time("start")

    const fd = await fs.open("Hmmmm.txt", 'r');
    const fileSize = (await fd.stat()).size;

    const chunkSize = 2*1024*1024;
    // const chunkSize = 2097152;
    const totalChunks = Math.ceil(fileSize/chunkSize);
    console.log(totalChunks);

    let noOfChunks = 0
    if(fileSize < 10*1024*1024)
        noOfChunks = 1
    else if(fileSize < 100*1024*1024)
        noOfChunks = 2
    else if(fileSize < 1000*1024*1024)
        noOfChunks = 4
    else noOfChunks = 6

    let chunks = []
    const reader = fd.createReadStream({highWaterMark: chunkSize});
    let writePromises = [];

        reader.on('data', async(chunk) => {
            if(chunks.length == noOfChunks-1){
                for await(const chunk of chunks){
                    writePromises.push( sendChunkToServer(chunk, totalChunks, noOfChunks) )
                }
                chunks = []
                Promise.all(writePromises);
            }
            chunks.push(chunk);
        })
        
        
  reader.on('end', async () => {
        chunks.forEach(async(chunk) => {
            writePromises.push( sendChunkToServer(chunk, totalChunks, noOfChunks) )
        })

        try {
            Promise.all(writePromises);
            writePromises = [];
            console.log("File upload completed.");
            console.timeEnd("start")
            // const filed = await fs.open('newtext.txt', 'w');
            // filed.writeFile(data, 'binary');
            // filed.close();
          } catch (e) {
            console.log(e);
          }
    });
}

// folderRequest();
upload()