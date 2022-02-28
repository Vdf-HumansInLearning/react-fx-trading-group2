import React, { Component } from "react";
import '../styles/style-index.css'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import CurrenciesPairs from "./CurrenciesPairs";
import Toast from "./Toast";

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortObj: [{
                username: true,
                ccy_pair: true,
                action: true,
                notional: true,
                trans_date: true
            }],
            toast: {
                isShown: false,
                toastTitle: "",
                toastMessage: "",
                toastType: "success",
            },
            inputCcy: null,
            transactions: props.trans,
            registartions: props.trans,
            currentSelectionTable: []
        };
        this.sortEntries = this.sortEntries.bind(this);
        this.parseDates = this.parseDates.bind(this);
        this.filterBlotterTable = this.filterBlotterTable.bind(this);
        this.handleInputCcy = this.handleInputCcy.bind(this);

        this.setState({ currencies: props.currencies })

    }

    handleInputCcy(e) {
        this.setState({ inputCcy: e.target.value })
    }

    sortEntries(property, sortType) {
        let filteredRegistrations = [];
        let currentSelectionTable = this.state.transactions;

        switch (sortType) {
            case "alphabetical":
                if (this.state.sortObj[property]) {
                    filteredRegistrations = currentSelectionTable.sort((a, b) =>
                        a[property].toLowerCase().localeCompare(b[property].toLowerCase())
                    );
                } else {
                    filteredRegistrations = currentSelectionTable.sort((a, b) =>
                        b[property].toLowerCase().localeCompare(a[property].toLowerCase())
                    );
                }
                break;
            case "numerical":
                if (this.state.sortObj[property]) {
                    filteredRegistrations = currentSelectionTable.sort(
                        (a, b) => a[property] - b[property]
                    );
                } else {
                    filteredRegistrations = currentSelectionTable.sort(
                        (a, b) => b[property] - a[property]
                    );
                }
                break;
            case "date":
                if (this.state.sortObj[property]) {
                    filteredRegistrations = currentSelectionTable.sort((a, b) => {
                        let { firstDate, secondDate } = this.parseDates(
                            a,
                            b,
                            property,
                            "trans_hour"
                        );
                        return firstDate - secondDate;
                    });
                } else {
                    filteredRegistrations = currentSelectionTable.sort((a, b) => {
                        let { firstDate, secondDate } = this.parseDates(
                            a,
                            b,
                            property,
                            "trans_hour"
                        );
                        return secondDate - firstDate;
                    });
                }
                break;
            default:
                break;
        }
        this.setState({
            transactions: filteredRegistrations,
            registartions: filteredRegistrations,
            sortObj: {
                ...this.state.sortObj,
                [property]: !this.state.sortObj[property]
            }
        })
    }

    parseDates(a, b, property, propertyHour) {
        let incomingDateA = a[property].substring(0, 10);
        let newIncomingDateA = incomingDateA.split("/");
        [newIncomingDateA[0], newIncomingDateA[1]] = [
            newIncomingDateA[1],
            newIncomingDateA[0],
        ];

        incomingDateA = newIncomingDateA.join("/");
        let incomingHourA = a[propertyHour];
        let dateA = `${incomingDateA} ${incomingHourA}`;
        let firstDate = new Date(dateA);

        let incomingDateB = b[property].substring(0, 10);
        let newIncomingDateB = incomingDateB.split("/");
        [newIncomingDateB[0], newIncomingDateB[1]] = [
            newIncomingDateB[1],
            newIncomingDateB[0],
        ];

        incomingDateB = newIncomingDateB.join("/");
        let incomingHourB = b[propertyHour];
        let dateB = `${incomingDateB} ${incomingHourB}`;
        let secondDate = new Date(dateB);

        return {
            firstDate: firstDate,
            secondDate: secondDate,
        };
    }

    filterBlotterTable() {
        let selectedDate = document.getElementById("inputDateFilter").value;
        let dateArray = selectedDate.split("-").reverse();
        selectedDate = dateArray.join("/");
        let currentSelectionTable = this.state.registartions;

        //ccy input and date input exist
        if (this.state.inputCcy !== "opt_none" && selectedDate.length !== 0) {
            const selectedPair = document.getElementById("inputCcy").value;
            currentSelectionTable = currentSelectionTable
                .filter((i) => i.ccy_pair === selectedPair)
                .filter((i) => i.trans_date.startsWith(selectedDate));
            if (currentSelectionTable.length === 0) {
                this.setState({
                    toast: {
                        isShown: true,
                        toastTitle: "Not found",
                        toastMessage: "There are no registrations available for selected filters. Please select another options.",
                        toastType: "fail"
                    }
                });
                setTimeout(() => {
                    this.setState({
                        toast: {
                            isShown: false
                        }
                    })
                }, 2000)
            }

        }
        //ccy input exists but date input doesn`t
        else if (this.state.inputCcy !== "opt_none" && selectedDate.length === 0) {
            const selectedPair = document.getElementById("inputCcy").value;
            currentSelectionTable = currentSelectionTable
                .filter((i) => i.ccy_pair === selectedPair);
            if (currentSelectionTable.length === 0) {
                this.setState({
                    toast: {
                        isShown: true,
                        toastTitle: "Not found",
                        toastMessage: "There are no registrations available for selected filters. Please select another options.",
                        toastType: "fail"
                    }
                });
                setTimeout(() => {
                    this.setState({
                        toast: {
                            isShown: false
                        }
                    })
                }, 2000)
            }

        }
        //date input exists but ccy input doesn`t
        else if (this.state.inputCcy === "opt_none" && selectedDate.length !== 0) {
            currentSelectionTable = currentSelectionTable.filter((i) =>
                i.trans_date.startsWith(selectedDate)
            );
            if (currentSelectionTable.length === 0) {
                this.setState({
                    toast: {
                        isShown: true,
                        toastTitle: "Not found",
                        toastMessage: "There are no registrations available for selected filters. Please select another options.",
                        toastType: "fail"
                    }
                });
                setTimeout(() => {
                    this.setState({
                        toast: {
                            isShown: false
                        }
                    })
                }, 2000)
            }
        }
        this.setState({ transactions: currentSelectionTable })
    }

    render() {
        return (
            <section className="col-sm-12 col-md-12 col-lg-6" >
                <Toast
                    isShown={this.state.toast.isShown}
                    toastTitle={this.state.toast.toastTitle}
                    toastMessage={this.state.toast.toastMessage}
                    toastType={this.state.toast.toastType}
                />
                <h5 className="color-titles">Blotter View</h5>
                <hr />
                <div className="blotter-buttons">
                    <p className="subtitle">FILTERS</p>
                    <div className="vertical-line"></div>
                    <div className="row">
                        {this.props.currencies && (
                            <CurrenciesPairs currencies={this.props.currencies} filterBlotterTable={this.filterBlotterTable} handleInputCcy={this.handleInputCcy} />
                        )}
                    </div>
                </div>
                <div className="table-responsive">
                    <table id="blotter-table" className="table table-striped col-xs-7 table-condensed tabe-fixed">
                        <TableHead sortEntries={this.sortEntries} />
                        <TableBody transactions={this.props.trans} />
                    </table>
                </div>
            </section >
        )
    }
}

export default Table;