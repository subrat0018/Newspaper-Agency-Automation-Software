import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useEffect } from "react";
import axios from "axios";

const Navbar = ({ currPage, setCurrPage }) => {
  axios.defaults.withCredentials = true;
  const [uName, setUName] = useState("");
  useEffect(() => {
    const readCookies = async () => {
      const res = await axios.get("http://localhost:5000/read-cookie");
      if (res.data.lenght == 0) setUName("");
      else if (res.data) setUName(res.data[0]?.name);
      else setUName("");
    };
    readCookies();
  }, []);
  const navigate = useNavigate();
  const menu = ["Home", "About", "Services", "Contact"];
  const NavText = ({ name }) => {
    return (
      <li
        onClick={() => {
          setCurrPage(name);
        }}
      >
        <Link
          to={"/" + (name.toLowerCase() === "home" ? "" : name.toLowerCase())}
          class={`"block py-2 pl-3 pr-4 ${
            name !== currPage ? "text-gray-700" : "text-blue-700"
          } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >`}
        >
          {name}
        </Link>
      </li>
    );
  };
  const Button = ({ click, name }) => {
    return (
      <button
        onClick={() => {
          navigate("/" + click);
        }}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {name}
      </button>
    );
  };
  const Logout = ({ name }) => {
    return (
      <button
        onClick={async () => {
          const res = await axios.get("http://localhost:5000/clear-cookie");
          setUName("");
          alert("Logged out Successfully");
          window.location.reload();
        }}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {name}
      </button>
    );
  };
  return (
    <nav class="bg-white px-2 shadow-xl sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" class="flex items-center">
          <img class="w-8 h-8 mr-2 rounded-lg" src={Logo} alt="logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            NewsFlow
          </span>
        </Link>

        <div class="flex md:order-2">
          {!uName && (
            <div className="flex space-x-5">
              <Button click="sign-up" name="Register" />
              <Button click="log-in" name="Login" />
            </div>
          )}
          {uName && <Logout name="Logout" />}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menu.map((item, index) => {
              return <NavText name={item} key={index} />;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
