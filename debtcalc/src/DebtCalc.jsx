import React from 'react';

class DebtCalc extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        loanPrincipal: 0,
        interestRate: 0,
    };
}

handleInput = ({target: {name, value} }) => this.props.handleChange(name, value);

handleSubmit = (e) => {
    e.preventDefault();
    this.props.calculateDebt();
};

render() {
    return (
            <div className='Debt-container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-item'>
                        <label> Loan Amount: </label>
                            <div className='form-input'>
                                <input 
                                    name="loanPrincipal"
                                    onChange={this.handleInput}
                                    type="number"
                                    autoComplete="off"
                                />
                            </div>
                    </div>
                    <br/>
                    <div className='form-item'>
                        <label> Interest Rate: </label>
                            <div className='form-input'>
                                <input
                                    name="interestRate"
                                    onChange={this.handleInput}
                                    type="number"
                                    autoComplete="off"
                                />
                            </div>
                    </div>
                    <br/>
                    <div className='form-item'>
                        <label> Loan Term: </label>
                            <div className='form-input'>
                                <input
                                    name="loanTerm"
                                    onChange={this.handleInput}
                                    type="number"
                                    autoComplete="off"
                                    placeholder="years"
                                />
                            </div>
                    </div>
                    <br/>
                    <div className='form-action'>
                        <input 
                            type="submit"
                            value="calculate"
                            className='calculate-button'
                        />
                    </div>
                </form>
                <br/>
            </div>
            )
        };  
};

export default DebtCalc;