import React from "react";
import GetStarted from "../components/GetStarted";
import Navbar from "../components/Navbar";
import { useState } from "react";
const Home = () => {
  const [currPage, setCurrPage] = useState("Home");
  return (
    <div className="flex flex-col">
      <Navbar currPage={currPage} setCurrPage={setCurrPage} />
      <GetStarted />
    </div>
  );
};

export default Home;
