import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Data } from '../../data/get-data';
import { useGraph } from '../../context/graph';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const options = {
  responsive: true,
  outerHeight: 300,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const Figures = ({ selectedIds, groups }:{ selectedIds:Set<number> }) => {
  const graph = useGraph();
  const values = [];
  const labels = [ ];

  Object.entries(groups).forEach(([ key, value ]) => {
    values.push(value);
    labels.push(key);
  });
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
