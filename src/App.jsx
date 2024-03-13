import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Member from "./pages/Member";
import List from "./pages/List";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Suspense fallback={<h2>loading...</h2>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="member/:id" element={<Member />} />
          <Route path="member/list" element={<List />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
