import React from 'react';

function TableBody({ transactions }) {
    return (
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
    )
}

export default TableBody;