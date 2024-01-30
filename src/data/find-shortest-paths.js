const { singleSource, edgePathFromNodePath } = require('graphology-shortest-path');

exports.findShortestPaths = (graph) => {
    const results = {};
    graph.forEachNode((node, attr) => {
        const paths = singleSource(graph, node);
        const tmp = Object.entries(paths).reduce((acc, [key, nodePath]) => {
            const weight = edgePathFromNodePath(graph,nodePath).reduce((acc, edge) => {
                const weight = graph.getEdgeAttribute(edge, "weight");
                return acc + parseInt(weight)
            }, 0);
            return [...acc,{
                weight,
                path:nodePath
            }]
        }, [])
        results[node] = tmp

    });
    return results;
}

const shortestCSV= Object.keys(shortestPaths).map(node=>{
    const paths=shortestPaths[node];
    const line=paths.map(path=>{
       return [path.weight,...path.path.map(getName)].join(",")
    })
   return line
  }).flat().join("\n")
  fs.writeFileSync("./points.csv",shortestCSV)