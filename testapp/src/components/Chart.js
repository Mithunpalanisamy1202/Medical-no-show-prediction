import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import ShapValueChart from "./ShapValueChart";
import "./Chart.css";
function Chart() {
  const [shapData, setShapData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/chart")
      .then((response) => {
        setShapData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching SHAP summary plot data:", error);
        setIsLoading(false);
      });
  }, []);
  const options = {
    chart: {
      type: "bar",
      height: 100,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: shapData.categories || [],
    },
  };

  const series = Array.isArray(shapData.values)
    ? shapData.values.map((value, index) => ({
        name: `Values for ${index}`,
        data: value,
      }))
    : [];

  const options1 = {
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      tickAmount: 10,
      categories: shapData.categories || [],
    },
    yaxis: {
      tickAmount: 7,
    },
  };

  const series1 = Array.isArray(shapData.values)
    ? shapData.values.map((value, index) => ({
        name: `Values for ${index}`,
        data: value,
      }))
    : [];

  return (
    <>
      <div className="shap-summary-plot">
        {isLoading ? (
          <div className="loader">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="chart m-5">
            <h2 className="text-center">Shap Bar Plot</h2>
            <div className="d-flex">
              <div className="chart-width ms-5">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="bar"
                  height={350}
                />
              </div>
              <div className="ms-5">
                <h3>Explanation:</h3>
                <div className="ms-5">
                  <div dangerouslySetInnerHTML={{__html:shapData.explanation}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="shap-summary-plot">
        {isLoading ? (
          <div className="loader">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="chart m-5">
            <h2 className="text-center">Shap Scatter Plot</h2>
            <div className="d-flex">
              <div className="chart-width ms-5">
                <ReactApexChart
                  options={options1}
                  series={series1}
                  type="scatter"
                  height={350}
                />
              </div>
              <div className="ms-5">
                <h3>Explanation:</h3>
                <div  className="ms-5 exp-clr">
                  <p dangerouslySetInnerHTML={{__html:shapData.explanation}}></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chart;
