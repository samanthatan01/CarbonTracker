import React from "react";

const Overview = (props) => {
  let totalDistance = 0;
  let totalCarbon = 0;

  props.entries?.records?.map((item) => {
    totalDistance += item.fields.distance_value;
    totalCarbon += item.fields.carbon_kg;
  });

  return (
    <div>
      <h6>Emission Dashboard</h6>

      <label>{`Total Distance Travelled (in km) : ${totalDistance} `} </label>
      <br />
      <label>{`Total Carbon Emitted (in kg) : ${totalCarbon}`}</label>
    </div>
  );
};

export default Overview;
