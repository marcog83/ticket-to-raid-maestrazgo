const fs =require('fs') ;
const path =require('path') ;
exports.getData=()=>{
    const csvFilePath = path.join("./", 'aventureros-a-bordon-nodes.csv'); // Replace with the path to your CSV file

    // Read the entire file into a string
    const dataStr = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    // Split the file content by new lines to get each row as a separate string
    const data = dataStr.split("\n")
    .map((line) => {
      const [id,name,latitude,longitude,  ...connections] = line.split(",");
      return {
        name,
        id: parseInt(id),
        connections: connections.filter(Boolean).map(Number),
        latitude,longitude
      };
    });
    
    console.log('CSV file successfully processed');
    
    const source=`window.data=${JSON.stringify(data,null,4)}`;
    fs.writeFileSync("./graph.js",source)
    return data 
}