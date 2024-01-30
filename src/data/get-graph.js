const { UndirectedGraph } =require("graphology");
const fs =require('fs') ;
const csvFilePath = './routes-def.csv'; // Replace with the path to your CSV file
 // Read the entire file into a string
 const dataStr = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
 
 const routesAndWeight = dataStr.split("\n")
    .map((line) => {
      const [from,to,,,weight] = line.split(",");
      return {
        id:[from,to].sort().join("_"),
        from,to,weight
      };
    }); 

const source=`window.routesAndWeight=${JSON.stringify(routesAndWeight,null,2)}`

fs.writeFileSync("./routesAndWeight.js",source)

 const findWeight=(from,to)=>{
  const idFind=[from,to].sort().join("_");
  return routesAndWeight.find(({id})=>id===idFind).weight
 }   

exports.getGraph=(data)=>{
    const graph = new UndirectedGraph();

    data.forEach(({ id, name, connections }) => {
      // Add node
      if (!graph.hasNode(id)) {
        graph.addNode(id, { label: name });
      }
    });
    
    data.forEach(({ id, name, connections }) => {
      // Add edges
      connections.forEach((targetId) => {
        if (targetId) {
          // Check if targetId is not empty
          if (!graph.hasEdge(id, targetId)) {
            try{
              graph.addEdge(id, targetId,{
              label:`${id} -> ${targetId}`,
              weight:findWeight(id,targetId)
            });
            }catch(e){
              console.error(id,targetId)
            }
            
          }
        }
      });
    });
    return graph
 }