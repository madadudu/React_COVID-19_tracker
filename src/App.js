import React from 'react';

//import Cards from './components/Cards/Cards';
//import Chart from './components/Chart/Chart';
//import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import image from './images/Screenshot_123.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        //careful with the naming regulations
        const fetchedData = await fetchData();

        //console.log(data);
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        /*console.log(fetchedData);

        //console.log(country);
        // fetch the data
        // set the data
        */
        this.setState({ data: fetchedData, country: country });

    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;