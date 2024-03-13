import React, { useState, useEffect } from "react";
import VehicleMake from "./VehicleMake";

const Form = () => {
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
      <div className="col-sm-6">Select Vehicle Type</div>
      <VehicleMake vehModel={vehModel} setVehModel={setVehModel} />
    </div>
  );
};

export default Form;
