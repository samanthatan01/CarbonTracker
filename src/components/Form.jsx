import React, { useState, useEffect } from "react";

const Form = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-sm-2">Date of Activity</div>
        <div className="col-sm-10">
          <input
            type="date"
            placeholder="DD-MM-YYYY"
            className="col-sm-3"
            onChange={(event) => props.setDate(event.target.value)}
            value={props.date}
          ></input>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-2">Select Vehicle Make</div>
        <div className="col-sm-10">
          <select
            className="col-sm-3"
            onChange={(event) => props.setVehMakeId(event.target.value)}
            value={props.vehMakeId}
          >
            <option value="0">Please select</option>
            {props.vehMakeSelection}
          </select>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-2">Select Vehicle Model</div>
        <div className="col-sm-10">
          <select
            className="col-sm-3"
            onChange={(event) => props.setVehModelId(event.target.value)}
            value={props.vehModelId}
          >
            <option value="0">Please select</option>
            {props.vehModelSelection}
          </select>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-2">Distance Travelled (km)</div>
        <div className="col-sm-10">
          <input
            type="text"
            placeholder=" Enter distance travelled in km"
            className="col-sm-3"
            onChange={(event) => props.setDistance(event.target.value)}
            value={props.distance}
          ></input>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-sm-9">
          <button className="col-sm-3">Clear Entry</button>
          <button className="col-sm-3" onClick={props.submitEntry}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
