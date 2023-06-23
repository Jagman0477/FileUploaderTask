const { createReadStream, createWriteStream } = require("fs");
const fs = require("fs/promises");
const axios = require("axios");
const { pipeline } = require("stream/promises");

// let data = Buffer.alloc(0);
// const sendChunkToServer = async(chunk) => {
//     data = Buffer.concat([data, chunk])
//     return new Promise(async (resolve, reject) => {
//         const res = await axios.post('http://localhost:3000/upload', chunk, {headers:       {"Content-Type": "application/octet-stream" }
//         }) 
//         if(res.status === 200)
//             resolve()
//         else reject("Request failed")
//     })
    
// }

// const upload = async () => {

//     const fd = await fs.open("text.txt", 'r');
//     const fileSize = (await fd.stat()).size;

//     const chunkSize = 2*1024*1024;
//     const totalChunks = Math.ceil(fileSize/chunkSize);

//     let noOfChunks = 0
//     if(fileSize < 10*1024*1024)
//         noOfChunks = 1
//     else if(fileSize < 100*1024*1024)
//         noOfChunks = 2
//     else if(fileSize < 1000*1024*1024)
//         noOfChunks = 4
//     else noOfChunks = 6

//     let chunks = []
//     // let currentChunk = 0

//     const reader = fd.createReadStream({highWaterMark: chunkSize})
//     reader.on('data', async(chunk) => {

//         if(chunks.length === noOfChunks){
//             const promises = []
//             for(let i=0; i<chunks.length; i++){
//                 const chunkToSend = chunks[i];
//                 const promise = sendChunkToServer(chunkToSend);
//                 promises.push(promise);
//             }

//             try {
//                 await Promise.all(promises);
//                 // currentChunk += noOfChunks;
//                 // console.log(`Uploaded chunks ${currentChunk - noOfChunks + 1}-${currentChunk}`);
//               } catch (error) {
//                 console.error("Error in uploading chunks:", error);
//               }
        
//             chunks = [];     
//         }
//         chunks.push(chunk);
//     })

//     reader.on("end", async () => {
//         if (chunks.length > 0) {
//           const promises = [];
//           for (let i = 0; i < chunks.length; i++) {
//             const chunkToSend = chunks[i];
//             const promise = sendChunkToServer(chunkToSend);
//             promises.push(promise);
//           }
    
//           try {
//             await Promise.all(promises);
//             console.log("File upload completed.");
//             const filed = await fs.open('newtext.txt', 'w');
//             filed.writeFile(data, 'binary');
//             filed.close();
//           } catch (error) {
//             console.error("Error in final chunks upload:", error);
//           }
//         }
//       });

// }

// upload();



// const { createReadStream, createWriteStream } = require("fs");
// const fs = require("fs/promises");
// const { pipeline } = require("stream/promises");

// const upload = async () => {

//     const fd = await fs.open("Hmmmm.txt", 'r');
//     const fileSize = (await fd.stat()).size;

//     const chunkSize = 2*1024*1024;
//     const totalChunks = Math.ceil(fileSize/chunkSize);

//     let noOfChunks = 0
//     if(fileSize < 10*1024*1024)
//         noOfChunks = 1
//     else if(fileSize < 100*1024*1024)
//         noOfChunks = 2
//     else if(fileSize < 1000*1024*1024)
//         noOfChunks = 4
//     else noOfChunks = 6

//     const chunks = []
//     const reader = fd.createReadStream({highWaterMark: 2*1024*1024});
//     const writeStream = createWriteStream('copy.txt');
//     const writePromises = [];

//         reader.on('data', async(chunk) => {
//             if(chunks.length == noOfChunks-1){
//                 for await(const chunk of chunks){
//                     writePromises.push(
//                         new Promise((resolve, reject) => {
//                         writeStream.write(chunk, (err) => {
//                             if (err) reject(err);
//                             else resolve();
//                         });
//                         })
//                     );
//                     chunks.length = 0;
//                 }
                
//             } else {
//                chunks.push(chunk) 
//             }
//         })
        
        
//   reader.on('end', async () => {
//         // chunks.forEach((chunk) => {
//         // writePromises.push(
//         //     new Promise((resolve, reject) => {
//         //     writeStream.write(chunk, (err) => {
//         //         if (err) reject(err);
//         //         else resolve();
//         //         });
//         //     })
//         // )
//         // })

//         try {
//             await Promise.all(writePromises);
//           } catch (e) {
//             console.log(e);
//           }
//     });
// }

// console.time("start")
// upload();
// console.timeEnd("start")
