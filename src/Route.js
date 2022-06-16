import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./components/Auth/Login/Login";
import Dashboard from "./components/Auth/Dashboard/Dashboard";
// import PrivateRoute from './private_routes';
// import PublicRoute from './public_Routes'
function Approutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Approutes;