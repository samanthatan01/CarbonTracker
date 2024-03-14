import React from "react";
import { Link } from "react-router-dom";
// import styles from "../components/LoginForm.module.css";

const List = () => {
  return (
    <>
      <div className="container">
        <br />
        <h3>Welcome back</h3>
        <br />
        <div className="row">
          <label className="col-sm-1">Email</label>

          <input
            type="text"
            placeholder="abc@example.com"
            className="col-sm-3"
          ></input>
        </div>
        <br />

        <div className="row">
          <label className="col-sm-1">Password</label>

          <input type="text" placeholder="" className="col-sm-3"></input>
        </div>
        <br />

        <div className="row">
          <Link to="/member/login">
            <button className="col-sm-4" type="button">
              Enter
            </button>
          </Link>
        </div>
        <br />
        <label>Not an existing user? Create a new account here.</label>

        <br />
        <br />
      </div>
    </>
  );
};

export default List;
