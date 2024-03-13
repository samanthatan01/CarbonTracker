import React from "react";
import Display from "./components/Display";

function App() {
  return (
    <>
      <div className="row">
        <div className="col-sm-3">Choose vehicle type</div>
        <Display className="col-sm-3"></Display>
      </div>
    </>
  );
}

export default App;
