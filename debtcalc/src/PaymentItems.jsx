import React from 'react';
import MakePayment from './MakePayment';

export default function PaymentItems({ payment }) {
    return(
        <ul className='Payment-list'>
            {payment.map((item) => (
                <li key={item.id}>
                    Date: {item.id}
                    <br/>
                    Payment amount: ${item.paymentAmount}
                </li>
            ))}
        </ul>
    );
}