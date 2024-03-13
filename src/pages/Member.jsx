import React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Display from "../components/Display";

const Member = () => {
  const params = useParams();

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <Form></Form>
        </div>

        <br />
        <div className="col-md-3">
          <Display></Display>
        </div>
      </div>
    </>
  );
};

export default Member;
