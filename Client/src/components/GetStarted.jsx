import React from "react";
import hollywood from "../assets/hollywood.jpg";
import city from "../assets/city.jpg";
import hillClimb from "../assets/hillClimb.jpg";
import ImageCard from "./ImageCard";
const GetStarted = () => {
  return (
    <div className="flex mt-28 justify-center items-center space-x-5">
      <div className="flex flex-col space-y-5">
        <ImageCard src={hollywood} />
        <ImageCard src={city} />
      </div>
      <div>
        <ImageCard src={hillClimb} />
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default GetStarted;
