import React from "react";
import useFetch from "./UseFetch";
import '../styles/style-index.css'
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import CurrenciesPairs from "./CurrenciesPairs";

function Table() {
    const { data: transactions, error, isPending } = useFetch(`http://localhost:8080/api/transactions`);
    const { data: currencies } = useFetch(`http://localhost:8080/api/currencies/pairs`);

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
                        <TableHead />
                        <TableBody transactions={transactions} />
                    </table>
                )}
            </div>
        </section >
    )
}

export default Table;