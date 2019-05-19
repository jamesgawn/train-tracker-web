import React from 'react';
import './DepartureBoard.css';
import Axios from 'axios'

class DepartureBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      board: null,
      loading: false
    }
  }

  async componentDidMount () {
    return this.loadDepartureBoard()
  }

  async loadDepartureBoard () {
    try {
      this.setState({
        loading: true,
        board: null
      })
      let apiEndpoint = process.env.REACT_APP_TRAIN_TRACKER_API_ENDPOINT
      let board = await Axios.get(apiEndpoint + '/departureBoard/' + this.props.origin + '/' + this.props.destination)
      this.setState({
        board: board.data.data.trainServices,
        loading: false
      })
    } catch (err) {
      console.log(err)
      this.setState({
        board: null,
        loading: false
      })
    }
  }

  get departureBoard () {
    return this.state.board.map((service) =>
      <tr key={service.serviceId} className="DepartureBoard-trainService">
        <td className="DepartureBoard-trainService-std">{service.std}</td>
        <td className="DepartureBoard-trainService-etd">{service.etd}</td>
        <td className="DepartureBoard-trainService-platform">{service.platform}</td>
        <td className="DepartureBoard-trainService-destination">{service.destination.name}</td>
      </tr>
    )
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="DepartureBoard">
          Loading...
        </div>
      );
    }
    else if (this.state.board === null) {
      return (
        <div className="DepartureBoard">
          No Departure Board Unavailable
        </div>
      );
    }
    else
    {
      if (this.state.board.length > 0) {
        return (
          <div className="DepartureBoard">
            <table>
              <thead>
                <tr className="DepartureBoard-trainService">
                  <th className="DepartureBoard-trainService-std">STD</th>
                  <th className="DepartureBoard-trainService-etd">ETD</th>
                  <th className="DepartureBoard-trainService-platform">Platform </th>
                  <th className="DepartureBoard-trainService-destination">Destination</th>
                </tr>
              </thead>
              <tbody>
                {this.departureBoard}
              </tbody>
            </table>
          </div>
        );
      }
      else
      {
        return (
          <div className="DepartureBoard">
              No services scheduled.
          </div>
        );
      }

    }
  }
}

export default DepartureBoard;