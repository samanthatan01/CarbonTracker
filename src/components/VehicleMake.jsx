import React from "react";

const VehicleMake = (props) => {
  const vehSelection = props.vehModel.map((item) => {
    return <option value={item.data.id}>{item.data.attributes.name}</option>;
  });

  return (
    <div className="row">
      <select
        className="col-sm-6"
        // onChange={(event) => props.setVehModel(event.target.value)}
      >
        {vehSelection}
      </select>
    </div>
  );
};

export default VehicleMake;
