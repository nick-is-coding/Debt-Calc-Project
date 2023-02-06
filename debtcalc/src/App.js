import logo from './logo.svg';
import './App.css';
import React from 'react';
import DebtCalc from './DebtCalc';
import MakePayment from './MakePayment';


const PAYMENT_DATA = {
  loanPrincipal: 0,
  interestRate: 0,
  interest: 0,
  numberOfPayments: 12,
  totalDebt: 0,
  initialDebt: 0,
  paymentAmount: 0,
  minimumPayment: 0
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = PAYMENT_DATA;
  }

  calculateDebt = () => {
    const { loanPrincipal, interestRate } = this.state;
    const principal = loanPrincipal;
    const interestDec = interestRate / 100;
    const interest = (principal * interestDec) / 12;
    const numberOfPayments = 12;
    const initialDebt = (principal / 1) + interest;
    const minimumPayment = (principal *.01) + interest;
    const totalDebt = initialDebt;
    this.setState({
      initialDebt: initialDebt.toFixed(2),
      totalDebt: totalDebt.toFixed(2),
      interest: interest.toFixed(2),
      numberOfPayments: numberOfPayments,
      minimumPayment: minimumPayment.toFixed(2),
    });
  };

handleChange = (name, value) => {
  this.setState({[`${name}`]: value});
}


paymentTowardsDebt = (paymentAmount) => {
  const { interestRate } = this.state;
  this.setState(prevState => {
    const totalDebt = paymentAmount == prevState.totalDebt ? 0 : (prevState.totalDebt - paymentAmount);
    console.log(totalDebt);
    const minimumPayment = totalDebt == 0 ? 0 : ((totalDebt * .01) + (totalDebt * (interestRate / 100 / 12)));
    const newTotalDebt = totalDebt + (totalDebt * (interestRate / 100 / 12));
    console.log(newTotalDebt);
    return { 
      totalDebt: newTotalDebt.toFixed(2), 
      minimumPayment: minimumPayment.toFixed(2) 
    };
  });
};


render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Calculate your debt!</h1>
            <div className='Main-container'>
              <div className='Left-container'>
                <DebtCalc 
                  calculateDebt={this.calculateDebt}
                  handleChange={this.handleChange}
                />
              <div/>
              <div className='Payment-container'>
                  <MakePayment
                    minimumPayment={this.state.minimumPayment}
                    totalDebt={this.state.totalDebt}
                    paymentTowardsDebt={this.paymentTowardsDebt}
                    interestRate={this.state.interestRate}
                    loanPrincipal={this.state.loanPrincipal}
                  />
              </div>
            </div>
            <div className='Right-container'>
              <div className='Total-container'>
                <h2 className="Uni-header">Current Debt</h2>
                  <div>
                    <h3>Minimum Payment:</h3>
                    ${this.state.minimumPayment}
                  </div>
                  <div>
                    <h3>Debt Remaining:</h3>
                    ${this.state.totalDebt}
                  </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
