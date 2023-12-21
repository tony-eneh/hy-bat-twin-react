import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BatteryReading } from '../types';
import { stripTime } from '../helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const titles = {
  temperature: 'Temperature',
  voltage: 'Voltage',
  current: 'Current',
};

const colors = {
  temperature: {
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  voltage: {
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  current: {
    borderColor: 'rgb(171, 53, 235)',
    backgroundColor: 'rgba(171, 53, 235, 0.5)',
  },
};

interface Props {
  className?: string;
  readings: BatteryReading[];
  type: 'temperature' | 'voltage' | 'current';
  onClick?: () => void;
}

export function SensorReadingsGraph({
  readings,
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
    // TODO indicate as type time, so that the chart library will determine labels to use on x axis given the span of the data
    // scales: {
    //   x: { type: 'time' },
    // },
    // TODO label the x and y axis
    // TODO when user hovers over point, tooltip should include names of both axes with their corresponding data
  };

  const data = {
    labels: readings.map((r) => stripTime(r.createdAt)),
    datasets: [
      {
        label: type,
        data: readings.map((p) => p[type]),
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
