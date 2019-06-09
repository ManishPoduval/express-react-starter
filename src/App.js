import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      message: '',
      place: '',
      error: false,
      errorMessage: '',
      responseReturned: false,
      locName: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      place: event.target.value,
    })
  }

  handleSubmit = (event) => {
    this.setState({
      responseReturned: false,
      error: false,
    })
    const key = 'AIzaSyDFbWCbxnezS91Cd3HP7VeNzLLwlBY3ZQk'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.place}&key=${key}`
        fetch(url)
      .then(response => response.json())
      .then(json => {
        const {results, error_message} = json

        if (results && results.length) {
            const locationObj = results[0].geometry.location
            console.log(locationObj)
            var data = {location: locationObj};
              fetch('/api/location', {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(json => this.setState({
                 locName: json.locName,
                 responseReturned: true,
                 }));
        }
        else {
          this.setState({
            error: true,
            errorMessage: error_message
          })
        }
      });
    event.preventDefault();
  }

  render() {
    const {error, errorMessage, responseReturned, locName} = this.state;

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        <label>
          Enter Place:
          <input type="text" value={this.state.place} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {
        error ? <div className="errorDiv">{errorMessage}</div> : null
      }
      {
        responseReturned ? <div>Output: {locName}</div> : null
      }
      </div>
    );
  }
}

export default App;
