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
    const fields = [
        {label: 'Loan Amount:', name: 'loanPrincipal' },
        {label: 'Interest Rate:', name: 'interestRate'}
    ]
    return (

            <div className='Debt-container'>
                <form onSubmit={this.handleSubmit}>
                    {fields.map((field) => {
                        const {label, name} = field;
                        return (
                            <>
                            <div className='form-item'>
                                <label> {label} </label>
                                <div className='form-input'>
                                <input 
                                    name={name}
                                    onChange={this.handleInput}
                                    type="number"
                                    autoComplete="off"
                                />
                                </div>
                            </div>
                            <br/>
                            </>
                        )
                    })}
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