import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <>
      <Link to="/member/login">
        <button type="button" className="col-sm-3">
          Enter
        </button>
      </Link>
    </>
  );
};

export default List;
