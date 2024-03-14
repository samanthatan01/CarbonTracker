import React from "react";
import Entries from "./Entries";
import styles from "./Entries.module.css";

const Display = (props) => {
  console.log(props);

  return (
    <>
      <div className={`row ${styles.entry}`}>
        <div className="col-sm-2">Date</div>
        <div className="col-sm-2">Vehicle</div>
        <div className="col-sm-2">Model</div>
        <div className="col-sm-2">{`Distance (km)`}</div>
        <div className="col-sm-2">{`Est. Carbon Emission (kg)`}</div>
        <div className="col-sm-2"></div>
      </div>

      {/* {JSON.stringify(props.entries?.records)} */}
      {/* <Entries></Entries> */}
      {props.entries?.records?.map((item) => {
        return (
          <Entries
            date={item.fields.date}
            vehicle={item.fields.vehicle}
            vehModel={item.fields.vehModel}
            distance={item.fields.distance_value}
            unit={item.fields.distance_unit}
            carbon={item.fields.carbon_kg}
          />
        );
      })}
    </>
  );
};

export default Display;
