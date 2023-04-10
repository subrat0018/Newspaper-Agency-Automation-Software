import axios from "axios";
import React, { useState } from "react";
import jsPDF from "jspdf";

const GenerateReciept = ({ setModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    paid: 0,
  });
  window.jsPDF = window.jspdf.jsPDF;
  return (
    <div class="overflow-y-auto overflow-x-hidden fixed top-0 left-50 right-24 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Generate Reciept
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModal("");
              }}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <form action="#">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer's Name
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Subrat"
                  required=""
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  type="text"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="abc@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount Paid
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, paid: e.target.value });
                  }}
                  type="number"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="250 rupees"
                  required
                />
              </div>
            </div>
            <button
              onClick={async (e) => {
                if (formData.paid <= 0) {
                  alert("The customer needs to pay more than 0 rupees");
                }
                e.preventDefault();
                const res = await axios.post(
                  "http://localhost:5000/generate-bill",
                  formData
                );
                if (res.data === "err") {
                  alert("Customer Doesn't exist");
                } else {
                  setModal("");
                  alert("Bill generated Successfully");
                  var doc = new jsPDF();

                  doc.text("Name : " + res.data.name, 10, 10);
                  doc.text("Amount Paid : " + formData.paid, 10, 30);
                  doc.text("Amount Due : " + res.data.amountDue, 10, 50);
                  doc.text("Date : " + res.data.lastPaid, 10, 70);
                  doc.text("Digital Signature of NewsFlow Authority", 10, 90);
                  doc.text("Subrat chandra Naha", 10, 100);
                  doc.save(res.data.name + "'s bill.pdf");
                }
              }}
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Generate Bill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateReciept;
