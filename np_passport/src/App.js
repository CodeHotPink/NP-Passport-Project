import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import LoginForm from './loginForm';
import ParkList from './ParkList';
import ReviewList from './ReviewList';


class App extends Component {



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            National Parks Passport
          </nav>
        </header>
        <ParkList />
        <ReviewList />
      </div>
    );
  }
}

export default App;
