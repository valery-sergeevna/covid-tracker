import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './components/api/';

import covidImg from './images/corona.png';

class App extends Component {

  state = {
    data: {},
    country: '',
  }


  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country })
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={covidImg} alt='covid' className={styles.image} />
        </div>
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div >
    );
  }
}

export default App;

