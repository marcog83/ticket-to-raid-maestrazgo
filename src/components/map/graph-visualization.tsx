import React from 'react';
import * as d3 from 'd3';
import { useGraph } from '../../context/graph';
import { parseXMLToBorders } from '../paths/cards/perimeter';

const borders = parseXMLToBorders();
interface GraphVisualizationProps {
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const GraphVisualization = ({
  width = 2070,
  height = 2024,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}:GraphVisualizationProps) => {
  const { graph, convertToPixels } = useGraph();
  // Extract nodes and edges from graph
  const nodes = graph.nodes().map((node) => ({
    name: graph.getNodeAttribute(node, 'name'),
    x: graph.getNodeAttribute(node, 'x'),
    y: graph.getNodeAttribute(node, 'y'),
  }));

  const edges = graph.edges().map((edge) => {
    const [ source, target ] = graph.extremities(edge);
    return {
      source: graph.getNodeAttributes(source),
      target: graph.getNodeAttributes(target),
      weight: graph.getEdgeAttribute(edge, 'weight'),
    };
  });

  // D3 scales for x and y
  const xScale = d3.scaleLinear(
    [ 0, width ],
    [ marginLeft, width - marginRight ],
  );

  const yScale = d3.scaleLinear(
    [ 0, height ],
    [ marginTop, height - marginBottom ],
  );

  return (
    <svg width={width} height={height}>
      {/* Borders */}
      <g stroke="blue" strokeWidth="1" fill="none">
        {borders.map((border, i) => {
          const lineGenerator = d3
            .line()
            .x((d) => {
              const [ x ] = convertToPixels(d.longitude, d.latitude);
              return xScale(x);
            })
            .y((d) => {
              const [ , y ] = convertToPixels(d.longitude, d.latitude);
              return yScale(y);
            });

          const pathData = lineGenerator(border);

          if (!pathData) {
            console.warn(`Border ${ i } could not generate path data`, border);
            return null;
          }

          return (
            <path
              key={`border-${ i }`}
              d={pathData}
              stroke="blue"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
      </g>

      {/* Edges */}
      <g stroke="gray" strokeWidth="1">
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={xScale(edge.source.x)}
            y1={yScale(edge.source.y)}
            x2={xScale(edge.target.x)}
            y2={yScale(edge.target.y)}
          />
        ))}
      </g>
      {/* Edge Weights */}
      <g fontSize="12" fontWeight="bolder" fill="black">
        {edges.map((edge, i) => (
          <text
            key={`weight-${ i }`}
            x={(xScale(edge.source.x) + xScale(edge.target.x)) / 2}
            y={(yScale(edge.source.y) + yScale(edge.target.y)) / 2}
            textAnchor="middle"
          >
            {edge.weight}
          </text>
        ))}
      </g>
      {/* Nodes */}
      <g fill="red" stroke="black" strokeWidth="1">
        {nodes.map((node) => (
          <circle
            key={node.name}
            cx={xScale(node.x)}
            cy={yScale(node.y)}
            r="8"
          />
        ))}
      </g>
      {/* Labels */}
      <g fontSize="14" fill="black">
        {nodes.map((node) => (
          <text
            key={node.name}
            x={xScale(node.x) + 8}
            y={yScale(node.y)}
          >
            {node.name}
          </text>
        ))}
      </g>
    </svg>

  );
};
