import logo from './logo.svg';
import './App.css';
import React from 'react';
import DebtCalc from './DebtCalc';
import MakePayment from './MakePayment';


const PAYMENT_DATA = {
  loanPrincipal: '-',
  interestRate: '-',
  interest: '-',
  numberOfPayments:'-',
  loanTerm: '-',
  totalDebt: '-',
  monthlyPayment: '-',
  paymentAmount: '-',
  minimumPayment: '-'
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = PAYMENT_DATA;
  }

calculateDebt = () => {
  const { loanPrincipal, interestRate, loanTerm } = this.state;
  const interest = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanPrincipal * (interest * Math.pow(1 + interest, numberOfPayments)) / (Math.pow(1 + interest, numberOfPayments) - 1);
  const totalDebt = monthlyPayment * numberOfPayments;
  const minimumPayment = loanPrincipal * .01;
  this.setState({
    monthlyPayment: monthlyPayment.toFixed(2),
    totalDebt: totalDebt.toFixed(2),
    interest: interest,
    numberOfPayments: numberOfPayments
  });
};

handleChange = (name, value) => {
  this.setState({[`${name}`]: value});
}

paymentTowardsDebt = (paymentAmount) => {
  const { interestRate, loanPrincipal, interest, numberOfPayments } = this.state;
  this.setState(prevState => {
    const totalDebt = prevState.totalDebt - paymentAmount;
    const monthlyPayment = totalDebt * (interest * Math.pow(1 + interest, numberOfPayments)) / (Math.pow(1 + interest, numberOfPayments) - 1);
    return { totalDebt: totalDebt.toFixed(2), monthlyPayment: monthlyPayment.toFixed(2) };
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
                    monthlyPayment={this.state.monthlyPayment}
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
                    <h3>Monthly Payments:</h3>
                    ${this.state.monthlyPayment}
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
