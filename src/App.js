import React from 'react';

import { fetchData } from './api';

import { Cards, CountryPicker, Chart } from './components';
import styles from './App.module.css';
class App extends React.Component {
    state = {
        data : {},
        country: ''
    }

    async componentDidMount () {
        const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        console.log(country)
        this.setState({data: fetchedData, country: country});

    }

    render () {

        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img src="https://i.ibb.co/7QpKsCX/image.png" alt="Covid19" className="styles.image"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;