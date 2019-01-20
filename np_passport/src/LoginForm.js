import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
            login: false,
            email: "",
            password: ""
		}
		this.loginForm = this.loginForm.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
  } 
  handleSubmit(event) {
    event.preventDefault();
    console.log(`this is before we reset state: ${this.state.login}`)
    console.log(this.state.email)
    console.log(this.state.password)
    this.setState({login: !this.state.login})
    console.log(this.state.login)
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
    .then((data) => {
        console.log(data)
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

	render() {
		return (
			<div>
               {this.loginForm()}
			</div>
		)
	}
}
export default LoginForm;
