import * as fs from 'fs';
import Papa from 'papaparse';

interface Row {
  id: string;
  name: string;
  lat: string;
  long: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  c6: string;
}

// Read input CSV as a string
const inputCsv = fs.readFileSync('src/data/aventureros-a-bordon-nodes.csv', 'utf8');

// Parse the CSV into a structured array of objects
const parseResult = Papa.parse<Row>(inputCsv, {
  header: true,
  skipEmptyLines: true,
  delimiter: ',',
});

if (parseResult.errors.length > 0) {
  console.error('Error parsing CSV:', parseResult.errors);
  // process.exit(1);
}

const { data } = parseResult;

// Create an ID-to-name map
const idToName: Record<string, string> = {};
data.forEach((row) => {
  idToName[row.id] = row.name;
});

// Build edges
interface Edge {
  sourceId: string;
  targetId: string;
  sourceName: string;
  targetName: string;
  weight: number;
}

const weights = fs.readFileSync('src/data/routes-def.csv', 'utf8');

const parsedWeights = Papa.parse<Edge>(weights, {
  header: true,
  skipEmptyLines: true,
  delimiter: ',',
});

// Create an ID-to-name map
const idsToWeight: Record<string, string> = {};
parsedWeights.data.forEach((connection) => {
  idsToWeight[`${ connection.sourceId }-${ connection.targetId }`] = connection.weight;
});
const edges: Edge[] = [];

for (const row of data) {
  const sourceId = row.id;
  const sourceName = row.name;

  // Iterate over c1...c6
  for (const col of [ 'c1', 'c2', 'c3', 'c4', 'c5', 'c6' ]) {
    const targetId = row[col];
    if (targetId && targetId.trim() !== '') {
      const targetName = idToName[targetId] || '';
      edges.push({
        sourceId,
        targetId,
        sourceName,
        targetName,
        weight: idsToWeight[`${ sourceId }-${ targetId }`] ?? 1,
      });
    }
  }
}

// Convert edges array back to CSV
const outputCsv = Papa.unparse(edges);

// Write output CSV
fs.writeFileSync('output.csv', outputCsv);

console.log('Output written to output.csv');
