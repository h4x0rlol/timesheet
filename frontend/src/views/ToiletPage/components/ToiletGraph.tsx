import React from "react";
import "../../styles/ToiletGraph.scss";
import ChartComponent from "react-chartjs-2";

const ToiletGraph = () => {
  const arr = [...Array(5)].map((_, i) => i + 1);
  const data = {
    labels: arr,
    productNames: [
      "Not implemented yet",
      ["Not implemented yet", "Not implemented yet", "Not implemented yet"],
      "Not implemented yet",
      "Not implemented yet",
      "Not implemented yet",
    ],
    datasets: [
      {
        data: [0, 1.21, 3.55, 3.55, 3.55],
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        bodySpacing: 10,
        padding: 20,
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            return data.productNames[context.dataIndex];
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="graph">
      <ChartComponent data={data} options={options} type="bar" />
    </div>
  );
};

export default ToiletGraph;
