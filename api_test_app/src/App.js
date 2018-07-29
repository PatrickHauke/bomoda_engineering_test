import React, { Component } from 'react';

import Uptime from './UptimeDisplay/UptimeDisplay';
import CurrentEndpoints from './Endpoints/CurrentEndpoints';
import TotalEndpoints from './Endpoints/TotalEndpoints';
import InitialDate from './InitialDate/GetInitialDate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        serviceUptime: '0:00:00.000000',
        initialDateTime: '0000-00-00 0:00:00.000000',
        totalEndPointRequests: 0, 
        serviceEndPointRequests: 0
      }
    }
  }

  updateApplicationStatHandler = () => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => this.setState({data}))
  }

  render() {
    const sample = this.state;
    return (
      <div className="App">
        <div className="StatDisplay">
          <Uptime runTime={this.state.data.serviceUptime}/>
          <CurrentEndpoints val={this.state.data.serviceEndPointRequests}/>
          <TotalEndpoints val={this.state.data.totalEndPointRequests}/>
          <InitialDate val={this.state.data.initialDateTime}/>
        </div>    
        <button
          onClick={this.updateApplicationStatHandler}>
          Update Data
        </button>
      </div>
    );
  }
}

export default App;
