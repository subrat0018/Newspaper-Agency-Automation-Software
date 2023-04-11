import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

//Modal to check dues
const CheckDuesModal = ({ setModal }) => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const allCustomers = await axios.get(
        "http://localhost:5000/get-customer"
      );

      setCustomers(allCustomers.data);
    };
    fetch();
  }, []);
  return (
    <div class="overflow-y-auto overflow-x-hidden fixed top-0 left-50 right-24 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-6xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Dues of Customers
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

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Customer Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Amount Due
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Outstanding Time (In Days)
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subscription Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      <td class="px-6 py-4">{item.email}</td>
                      <td class="px-6 py-4">{item.amountDue}</td>
                      <td class="px-6 py-4">
                        {Math.ceil(
                          Math.abs(new Date(item.lastPaid) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </td>
                      <td class="px-6 py-4">
                        {Math.ceil(
                          Math.abs(new Date(item.lastPaid) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ) > 60
                          ? "Discontinued"
                          : "Continued"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={async () => {
              const res = await axios.get("http://localhost:5000/send-mail");
              alert(res.data);
            }}
            type="submit"
            class="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send Reminder Mails
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckDuesModal;
