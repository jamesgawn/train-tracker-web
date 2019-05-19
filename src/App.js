import React from 'react';
import './App.css';
import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'
import DepartureBoard from './components/departureBoard/DepartureBoard'
import { BrowserRouter as Router, Route } from "react-router-dom";

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

  static departureBoard({match}) {
    console.log({
      origin: match.params.origin,
      desintation: match.params.destination
    })
    return (
      <DepartureBoard origin={match.params.origin} destination={match.params.destination} />
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" render={ () => {
            return <DepartureBoard origin={this.state.origin.code} destination={this.state.destination.code} />
          }} />
          <Route exact path="/:origin/:destination" component={this.departureBoard} />
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
