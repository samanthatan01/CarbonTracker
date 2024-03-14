import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Display from "../components/Display";

const Member = () => {
  // setting states, params and variables
  const params = useParams();
  const [vehicle, setVehicle] = useState([]);
  const [date, setDate] = useState("");
  const [vehMakeId, setVehMakeId] = useState("");
  const [vehModel, setVehModel] = useState([]);
  const [vehModelId, setVehModelId] = useState("");
  const [distance, setDistance] = useState();
  const [formSubmission, setFormSubmission] = useState([]);
  const [estimatesData, setEstimatesData] = useState([]);
  const [type, setType] = useState("vehicle");
  const [distanceUnit, setDistanceUnit] = useState("km");

  // GET vehicle make data -- car name and id
  const getVehicleData = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_CARBON_API_SERVER + "/vehicle_makes",
        {
          signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CARBON_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setVehicle(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getVehicleData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // get dropdown of all makes for user to select
  const vehMakeSelection = vehicle.map((item) => {
    return <option value={item.data.id}>{item.data.attributes.name}</option>;
  });

  // GET vehicle model data from selected vehicle make -- car models and id
  const getVehicleModelData = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_CARBON_API_SERVER +
          "/vehicle_makes/" +
          vehMakeId +
          "/vehicle_models",
        {
          signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CARBON_API_KEY}`,
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
    if (vehMakeId.length !== 0) {
      const controller = new AbortController();
      getVehicleModelData(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [vehMakeId]);

  // get dropdown of all models and year of make, for the selected make
  const vehModelSelection = vehModel.map((item) => {
    return (
      <option
        value={item.data.id}
      >{`${item.data.attributes.year}, ${item.data.attributes.name}`}</option>
    );
  });

  // store the updated states from the form submission entry into a consolidated state to pass on to the next async function
  const submitEntry = () => {
    // setFormSubmission({
    //   date,
    //   vehMakeId,
    //   vehModelId,
    //   distance,
    // });

    getVehEstimatesData();
    setDate("");
    setVehMakeId("");
    setVehModelId("");
    setDistance("");
  };

  // console.log(formSubmission);

  // POST -- get vehicle emission estimates
  const getVehEstimatesData = async () => {
    const res = await fetch(
      import.meta.env.VITE_CARBON_API_SERVER + "/estimates",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CARBON_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          distance_unit: distanceUnit,
          distance_value: distance,
          vehicle_model_id: vehModelId,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      setEstimatesData(data);
    }
  };

  // PUT -- add getVehEstimatesData response body into airtable
  // const addVehEstimatesEntry = async (estimatesData) => {
  //   const res = await fetch(
  //     import.meta.env.VITE_AIRTABLE_SERVER + "/vehicle-estimate-response",
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         vehMakeId: estimatesData.data.id,
  //         distance_value: estimatesData.data.attributes.distance_value,
  //         vehicle: estimatesData.data.attributes.vehicle_make,
  //         vehModel: estimatesData.data.attributes.vehicle_model,
  //         vehModelId: estimatesData.data.attributes.vehicle_model_id,
  //         carbon_kg: estimatesData.data.attributes.carbon_kg,
  //       }),
  //     }
  //   );

  //   if (res.ok) {
  //     const data = await res.json();
  //     getEntries();
  //     setEstimatesData("");

  //     // to reset only when the request data has been stored in airtable
  //     // setDate("");
  //     // setVehicle([]);
  //     // setVehModel([]);
  //     // setDistance("");
  //   }
  // };

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          <h3>Log New Entry</h3>
          <br />
          <br />
          <div>
            <Form
              vehMakeSelection={vehMakeSelection}
              vehModelSelection={vehModelSelection}
              vehicle={vehicle}
              setVehicle={setVehicle}
              vehMakeId={vehMakeId}
              setVehMakeId={setVehMakeId}
              date={date}
              setDate={setDate}
              distance={distance}
              setDistance={setDistance}
              vehModel={vehModel}
              setVehModel={setVehModel}
              vehModelId={vehModelId}
              setVehModelId={setVehModelId}
              submitEntry={submitEntry}

              // getVehEstimatesData={getVehEstimatesData}
            ></Form>
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className="row">
          <h3>Past Entries and Total Activity</h3>
          <br />
          <div>
            <Display></Display>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
