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
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      boxShadow: '0 2px 3px blue',
      padding: '20px',
      cursor: 'pointer',
      display: 'flex',
      margin: 'auto'
    };

    const dataStyle = {
      width: '60%',
      margin: 'auto',
      border: '1px solid #eee',
      boxShadow: '0 2px 3px #ccc',
      padding: '16px',
      textAlign: 'center'
    }

    return (
      <div className="App">
        <div className="StatDisplay">
          <Uptime style={dataStyle} runTime={this.state.data.serviceUptime}/>
          <CurrentEndpoints style={dataStyle} val={this.state.data.serviceEndPointRequests}/>
          <TotalEndpoints style={dataStyle} val={this.state.data.totalEndPointRequests}/>
          <InitialDate style={dataStyle} val={this.state.data.initialDateTime}/>
        </div>
        <button
          style={buttonStyle}
          onClick={this.updateApplicationStatHandler}>
          Update Service Status
        </button>   
      </div>
    );
  }
}

export default App;
