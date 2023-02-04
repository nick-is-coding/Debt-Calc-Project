import React from 'react';
import MakePayment from './MakePayment';

export default function PaymentItems({ payment }) {
    return(
        <ul className='Payment-list'>
            {payment.map((item, index) => (
                <li key={index}>
                    Date: {item.id}
                    <br/>
                    Payment amount: ${item.paymentAmount}
                </li>
            ))}
        </ul>
    );
}