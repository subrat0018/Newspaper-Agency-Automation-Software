import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import Navbar from "../components/Navbar";
import AddCustomerModal from "../components/AddCustomerModal";
import RemoveCustomerModal from "../components/RemoveCustomerModal";
import AddDeliveryManModal from "../components/AddDeliveryManModal";
import RemoveDeliveryMan from "../components/RemoveDeliveryMan";
import AddPublication from "../components/AddPublication";
import RemovePublication from "../components/RemovePublication";
import WitholdSubscription from "../components/WitholdSubscription";
import GenerateReciept from "../components/GenerateReciept";
import HandleCustomerRequestModal from "../components/HandleCustomerRequestModal";
import WhoRecieveWhatModal from "../components/WhoRecieveWhatModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GenerateSalaryModal from "../components/GenerateSalary";
import CheckDuesModal from "../components/CheckDues";
import GenerateBillModal from "../components/GenerateBill";
import GetDeliveryListModal from "../components/GetDeliveryListModal";
import ConfirmDeliveryModal from "../components/ConfirmDeliveryModal";
const Services = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  useEffect(() => {
    const readCookies = async () => {
      const res = await axios.get("http://localhost:5000/read-cookie");
      if (res.data.length === 0) navigate("/log-in");
      else setRole(res.data[1]?.role);
    };
    readCookies();
  }, []);
  const operationForManager = [
    "Add Customer",
    "Remove Customer",
    "Add Delivery Man",
    "Remove Delivery Man",
    "Add Publication",
    "Remove Publication",
    "Who Recieve What",
    "Withold Subscription",
    "Generate Reciept",
    "Generate Salary",
    "Handle Customer Request",
    "Check Dues",
    "Generate Bills",
  ];
  const operationForDeliveryMan = ["Get Delivery List", "Confirm Delivery"];
  let activeOperations;
  if (role === "manager") activeOperations = operationForManager;
  else activeOperations = operationForDeliveryMan;
  const [currPage, setCurrPage] = useState("Services");
  const [activeModal, setActiveModal] = useState("");
  const [customers, setCustomers] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetch = async () => {
      const user = await axios.get("http://localhost:5000/read-cookie");
      const allCustomers = await axios.post(
        "http://localhost:5000/get-delivery",
        { loc: user.data[0].location }
      );
      setCustomers(allCustomers.data);
    };
    fetch();
  }, []);
  //All the modals are conditionally rendered
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
      case "GenerateReciept":
        return <GenerateReciept setModal={setActiveModal} />;
      case "HandleCustomerRequest":
        return <HandleCustomerRequestModal setModal={setActiveModal} />;
      case "WhoRecieveWhat":
        return <WhoRecieveWhatModal setModal={setActiveModal} />;
      case "GenerateSalary":
        return <GenerateSalaryModal setModal={setActiveModal} />;
      case "CheckDues":
        return <CheckDuesModal setModal={setActiveModal} />;
      case "GenerateBills":
        return <GenerateBillModal setModal={setActiveModal} />;
      case "GetDeliveryList":
        return (
          <GetDeliveryListModal
            setModal={setActiveModal}
            customers={customers}
            setCustomers={setCustomers}
          />
        );
      case "ConfirmDelivery":
        return (
          <ConfirmDeliveryModal
            setModal={setActiveModal}
            customers={customers}
            setCustomers={setCustomers}
          />
        );
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
