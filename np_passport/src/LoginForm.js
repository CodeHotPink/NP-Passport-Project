import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
            login: false,
            email: "",
            password: "",
            message: ""
        }
        this.userOrGuest = this.userOrGuest.bind(this)
		this.loginForm = this.loginForm.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        console.log(this.state.login)
    })	
	.catch(error => console.error(error));	
	}

    loginForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                Email:
                <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
                </label>
                <label>
                Password:
                <input type="text" value={this.state.value} onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }

    userOrGuest() {
        if (this.state.login === true){
            return (
                <div>
                    this is where I put users info
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.loginForm()}
                </div>
            )
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
