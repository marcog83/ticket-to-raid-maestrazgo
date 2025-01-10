import React from 'react';
import * as d3 from 'd3';
import { useGraph } from '../../context/graph';
import styles from './graph-visualization.module.css';

interface GraphVisualizationProps {
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const GraphVisualization = ({
  width = 2500,
  height = 2500,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}:GraphVisualizationProps) => {
  const graph = useGraph();
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
    <div className={styles.graph}>
      <svg width={width} height={height}>
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
    </div>

  );
};
