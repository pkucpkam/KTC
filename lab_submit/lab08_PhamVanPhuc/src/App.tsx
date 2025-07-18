import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginFormUI from "./components/LoginForm";
import RegisterFormUI from "./components/SignupForm";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginFormUI />} />
                <Route path="/register" element={<RegisterFormUI />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
