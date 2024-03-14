import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  return;
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          date={props.date}
          vehicle={props.vehicle}
          vehModel={props.vehModel}
          vehModelId={props.vehModelId}
          distance={props.distance_value}
          unit={props.distance_unit}
          carbon={props.carbon_kg}
          getEntries={props.getEntries}
          setShowUpdateModal={props.setShowUpdateModal}
        ></Overlay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
