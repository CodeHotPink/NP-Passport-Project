// import React, { Component } from 'react';

// class logInForm extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			reviews: data['data'],
// 			review: data['data'][0],
// 			showReviews: false
// 		}
// 		this.renderReviews = this.renderReviews.bind(this)
// 		this.handleClick = this.handleClick.bind(this)
//   } 
//   handleClick() {
// 		this.setState({showReviews: !this.state.showReviews})
//   }
//   userLogIn() {
// 		let url = new URL("http://localhost:5000/display_park_reviews"),
// 			params = {park:this.props["park"]};
// 		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
// 		url = url['href'];
// 		String(url);
// 		fetch({url}, {
// 			method: "GET",
// 			mode: "cors",
// 			credentials: "include",
// 			headers: {
// 				"Content-Type": "application/database"
// 			}
// 			})
// 		.then(data => data.json())
// 		.then((data) => {
// 			console.log(data)
// 		})	
// 		.catch(error => console.error(error));	
// 	}

// 	render() {
// 		const {reviews, review} = this.state;
// 		return (
// 			<div>
//         Enter email here
//         Enter password here
// 				<button onClick={this.handleClick}>
// 					Log in
// 				</button>
// 			</div>
// 		)
// 	}
// }
// export default ReviewList;
