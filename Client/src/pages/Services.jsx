import React, { useState } from "react";
import Box from "../components/Box";
import Navbar from "../components/Navbar";
const Services = ({ email }) => {
  const operationForManager = [
    "Add Customer",
    "Remove Customer",
    "Add Deliver Man",
    "Remove Delivery Man",
    "Add Product",
    "Remove Product",
    "Generate Delivery List",
    "Withold Subscription",
    "Generate Bills",
    "Generate Salary",
    "Handle Customer Request",
  ];
  const operationForDeliveryMan = ["Get Delivery List", "Add Customer Request"];
  const activeOperations = operationForManager;
  const [currPage, setCurrPage] = useState("Services");
  return (
    <div>
      <Navbar currPage={currPage} setCurrPage={setCurrPage} />
      <div className="w-3/4 m-auto mt-20 bg-white px-2 shadow-xl sm:px-4 py-2.5 dark:bg-gray-900 z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <h2 className=" font-bold text-3xl text-center mb-8">Services</h2>
        <div className=" flex flex-wrap">
          {activeOperations.map((service) => {
            return <Box service={service} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
