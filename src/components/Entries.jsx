import React, { useState } from "react";
// import styles from "./Entries.module.css";
import "./styles.css";
import UpdateModal from "./UpdateModal";

const Entries = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      {/* {JSON.stringify(props.vehModelIdOfEntry)} */}
      {showUpdateModal && (
        <UpdateModal
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
          vehMakeIdOfEntry={props.vehMakeIdOfEntry}
          vehModelIdOfEntry={props.vehModelIdOfEntry}
          setShowUpdateModal={setShowUpdateModal}
          getVehicleModelData={props.getVehicleModelData}
        />
      )}

      <div className="row entry">
        <p className="col-sm-2">{props.date}</p>
        <p className="col-sm-2">{props.vehicle}</p>
        <p className="col-sm-2">{props.vehModel}</p>
        <p className="col-sm-2">{props.distance}</p>
        <p className="col-sm-2">{props.carbon}</p>
        <button
          className="updatebutton col-sm-1"
          onClick={() => setShowUpdateModal(true)}
        >
          Update
        </button>
        <button className="deletebutton col-sm-1">Delete</button>
      </div>
    </>
  );
};

export default Entries;
