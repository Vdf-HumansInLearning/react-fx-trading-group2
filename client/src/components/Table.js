import React, { useState } from "react";
import useFetch from "./UseFetch";
import '../styles/style-index.css'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import CurrenciesPairs from "./CurrenciesPairs";

function Table() {
    const { data: transactions, error, isPending } = useFetch(`http://localhost:8080/api/transactions`);
    const { data: currencies } = useFetch(`http://localhost:8080/api/currencies/pairs`);
    const [sortObj, setSortObj] = useState({
        username: true,
        ccy_pair: true,
        action: true,
        notional: true,
        trans_date: true,
    });
    const [trans, setTrans] = useState({
        trans: transactions
    })

    function sortEntries(property, sortType) {
        let filteredRegistrations = [];
        let currentSelectionTable = transactions;

        switch (sortType) {
            case "alphabetical":
                if (sortObj[property]) {
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
                if (sortObj[property]) {
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
                if (sortObj[property]) {
                    filteredRegistrations = currentSelectionTable.sort((a, b) => {
                        let { firstDate, secondDate } = parseDates(
                            a,
                            b,
                            property,
                            "trans_hour"
                        );
                        return firstDate - secondDate;
                    });
                } else {
                    filteredRegistrations = currentSelectionTable.sort((a, b) => {
                        let { firstDate, secondDate } = parseDates(
                            a,
                            b,
                            property,
                            "trans_hour"
                        );
                        return secondDate - firstDate;
                    });
                }
                break;
        }
        setSortObj({
            ...sortObj,
            [property]: !sortObj[property],
        })
        setTrans({
            trans: filteredRegistrations
        });
    }

    function parseDates(a, b, property, propertyHour) {
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

    return (
        <section className="col-sm-12 col-md-12 col-lg-6">
            <h5 className="color-titles">Blotter View</h5>
            <hr />
            <div className="blotter-buttons">
                <p className="subtitle">FILTERS</p>
                <div className="vertical-line"></div>
                <div className="row">
                    {currencies && (
                        <CurrenciesPairs currencies={currencies} transactions={transactions} />
                    )}
                </div>
            </div>
            <div className="table-responsive">
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {transactions && (
                    <table id="blotter-table" className="table table-striped col-xs-7 table-condensed tabe-fixed">
                        <TableHead sortEntries={sortEntries} />
                        <TableBody transactions={transactions} />
                    </table>
                )}
            </div>
        </section >
    )
}

export default Table;