import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./component/Menu";
import SideMenu from "./component/SideMenu";
import Workflow from "./pages/Workflow";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AddNCR from "./pages/AddNCR";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addncr" element={<AddNCR />} />
      </Routes>
    </Router>
  );
}

export default App;
