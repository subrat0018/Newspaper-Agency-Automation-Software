import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";

//This is the main App component We wrapped the app in Routes so to move between the pages easily
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<Login />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="services" element={<Services />} />
    </Routes>
  );
}

export default App;
