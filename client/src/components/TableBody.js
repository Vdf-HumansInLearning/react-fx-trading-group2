import React from 'react';

function TableBody({ transactions }) {
    return (
        <tbody id="table-body">
            {transactions.map((trans, index) => (
                <tr key={trans.id}>
                    <th scope="row">{index + 1}</th>
                    <td className='username__col'>{trans.username}</td>
                    <td className='ccy__col'>{trans.ccy_pair}</td>
                    <td className='rate__col'>{trans.rate}</td>
                    <td className='action__col'>{trans.action}</td>
                    <td className='notional__col'>{trans.notional}</td>
                    <td className='tenor__col'>{trans.tenor}</td>
                    <td className='date__col'>{trans.trans_date} {trans.trans_hour}</td>
                    <td className='amount__col'>{(trans.rate * trans.notional).toFixed(2)}</td>
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody;