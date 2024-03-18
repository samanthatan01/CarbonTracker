import React from "react";
import Entries from "./Entries";
import "./styles.css";

const Display = (props) => {
  return (
    <>
      <div className="row entry">
        <div className="col-sm-2">
          <strong>Date</strong>
        </div>
        <div className="col-sm-2">
          <strong>Vehicle</strong>
        </div>
        <div className="col-sm-2">
          <strong>Model</strong>
        </div>
        <div className="col-sm-2">
          <strong>Distance (km)</strong>
        </div>
        <div className="col-sm-2">
          <strong>Carbon Emission (kg)</strong>
        </div>
        <div className="col-sm-2"></div>
      </div>

      {props.entries?.records?.map((item) => {
        return (
          <Entries
            id={item.fields.id}
            date={item.fields.date}
            vehicle={item.fields.vehicle}
            vehModel={item.fields.vehModel}
            vehMakeIdOfEntry={item.fields.vehMakeId}
            vehModelIdOfEntry={item.fields.vehModelId}
            distance={item.fields.distance_value}
            unit={item.fields.distance_unit}
            carbon={item.fields.carbon_kg}
            entries={props.entries}
            getEntries={props.getEntries}
            vehMakeId={props.vehMakeId}
            vehMakeSelection={props.vehMakeSelection}
            vehModelId={props.vehModelId}
            vehModelSelection={props.vehModelSelection}
            getVehicleModelData={props.getVehicleModelData}
          />
        );
      })}
    </>
  );
};

export default Display;
