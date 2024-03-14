import React from "react";

const VehicleMake = (props) => {
  const vehSelection = props.vehModel.map((item) => {
    return <option value={item.data.id}>{item.data.attributes.name}</option>;
  });

  return (
    <>
      <select
        className="col-sm-3"
        // onChange={(event) => props.setVehModel(event.target.value)}
      >
        {vehSelection}
      </select>
    </>
  );
};

export default VehicleMake;
