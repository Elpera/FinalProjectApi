import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import Owners from "./components/Owners"
import OwnerList from "./components/OwnerList";
import AddOwner from "./components/AddOwner";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/employees" className="navbar-brand">
          Employee Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/owners"} className="nav-link">
              Database
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/owners"]} component={OwnerList} />
          <Route exact path="/add" component={AddOwner} />
          <Route path="/owners/:id" component={Owners} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
