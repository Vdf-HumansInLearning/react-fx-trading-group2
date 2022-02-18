import React from 'react';

function TableHead({ sortEntries }) {
    return (
        <thead className="thead-primary">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Username<span> </span><i className="fas fa-sort"
                    onClick={() => sortEntries("username", "alphabetical")}></i></th>
                <th scope="col">CCY Pair<span> </span><i className="fas fa-sort"
                    onClick={() => sortEntries("ccy_pair", "alphabetical")}></i></th>
                <th scope="col">Rate</th>
                <th scope="col">Action<span> </span><i className="fas fa-sort"
                    onClick={() => sortEntries("action", "alphabetical")}></i></th>
                <th scope="col">Notional<span> </span><i className="fas fa-sort"
                    onClick={() => sortEntries("notional", "numerical")}></i></th>
                <th scope="col">Tenor</th>
                <th scope="col">Transaction Date<span> </span><i className="fas fa-sort"
                    onClick={() => sortEntries("trans_date", "date")}></i></th>
                <th scope="col">Amount</th>
            </tr>
        </thead >
    )
}

export default TableHead;