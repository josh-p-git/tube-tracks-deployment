import React, { useState, useEffect } from "react";
import Homepage from "../homepage/Homepage";
import axios from "axios";
import "./App.css";

function App() {
  const [lineData, setLineData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleIsRunningChange = (value) => {
    setIsRunning(value);
  }

  const fetchData = async () => {
    try {
      const fetchedData = await fetchLineData("victoria, jubilee, central, metropolitan, northern, bakerloo, piccadilly, district, circle, DLR, hammersmith-city");

      setLineData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLineData = async (line) => {
    try {
      console.log('FETCHING API DATA')
      const response = await axios.get(`http://localhost:8080/line/${line}`);
      return response.data.transformedData;

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      fetchData();
      
      const intervalId = setInterval(() => {
        fetchData();
      }, 175000);
  
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    console.log(lineData);
  }, [lineData]);

  return (
    <div className="App">
      <Homepage lineData={lineData} handleIsRunningChange={handleIsRunningChange}/>
    </div>
  );
}

export default App;
