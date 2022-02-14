import React from "react";
import { Component } from "react/cjs/react.production.min";
import Table from "../components/Table";
import Navbar from "./../components/Navbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div id="app">
          <Navbar />
          <main className="container-fluid row mb-5"></main>
          <Table />
        </div>
      </>
    );
  }
}

export default Dashboard;
