import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BatteryPrediction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const titles = {
  soc: 'State of Charge',
  soh: 'State of Health',
};

const colors = {
  soc: {
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  soh: {
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
};
interface Props {
  className?: string;
  predictions: BatteryPrediction[];
  type: 'soh' | 'soc';
  onClick?: () => void;
}

export default function PredictionsGraph({
  predictions,
  type,
  onClick,
  className,
}: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: titles[type],
      },
    },
    // TODO label the x and y axis
    // TODO when user hovers over point, tooltip should include names of both axes with their corresponding data
  };

  const data = {
    labels: predictions.map((p) => p.chargeCycles),
    datasets: [
      {
        label: 'Charge Cycles',
        data: predictions.map((p) => p[type]),
        borderColor: colors[type].borderColor,
        backgroundColor: colors[type].backgroundColor,
      },
    ],
  };

  return (
    <Line
      options={options}
      data={data}
      onClick={onClick}
      className={className}
    />
  );
}
