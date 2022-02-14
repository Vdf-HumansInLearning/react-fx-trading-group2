import React from "react";
import { Component } from "react/cjs/react.production.min";
import Table from "../components/Table";
import RatesView from "../components/RatesView";
import Navbar from "./../components/Navbar";

import '../styles/style-index.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div id="app">
          <Navbar />
          <main className="container-fluid row mb-5">
            <RatesView />
            <Table />
          </main>
        </div>
      </>
    );
  }
}

export default Dashboard;
