import React, { Component } from 'react';

function CurrenciesPairs({ currencies, filterBlotterTable, handleInputCcy }) {

    return (
        <>
            <div className="input-group col mb-3">
                <label className="input-group-text" htmlFor="inputCcy">CCY Pair</label>
                <select className="form-select" id="inputCcy" name="inputCcy"
                    onChange={handleInputCcy}
                    onClick={filterBlotterTable}
                >
                    <option value="Choose...">Choose..</option>
                    {currencies.map((pair) => (
                        <option value={pair} id={pair} key={pair}>{pair}</option>
                    ))}
                </select>
            </div>
            <div className="input-group col mb-3">
                <span className="input-group-text">Date</span>
                <input type="date" className="form-control" id="inputDateFilter" placeholder="12/02/2018"
                    onChange={filterBlotterTable} />
            </div>
        </>
    )

}

export default CurrenciesPairs;