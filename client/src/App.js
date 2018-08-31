import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rand: 0
    };

    this.getRandom = this.getRandom.bind(this)
  }
  getRandom() {
    let host = window.location.hostname;
    let protocol = window.location.protocol
    let url = null
    if(host === "localhost"){
      url = protocol + "//" + host + ":3001"
    }else{
      url = protocol + "//" + host
    }
    fetch(`${url}/rand`, {
      method: 'GET'
    }).then(response => response.json())
        .then(json => {
          this.setState({rand: json.value})
        });
  }
  render() {
    return (
        <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <button onClick={this.getRandom}>
    {this.state.rand}
  </button>
    </div>
  );
  }
}
export default App;
