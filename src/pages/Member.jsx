import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Display from "../components/Display";
import Overview from "../components/Overview";

const Member = () => {
  // setting states, params and variables
  const params = useParams();
  const [vehicle, setVehicle] = useState([]);
  const [date, setDate] = useState("");
  const [vehMakeId, setVehMakeId] = useState("");
  const [vehModel, setVehModel] = useState([]);
  const [vehModelId, setVehModelId] = useState("");
  const [distance, setDistance] = useState();
  const [entries, setEntries] = useState([]);
  const type = "vehicle";
  const distanceUnit = "km";

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
    getVehdata();
  };

  const clearEntry = () => {
    setDate("");
    setVehMakeId("");
    setVehModelId("");
    setDistance("");
  };

  // POST -- get vehicle emission estimates
  const getVehdata = async () => {
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
      console.log(data);

      addVehEstimatesEntry(data);
      setDate("");
      setVehMakeId("");
      setVehModelId("");
      setDistance("");
    }
  };

  // PUT -- add getVehdata response body into airtable
  const addVehEstimatesEntry = async (data) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER + "/vehicle-estimate-response",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  date: date,
                  vehicle: data.data.attributes.vehicle_make,
                  vehModel: data.data.attributes.vehicle_model,
                  vehMakeId: data.data.id,
                  vehModelId: data.data.attributes.vehicle_model_id,
                  distance_value: data.data.attributes.distance_value,
                  carbon_kg: data.data.attributes.carbon_kg,
                },
              },
            ],
          }),
        }
      );
      if (res.ok) {
        const data2 = await res.json();
        console.log(data2);
        getEntries();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // GET entries from airtable to display on app
  const getEntries = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER + "/vehicle-estimate-response",
        {
          signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getEntries(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  console.log(entries);

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          <br />
          <div className="row">
            <h3 style={{ color: "#35423b" }}>Carbon Emission Overview</h3>
            <br />
            <br />
            <Overview entries={entries}></Overview>
          </div>

          <br />
          <br />
          <br />

          <div>
            <hr
              style={{
                background: "#77a677",
                color: "#77a677",
                borderColor: "#77a677",
                height: "2px",
              }}
            />
          </div>

          <h3 style={{ color: "#35423b" }}>Log New Entry</h3>
          <br />
          <br />
          <div>
            <Form
              vehMakeSelection={vehMakeSelection}
              vehModelSelection={vehModelSelection}
              vehMakeId={vehMakeId}
              setVehMakeId={setVehMakeId}
              date={date}
              setDate={setDate}
              distance={distance}
              setDistance={setDistance}
              vehModelId={vehModelId}
              setVehModelId={setVehModelId}
              submitEntry={submitEntry}
              clearEntry={clearEntry}
            ></Form>
          </div>
        </div>

        <br />
        <div>
          <hr
            style={{
              background: "#77a677",
              color: "#77a677",
              borderColor: "#77a677",
              height: "2px",
            }}
          />
        </div>

        <br />

        <div className="row">
          <h3 style={{ color: "#35423b" }}>Past Entries</h3>
          <br />
          <br />
          {/* {JSON.stringify(vehModelId)} */}
          <div>
            <Display
              entries={entries}
              getEntries={getEntries}
              vehMakeId={vehMakeId}
              vehMakeSelection={vehMakeSelection}
              vehModelId={vehModelId}
              vehModelSelection={vehModelSelection}
              getVehicleModelData={getVehicleModelData}
            ></Display>
          </div>
        </div>

        <br />
        <br />
      </div>
    </>
  );
};

export default Member;
