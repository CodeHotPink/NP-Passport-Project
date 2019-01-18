import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ParkList from './ParkList';
import loginForm from './loginForm'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            National Parks Passport
          </nav>
        </header>
        <loginForm />
        <ParkList />
      </div>
    );
  }
}

export default App;
