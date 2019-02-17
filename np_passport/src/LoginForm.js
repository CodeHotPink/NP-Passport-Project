import React, { Component } from 'react';
import VisitList from './VisitList';
import UserRegistration from './modal/UserRegistration';
import AddVisit from './modal/AddVisit';
import AddReview from './modal/AddReview';
import {Col, Row, Grid} from 'react-bootstrap';

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
            isShowing: false,
            login: false,
            email: "",
            password: "",
            message: "",
            type: "password",
            userVisits: false
        }
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.userOrGuest = this.userOrGuest.bind(this)
		this.loginForm = this.loginForm.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logOutButton = this.logOutButton.bind(this)
        this.showHide = this.showHide.bind(this)
        this.viewUserVisitsButton = this.viewUserVisitsButton.bind(this)
        this.handleUserVisitsClick = this.handleUserVisitsClick.bind(this)
        this.fetchAllParkNames = this.fetchAllParkNames.bind(this)
  } 

  closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}

  componentDidMount() {
      this.fetchAllParkNames()
  }


  fetchAllParkNames() {
    fetch("http://localhost:5000/all_park_names", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
        })
    .then(data => data.json())
    .then((data) => {
        console.log("test: got all parks")
        console.log(data)
        this.state.allParkNames = data
        }
    )	
    .catch(error => console.error(error));	
    }
  handleSubmit(event) {
    event.preventDefault();
    this.userLogIn()
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }
  showHide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
        type: this.state.type === 'password' ? 'text' : 'password'
    })  
  }
  userLogIn() {
    fetch("http://localhost:5000/user_log_in", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email:this.state.email,
                            password:this.state.password},)
        })
    .then(data => data.json())
    .then((data) => {
        this.setState({message: data["message"]})
        if (this.state.message === "Successfully logged in") {
            this.setState({login: true})
        }
        alert(this.state.message)
    })	
	.catch(error => console.error(error));	
	}

    loginForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                Email:
                </label>
                <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
                <label>
                Password:
                </label>
                <input type={this.state.type} value={this.state.value} onChange={this.handlePasswordChange} />
                <span className="password__show" onClick={this.showHide}>{this.state.type === 'password' ? 'Show' : 'Hide'}</span>
                <br />
                <input type="submit" value="Log In" />
            </form>
        )
    }

    userOrGuest() {
        if (this.state.login === true){
            return (
                <div>
                    <button onClick={this.logOutButton}>
                        Log out
                    </button>
                    <br />
                    {this.viewUserVisitsButton()}
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.loginForm()}
                    <UserRegistration />
                </div>
            )
        }
    }

    logOutButton() {
        this.setState({login: false})        
    }

    handleUserVisitsClick() {
        this.setState({userVisits: !this.state.userVisits})     
    }

    viewUserVisitsButton() {
		if (this.state.userVisits) {
			return (
                <div className='container'>
                    <Row>
                        <button onClick={this.handleUserVisitsClick} style={{margin: 'auto'}}>
                            Close list of your visits
                        </button>
                    </Row>
                    <Row>
                        { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
                        <Col md={6}>
                            <AddVisit allParkNames={this.state.allParkNames} email={this.state.email}/>
                        </Col>
                        <Col md={6}>
                            <AddReview allParkNames={this.state.allParkNames} email={this.state.email}/>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{margin: 'auto'}}>
                            <VisitList allParkNames={this.state.allParkNames} email={this.state.email}/>
                        </div>
                    </Row>
                </div>
            )
		}
		else {
			return <button onClick={this.handleUserVisitsClick}>
			View list of your visits
			</button>
		}
	}

	render() {
		return (
			<div>
               {this.userOrGuest()}
			</div>
		)
	}
}
export default LoginForm;
