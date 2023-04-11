import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//subscription withold modal
const WitholdSubscription = ({ setModal }) => {
  const [publications, setPublications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    publicationName: "",
    publicationLanguage: "",
    time: 0,
  });
  useEffect(() => {
    fetch = async () => {
      const res = await axios.get("http://localhost:5000/get-publication");
      setPublications([...res.data]);
    };
    fetch();
  }, []);
  return (
    <div class="overflow-y-auto overflow-x-hidden fixed top-0 left-50 right-24 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Withold Subscription
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
                    setFormData({ ...formData, customerName: e.target.value });
                  }}
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Subrat"
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer's Email
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, customerEmail: e.target.value });
                  }}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="abc@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Publication Name
                </label>
                <select
                  onChange={async (e) => {
                    if (!e.target.value) return;
                    setFormData({
                      ...formData,
                      publicationName: e.target.value,
                    });
                    const langs = await axios.post(
                      "http://localhost:5000/get-lang",
                      {
                        publication: e.target.value,
                      }
                    );
                    setLanguages([...langs.data]);
                  }}
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select publication</option>
                  {publications?.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  for="language"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Language
                </label>
                <select
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      publicationLanguage: e.target.value,
                    });
                  }}
                  id="language"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Language</option>
                  {languages.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  for="time"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount of Time(in Days)
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, time: e.target.value });
                  }}
                  type="number"
                  name="time"
                  id="time"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="2 Days"
                  required
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reason for Withold
                </label>
                <textarea
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Reason for Withold"
                ></textarea>
              </div>
            </div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await axios.post(
                  "http://localhost:5000/withold-subscription",
                  formData
                );
                alert(res.data);
                setModal("");
                setFormData({
                  customerName: "",
                  customerEmail: "",
                  publicationName: "",
                  publicationLanguage: "",
                  time: 0,
                });
              }}
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Confirm Withold
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WitholdSubscription;
