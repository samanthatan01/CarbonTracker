import React from "react";
import styles from "./Entries.module.css";

const Entries = (props) => {
  return (
    <>
      <div className={`row ${styles.entry}`}>
        <div className="col-sm-2">{props.date}</div>
        <div className="col-sm-2">{props.vehicle}</div>
        <div className="col-sm-2">{props.vehModel}</div>
        <div className="col-sm-2">{props.distance}</div>
        <div className="col-sm-2">{props.carbon}</div>
        <button className="col-sm-1">Update</button>
        <button className="col-sm-1">Delete</button>
      </div>
    </>
  );
};

export default Entries;
