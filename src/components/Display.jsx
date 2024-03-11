import React, { useState, useEffect } from "react";
import VehicleMake from "./VehicleMake";

const Display = () => {
  const [vehModel, setVehModel] = useState([]);

  const getModelData = async (signal) => {
    try {
      const res = await fetch(
        "https://www.carboninterface.com/api/v1/vehicle_makes",
        {
          signal,
          headers: {
            Authorization: "Bearer pdzpPl65wufom2UJZEljQ",
            "Content-Type": "application/json",
          },
        }
      );

      // bearer secret token for airtable > postman: pat1pbGlSKhsXSxPI.e9462d87faf02f90a9321505b06980ae23cd446365bcacf09d2099a667a19cd6

      if (res.ok) {
        const data = await res.json();
        setVehModel(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getModelData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // console.log(vehModel);

  return (
    <div className="container">
      <VehicleMake vehModel={vehModel} setVehModel={setVehModel} />
    </div>
  );
};

export default Display;
