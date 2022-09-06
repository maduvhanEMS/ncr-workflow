import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./App.css";
import SideMenu from "./component/SideMenu";
import Status from "./pages/Status";

function App() {
  return (
    <Router>
      <SideMenu />
      <Routes>
        <Route path="/" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
