import React from 'react';

function TableHead() {
    return (
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
    )
}

export default TableHead;