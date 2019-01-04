import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import LoginForm from './loginForm';
import ParkList from './ParkList';


class App extends Component {



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            National Parks Passport
            <ParkList />
          </nav>
        </header>
      </div>
    );
  }
}

export default App;
