import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
function App() {
  const [email, setEmail] = useState("");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp setEmail={setEmail} />} />
      <Route
        path="log-in"
        element={<Login  setEmail={setEmail} />}
      />
      <Route path="about" element={<AboutUs />} />
      <Route path="services" element={<Services />} />
    </Routes>
  );
}

export default App;
