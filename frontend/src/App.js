import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import Owners from "./components/Owners/Owners"
import OwnerList from "./components/Owners/OwnerList";
import AddOwner from "./components/Owners/AddOwner";
import VehiclesList from "./components/Vehicles/VehiclesList";
import AddVehicles from "./components/Vehicles/AddVehicles";
import Vehicle from "./components/Vehicles/Vehicles";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/employees" className="navbar-brand">
          Claims Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/owners"} className="nav-link">
              Drivers Database
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/vehicles"} className="nav-link">
              Vehicles Database
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/claims"} className="nav-link">
              Claims Database
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/owners"]} component={OwnerList} />
          <Route exact path="/owners/add" component={AddOwner} />
          <Route path="/owners/edit/:id" component={Owners} />
        </Switch>
        <Switch>
          <Route exact path={["/", "/vehicles"]} component={VehiclesList} />
          <Route exact path="/vehicles/add/:id" component={AddVehicles} />
          <Route path="/vehicles/edit/:id" component={Vehicle} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
