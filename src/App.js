import React from 'react';
import './App.css';
import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'
import DepartureBoard from './components/departureBoard/DepartureBoard'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      origin: {
        "code": "LBG",
        "name": "Greenwich",
        "longitude": 0,
        "latitude": 0,
        "postcode": "SE10 8JQ",
        "operator": "SE"
      },
      destination: {
        "code": "ZFD",
        "name": "Farringdon",
        "longitude": 0,
        "latitude": 0,
        "postcode": "EC1M 6BY",
        "operator": "LT"
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <DepartureBoard origin={this.state.origin} destination={this.state.destination} />
        <Footer />
      </div>
    );
  }
}

export default App;
