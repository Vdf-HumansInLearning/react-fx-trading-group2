import React from "react";
import useFetch from "./UseFetch";
import '../styles/style-index.css'

function Table() {
    const { data: transactions, error, isPending } = useFetch(`http://localhost:8000/api/transactions`);
    const { data: currencies } = useFetch(`http://localhost:8000/api/currencies/pairs`)
    return (
        <section className="col-sm-12 col-md-12 col-lg-6">
            <h5 className="color-titles">Blotter View</h5>
            <hr />
            <div className="blotter-buttons">
                <p className="subtitle">FILTERS</p>
                <div className="vertical-line"></div><div className="row">
                    {currencies && (
                        <>
                            <div className="input-group col mb-3">
                                <label className="input-group-text" htmlFor="inputCcy">CCY Pair</label>
                                <select className="form-select" id="inputCcy">
                                    <option value="opt_none">Choose..</option>
                                    {currencies.map((pair) => (
                                        <option value={pair} id={pair} key={pair}>{pair}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group col mb-3">
                                <span className="input-group-text">Date</span>
                                <input type="date" className="form-control" id="inputDateFilter" placeholder="12/02/2018" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="table-responsive">
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {transactions && (
                    <table id="blotter-table" className="table table-striped col-xs-7 table-condensed tabe-fixed">
                        <thead className="thead-primary">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username<span> </span><i className="fas fa-sort"></i></th>
                                <th scope="col">CCY Pair<span> </span><i className="fas fa-sort"></i></th>
                                <th scope="col">Rate</th>
                                <th scope="col">Action<span> </span><i className="fas fa-sort"></i></th>
                                <th scope="col">Notional<span> </span><i className="fas fa-sort"></i></th>
                                <th scope="col">Tenor</th>
                                <th scope="col">Transaction Date<span> </span><i className="fas fa-sort"></i></th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {transactions.map((trans, index) => (
                                <tr key={trans.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{trans.username}</td>
                                    <td>{trans.ccy_pair}</td>
                                    <td>{trans.rate}</td>
                                    <td>{trans.action}</td>
                                    <td>{trans.notional}</td>
                                    <td>{trans.tenor}</td>
                                    <td>{trans.trans_date} {trans.trans_hour}</td>
                                    <td>{(trans.rate * trans.notional).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section >
    )
}

export default Table;