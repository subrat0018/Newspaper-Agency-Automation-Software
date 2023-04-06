import React from "react";

const Box = ({ service, setModal }) => {
  return (
    <div className="w-1/4 mb-8">
      <button
        onClick={() => {
          console.log(service.split(" ").join(""));
          setModal(service.split(" ").join(""));
        }}
        data-modal-toggle="defaultModal"
        class="w-11/12 h-36 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span class=" flex flex-col justify-center w-full h-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <div>{service}</div>
        </span>
      </button>
    </div>
  );
};

export default Box;
