import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ParkList from './ParkList';
import LoginForm from './LoginForm'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            National Parks Passport
          </nav>
        </header>
        <LoginForm />
        <ParkList />
      </div>
    );
  }
}

export default App;
