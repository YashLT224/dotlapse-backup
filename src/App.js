import "./App.css";
import Newproject from "./Containers/Newproject";
import "react-date-range/dist/styles.css"; // main style file

import React from "react";

import "react-date-range/dist/theme/default.css";
import ProjectListings from "./Containers/ProjectListings";
import FirstBuild from "./Containers/FirstBuild";
import BuildsListing from "./Containers/BuildsListing";
import TestDetailView from "./Containers/TestDetailView";
import { Switch, Route, Redirect } from "react-router-dom";
import Error from "./components/ErrorHandling/Handling";
//import { GetTokenAction } from "./services/actions/userDetailsAction";

require("dotenv").config();
function App() {
  return (
    <>
      <div id="lambda__header__wrapper">
        <header className="main__header__placeholder">
          <div className="header__top__menu__placeholder">
            <div className="lambda__logo__wrapper__placeholder" />
          </div>
          <div className="header__aside__menu__placeholder" />
        </header>
      </div>
      <section className="main-section bg-gray-0">
        <Switch>
          <Route path="/" exact component={ProjectListings} />
          <Route path="/createproject" exact component={Newproject} />
          <Route path="/firstBuild" exact component={FirstBuild} />
          <Route path="/builds" exact component={BuildsListing} />
          <Route path="/testDetail" exact component={TestDetailView} />
          <Redirect to="/"></Redirect>
        </Switch>
      </section>
    </>
  );
}

export default App;
