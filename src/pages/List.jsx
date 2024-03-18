import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/LoginForm.module.css";

const List = () => {
  return (
    <>
      <div className="container">
        <h3 className="centered">Welcome Back</h3>

        <div className="row centered">
          <div>
            <label className={`${styles.label} col-sm-1`}>Email</label>
            <input
              type="text"
              placeholder=" abc@example.com"
              className={`${styles.input} `}
            ></input>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div>
            <label className={`${styles.label} col-sm-1`}>Password</label>
            <input
              type="text"
              placeholder=" ● ● ● ● ● ● ● ●"
              className={`${styles.input} `}
            ></input>
          </div>
        </div>

        <div className="centered">
          <div className="row">
            <Link to="/member/login">
              <button className={`${styles.loginbutton}`} type="button">
                Enter
              </button>
            </Link>
            <br />
            <br />
            <br />
            <p>Not an existing user? Create a new account here.</p>
          </div>
        </div>
        <br />

        <br />
      </div>
    </>
  );
};

export default List;
