import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { pullPortolioValueOverTime } from "../service/UserServices";

const PortfolioChart = () => {
  const [chartData, setChartData] = useState<{ date: string; totalValue: number }[]>([]);

  useEffect(() => {
    pullPortolioValueOverTime().then((response) => {
      const data = response.data.map((item: { date: string; totalValue: number }) => ({
        date: new Date(item.date).toLocaleDateString(),
        totalValue: item.totalValue,
      }));
      setChartData(data);
    });
  }, []);

  const dates = chartData.map((item) => item.date);
  const values = chartData.map((item) => item.totalValue);

  return (
    <div style={{ height: '400px' }}>
      <LineChart
        xAxis={[{ data: dates }]}
        series={[
          { data: values, label: "Total Value", color: "blue" },
        ]}
        width={600}
        height={400}
      />
    </div>
  );
};

export default PortfolioChart;