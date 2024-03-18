import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const [date, setDate] = useState("");
  const [vehMakeId, setVehMakeId] = useState("");
  const [vehModelId, setVehModelId] = useState("");
  const [distance, setDistance] = useState();
  const [vehicle, setVehicle] = useState([]);
  const [vehModel, setVehModel] = useState([]);

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

  useEffect(() => {
    const selectedEntry = props.entries?.records?.find(
      (element) => element.id == props.id
    );
    console.log(selectedEntry.fields.vehMakeId);
    setDate(selectedEntry.fields.date);
    setVehicle(selectedEntry.fields.vehicle);
    setDistance(selectedEntry.fields.distance_value);
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        {/* {JSON.stringify(date)}
        <br />
        {JSON.stringify(vehModelId)}
        <br />
        {JSON.stringify(vehMakeId)}
        <br />
        {JSON.stringify(distance)} */}

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
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
        <br />

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button className="col-md-3">Update</button>
          <button
            className="col-md-3"
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
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
