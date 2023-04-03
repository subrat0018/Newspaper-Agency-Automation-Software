import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<Login />} />
    </Routes>
  );
}

export default App;
