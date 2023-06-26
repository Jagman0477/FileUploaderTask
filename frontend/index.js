let chunkSize = 2 * 1024 * 1024; 

// const readChunks = async (chunkSize, file) => {
//     return new Promise((resolve, reject) => {
//         let fileSize = file.size; 
//         let offset = 0; 

//         let reader = new FileReader(); 
//         reader.onload()
//     }); 
// }

// let upload = document.getElementById("upload"); 

// upload.addEventListener("click", async (e) => {
//     e.preventDefault(); 
//     console.log(file);
//     let file = document.getElementById("file").files[0]; 
//     // await readChunks(chunkSize, file); 
//     // console.log(file.size); 
//     // let reader = file.stream(); 
//     readFile(file);
    
// }); 

function fileClick(){
    const file = document.getElementById("file").files[0];
    console.log(file);
}

const readFile = () => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const res = event.target.result
        console.log(res);
    })
}




















// // console.log("hello"); 

// let selectedFile = document.getElementById("file"); 
// let upload = document.getElementById("upload"); 

// let promisesArray = []; 

// // console.log(promisesArray); 

// upload.addEventListener("click", (event) => {
//     // stop the page from Refreshing.
//     event.preventDefault(); 

//     // 
//     // console.log(selectedFile.files[0]); 

//     // create a file reader. File reader let's web browsers read files from the user's system 
//     const reader = new FileReader(); 

//     // load the file as buffer

//     // console.log(reader.readAsArrayBuffer(selectedFile.files[0]));
//     reader.readAsArrayBuffer(selectedFile.files[0]); 
//     // Read the file content 
    
//     reader.onprogress = (event) => {
//         console.log(event)
//         // console.log(event)
//         // console.time("start"); 

//         // let chunkSize = 1024 * 1024 * 2; // set chunk size to 2mbs
//         // let fileSize = event.target.result.byteLength; // file size

//         // let chunksAmountToBeUsed; 
//         // if(fileSize < 1024 * 1024 * 10){
//         //     chunksAmountToBeUsed = 1; 
//         // }
//         // else if(fileSize < 1024 * 1024 * 100){
//         //     chunksAmountToBeUsed = 2
//         // }
//         // else if(fileSize < 1024 * 1024 * 1024){
//         //     chunksAmountToBeUsed = 4; 
//         // }
//         // else{
//         //     chunksAmountToBeUsed = 6; 
//         // }

//         // let totalChunks = Math.ceil(fileSize/chunkSize); 
//         // console.log(totalChunks) 
//         // // 307
//         // // 642240650
//         // // console.log(fileSize)

//         // let chunks = []; 
//         // // get the Array buffer
//         // // console.log(chunks)
//         // // console.log(totalChunks)
//         // // console.log(chunksAmountToBeUsed)
//         // let fileContent = event.target.result; 
//         // // console.log(fileContent); 
//         // // Slice the array buffer in chunks
//         // for(let i = 0; i<=totalChunks; i++){
//         //     console.log(i); 
//         //     // Slice from start position and end position;
//         //     let chunk = fileContent.slice(i * chunkSize, (i + 1) * chunkSize); 
//         //     // console.log(chunk); 
//         //     // check if chunks has the required no of chunks to be processed
//         //     if(chunks.length === chunksAmountToBeUsed){
//         //         // add one chunk at a time to promises array
//         //         // let i = 1; 
//         //         // console.log("reached the the if condition")
//         //         // console.log(chunks);
//         //         chunks.forEach((singleChunk, index) => {
//         //             promisesArray.push(sendChunks(singleChunk, totalChunks)); 
//         //         }); 
                    
//         //         // Reset the chunks
//         //         chunks = []; 
//         //         // console.log("chunks reset : ", chunks ); 
//         //         Promise.all(promisesArray)
//         //     }

//         //     // Add chunk into chunks array
//         //     chunks.push(chunk); 
//         // }
//         // chunks.forEach((chunk) => {
//         //     promisesArray.push(sendChunks(chunk, totalChunks)); 
//         // }); 
//         // try{
//         //     Promise.all(promisesArray); 
//         //     promisesArray = []; 
//         // }
//         // catch(error){
//         //     console.log(error)
//         // }
//         // console.timeEnd("start");
//     } 
// }); 

// const sendChunks = (chunk, totalChunks) => {

//     // return a new promise so all the chunks can be processed parallelly
//     return new Promise(async (resolve, reject) => {
//         // send post request to the server
//         // console.log("returning in promise"); 
//        try{
//             const response = await fetch(`http://localhost:3000/file`, {
//                 method : "post", 
//                 // body : JSON.stringify({buffer : chunk}), 
//                 body : chunk, 
//                 "headers" : {
//                     "Content-type" : "application/octet-stream", 
//                     "X-TOTAL-CHUNKS" : totalChunks
//                     // "Content-type" : "application/json"
//                 }
//             }); 
//             console.log(response)
//             // if chunk sent successfully resolve else reject
//             if(response.status === 200){
//                 console.log("resolved")
//                 resolve("chunk Resolved"); 
//             }
//             else{
//                 console.log(response); 
//                 reject("chunk rejected"); 
//             }
//        }
//        catch(error){
//             console.log(error.message); 
//        }
//     });
// }


// const dontRefresh = (event) => {
//     event.preventDefault(); 
// }


