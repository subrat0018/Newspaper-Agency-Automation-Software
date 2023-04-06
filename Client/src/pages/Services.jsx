import React, { useState } from "react";
import Box from "../components/Box";
import Navbar from "../components/Navbar";
import AddCustomerModal from "../components/AddCustomerModal";
import RemoveCustomerModal from "../components/RemoveCustomerModal";
import AddDeliveryManModal from "../components/AddDeliveryManModal";
import RemoveDeliveryMan from "../components/RemoveDeliveryMan";
import AddPublication from "../components/AddPublication";
import RemovePublication from "../components/RemovePublication";
import WitholdSubscription from "../components/WitholdSubscription";
import GenerateBill from "../components/GenerateBill";
import HandleCustomerRequestModal from "../components/HandleCustomerRequestModal";
const Services = ({ email }) => {
  const operationForManager = [
    "Add Customer",
    "Remove Customer",
    "Add Delivery Man",
    "Remove Delivery Man",
    "Add Publication",
    "Remove Publication",
    "Generate Delivery List",
    "Withold Subscription",
    "Generate Bill",
    "Generate Salary",
    "Handle Customer Request",
  ];
  const operationForDeliveryMan = ["Get Delivery List", "Add Customer Request"];
  const activeOperations = operationForManager;
  const [currPage, setCurrPage] = useState("Services");
  const [activeModal, setActiveModal] = useState("");
  const Modal = () => {
    switch (activeModal) {
      case "AddCustomer":
        return <AddCustomerModal setModal={setActiveModal} />;
      case "RemoveCustomer":
        return <RemoveCustomerModal setModal={setActiveModal} />;
      case "AddDeliveryMan":
        return <AddDeliveryManModal setModal={setActiveModal} />;
      case "RemoveDeliveryMan":
        return <RemoveDeliveryMan setModal={setActiveModal} />;
      case "AddPublication":
        return <AddPublication setModal={setActiveModal} />;
      case "RemovePublication":
        return <RemovePublication setModal={setActiveModal} />;
      case "WitholdSubscription":
        return <WitholdSubscription setModal={setActiveModal} />;
      case "GenerateBill":
        return <GenerateBill setModal={setActiveModal} />;
      case "HandleCustomerRequest":
        return <HandleCustomerRequestModal setModal={setActiveModal} />;
      default:
        break;
    }
  };
  return (
    <div>
      <div className={`${activeModal ? "opacity-50 bg-gray-300" : ""}`}>
        <Navbar currPage={currPage} setCurrPage={setCurrPage} />
        <div className="w-3/4 m-auto mt-20 bg-white px-2 shadow-xl sm:px-4 py-2.5 dark:bg-gray-900 z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <h2 className=" font-bold text-3xl text-center mb-8">Services</h2>
          <div className=" flex flex-wrap">
            {activeOperations.map((service) => {
              return <Box service={service} setModal={setActiveModal} />;
            })}
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Services;
