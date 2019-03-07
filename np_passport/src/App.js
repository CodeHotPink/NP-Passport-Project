import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ParkList from './ParkList';
import LoginForm from './LoginForm'
import boot from './images/boot.png';
import {Navbar} from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar.Brand href="#home">
            <img src={boot} height='40' />Trekker
          </Navbar.Brand>
        </header>
        <LoginForm />
        <ParkList />
      </div>
    );
  }
}

export default App;
