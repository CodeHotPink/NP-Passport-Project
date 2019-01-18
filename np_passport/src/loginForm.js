import React, { Component } from 'react';

class loginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			loginForm: true
		}
		this.renderReviews = this.loginForm.bind(this)
		this.handleClick = this.handleClick.bind(this)
  } 
//   handleClick() {
// 	this.setState({showReviews: !this.state.showReviews})
//   }
//   userLogIn() {
//     fetch("http://localhost:5000/user_log_in", {
//         method: "POST",
//         mode: "cors",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({park:this.props["park"]})
//         })
//     .then(data => data.json())
//     .then((data) => {
//         this.listDisplayReviews(data)
//     })	
// 		.catch(error => console.error(error));	
// 	}

    loginForm() {
        return(
        <form action="/user_log_in">
            Email: <input type="text" name="email"> </input>
            Password: <input type="text" name="password"></input>
        <button onClick={this.handleClick}>
            <input type="submit" value="submit"></input>
        </button>
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
export default loginForm;
