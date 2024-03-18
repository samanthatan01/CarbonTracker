import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const [date, setDate] = useState("");
  const [entryId, setEntryId] = useState(props.id);
  const [vehMakeId, setVehMakeId] = useState(props.vehMakeIdOfEntry);
  const [vehModelId, setVehModelId] = useState(props.vehModelIdOfEntry);
  const [distance, setDistance] = useState();
  const [vehicle, setVehicle] = useState([]);
  const [vehModel, setVehModel] = useState([]);
  const type = "vehicle";
  const distanceUnit = "km";

  useEffect(() => {
    if (vehMakeId.length !== 0) {
      const controller = new AbortController();
      getVehicleModelDataUpdate(controller.signal);

      return () => {
        controller.abort();
      };
    }
  }, [vehMakeId]);

  const getVehicleModelDataUpdate = async (signal) => {
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

  const vehModelSelectionUpdate = vehModel.map((item) => {
    return (
      <option
        value={item.data.id}
      >{`${item.data.attributes.year}, ${item.data.attributes.name}`}</option>
    );
  });

  const getUpdatedVehData = async () => {
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

      updateVehEstimatesEntry(data);
      props.setShowUpdateModal(false);
      setDate("");
      setVehMakeId("");
      setVehModelId("");
      setDistance("");
    }
  };

  const updateVehEstimatesEntry = async (data) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_AIRTABLE_SERVER + "/vehicle-estimate-response",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: entryId,
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
        props.getEntries();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const selectedEntry = props.entries?.records?.find(
      (element) => element.id == props.id
    );

    setDate(selectedEntry.fields.date);
    setVehicle(selectedEntry.fields.vehicle);
    setDistance(selectedEntry.fields.distance_value);
  }, []);

  return (
    <div className={styles.backdrop}>
      {JSON.stringify(props.vehModelId)}

      <div className={styles.modal}>
        <br />

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="label col-md-2">
            <strong>Date</strong>
          </div>
          <input
            type="date"
            placeholder="DD-MM-YYYY"
            className="col-md-3"
            onChange={(event) => setDate(event.target.value)}
            defaultValue={date}
          />
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="label col-md-2">
            <strong>Vehicle Make</strong>
          </div>
          <select
            className="col-md-3"
            onChange={(event) => setVehMakeId(event.target.value)}
            defaultValue={vehicle}
          >
            <option value="0">{`${props.vehicle}`}</option>
            {props.vehMakeSelection}
          </select>
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="label col-md-2">
            <strong>Vehicle Model</strong>
          </div>
          <select
            className="col-sm-3"
            onChange={(event) => setVehModelId(event.target.value)}
            defaultValue={vehModel}
          >
            <option value="0">{`${props.vehModel}`}</option>
            {vehModelSelectionUpdate}
          </select>
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="label col-md-2">
            <strong>Distance Travelled (km)</strong>
          </div>
          <input
            type="text"
            placeholder=" Enter distance travelled in km"
            className="col-md-3"
            onChange={(event) => setDistance(event.target.value)}
            defaultValue={distance}
          ></input>
          <div className="col-md-3"></div>
        </div>

        <div className="row centered">
          <div className="col-md-3"></div>
          <button className="updatebutton col-md-3" onClick={getUpdatedVehData}>
            Update
          </button>
          <button
            className="deletebutton col-md-3"
            onClick={() => props.setShowUpdateModal(false)}
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          date={props.date}
          vehicle={props.vehicle}
          vehModel={props.vehModel}
          vehModelId={props.vehModelId}
          distance={props.distance_value}
          unit={props.distance_unit}
          carbon={props.carbon_kg}
          entries={props.entries}
          getEntries={props.getEntries}
          vehMakeId={props.vehMakeId}
          vehMakeSelection={props.vehMakeSelection}
          vehModelSelection={props.vehModelSelection}
          getVehicleModelData={props.getVehicleModelData}
          setShowUpdateModal={props.setShowUpdateModal}
          vehMakeIdOfEntry={props.vehMakeIdOfEntry}
          vehModelIdOfEntry={props.vehModelIdOfEntry}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
