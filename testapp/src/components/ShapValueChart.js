import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
  const [shapValues, setShapValues] = useState([]);
  const [patientData, setPatientData] = useState([]);

  // Read the Shap Values JSON file
  useEffect(() => {
    fetch('C:\Users\mithu\OneDrive\Desktop\react\testapp\src\components\file1.json')
      .then((response) => response.json())
      .then((data) => setShapValues(data))
      .catch((error) => console.error('Error reading Shap Values JSON', error));
  }, []);

  // Read the Patient Data JSON file
  useEffect(() => {
    fetch('C:\Users\mithu\OneDrive\Desktop\react\testapp\src\components\file2.json')
      .then((response) => response.json())
      .then((data) => setPatientData(data))
      .catch((error) => console.error('Error reading Patient Data JSON', error));
  }, []);

  const chartOptions = {
    chart: {
      id: 'shap-chart',
      type: 'bar',
      height: 350,
    },
    xaxis: {
      title: {
        text: 'Patient Age',
      },
    },
    yaxis: {
      title: {
        text: 'Shap Values',
      },
    },
  };

  const shapData = shapValues[0].shap_values[0];
  
  const chartSeries = [
    {
      name: 'Shap Values',
      data: shapData, 
    },
  ];

  return (
    <div className="chart-container">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default ChartComponent;
