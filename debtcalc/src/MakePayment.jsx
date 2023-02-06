import React from 'react';
import PaymentItems from './PaymentItems';
import styles from './App.css';

class MakePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentAmount: '',
            payment: [],
         };
    }

    handlePaymentAmount = ({ target: {value}} ) => this.setState({ paymentAmount: value });

    addPayment = (e) => {
        e.preventDefault();
        const { paymentAmount } = this.state;
        const { minimumPayment } = this.props;

        if (paymentAmount < minimumPayment - 1) {
          alert("Payment should be greater than 1% of the Loan Principal.");
          return;
        }

        const newPayment = {
            paymentAmount: paymentAmount,
            id: new Date().toLocaleString() + "",
        }
        this.setState((state) => ({ payment: [...state.payment, newPayment]}));
        this.props.paymentTowardsDebt(paymentAmount);
    }

    render() {
        return(
            <div className='Container'>
                <div className='Payment-container'>
                    <h2 className="Uni-header">Payment Portal</h2>
                    <br/>
                    <div className='Payment-amount'>
                        <form onSubmit={this.addPayment}>
                            <div className='form-item'>
                            <label htmlFor="PaymentAmount">Payment Amount:</label>
                            <input 
                                type="number"
                                className='form-input'
                                onChange={this.handlePaymentAmount}
                                value={this.state.paymentAmount}
                            />
                            </div>
                            <div className='form-action'>
                                <input 
                                    type="submit"
                                    value="make payment"
                                    className='make-payment-button'
                                />
                            </div>
                        </form>
                    </div>
                    
                    <br/>
                </div>
                <div className='Payment-history'>
                    <h4>Payment History:</h4>
                    <div className='Payment-box'>
                        <PaymentItems 
                            payment={this.state.payment}
                            paymentAmount={this.state.paymentAmount}
                            remainingAmount={this.state.id}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

export default MakePayment;