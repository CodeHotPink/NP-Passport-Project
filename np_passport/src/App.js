import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ParkList from './ParkList';
import LoginForm from './LoginForm'
import boot from './images/boot.png';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <img src={boot} height='40' />Trekker
          </nav>
        </header>
        <LoginForm />
        <ParkList />
      </div>
    );
  }
}

export default App;
