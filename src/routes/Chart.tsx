import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { iPriceHistory } from "../interfaces/Chart";
import { iUserOutlet } from "../interfaces/useOutlet.interface";

function Chart() {
  const { coinId } = useOutletContext<iUserOutlet>();

  const { isLoading, data: chartData } = useQuery<iPriceHistory[]>(
    ["chartHistory", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              foreColor: "red",
              height: 300,
              width: 600,
              toolbar: {
                show: true,
              },
              background: "transparent",
            },
            grid: { show: false },

            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },

            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
          series={[
            {
              name: "$",
              data: chartData?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })) as [], //
            },
          ]}
        />
      )}
    </div>
  );
}

export default Chart;
