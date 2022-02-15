import React, { Component } from 'react';

class CurrenciesPairs extends Component {

    render() {
        return (
            <>
                <div className="input-group col mb-3">
                    <label className="input-group-text" htmlFor="inputCcy">CCY Pair</label>
                    <select className="form-select" id="inputCcy">
                        <option value="opt_none">Choose..</option>
                        {this.props.currencies.map((pair) => (
                            <option value={pair} id={pair} key={pair}>{pair}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group col mb-3">
                    <span className="input-group-text">Date</span>
                    <input type="date" className="form-control" id="inputDateFilter" placeholder="12/02/2018" />
                </div>
            </>
        )
    }
}

export default CurrenciesPairs;