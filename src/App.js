import React from 'react';
import './App.css';
import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stationName: 'Unknown',
      name: process.env.NAME
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
