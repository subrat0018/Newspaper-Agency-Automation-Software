import React from "react";
import GetStarted from "../components/GetStarted";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <GetStarted />
    </div>
  );
};

export default Home;
