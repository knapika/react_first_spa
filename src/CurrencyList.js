import React from 'react';
import axios from 'axios';

const Title = () => {
    return (
        <div>
            <div>
                <h1>Enter the currency code</h1>
            </div>
        </div>
    );
};

export default class CurrencyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curCode: '',
            desc: '',
            rate: '',
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    handleSubmit(event) {
        var URL = "https://api.coindesk.com/v1/bpi/currentprice/" + this.state.value.toUpperCase() +".json";
        axios.get(URL)
            .then(res => {
                var choosedCurr = Object.values(res.data.bpi)[1];
                if(!choosedCurr){
                    choosedCurr = Object.values(res.data.bpi)[0];
                }
                this.setState({
                    curCode: choosedCurr.code,
                    desc: choosedCurr.description,
                    rate: choosedCurr.rate,
                });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Title title/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Code:
                        <input type="text" value={this.state.value}  onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>Currency code: {this.state.curCode}</div>
                <div>Currency description: {this.state.desc}</div>
                <div>Currency rate: {this.state.rate}</div>
            </div>

        )
    }
}