import React, { Component } from 'react';
import ReviewItem from './ReviewItem';

class ReviewList extends Component {
	constructor(props){
		super(props);
		this.state = {
			showReviews: false,
			reviews: undefined
		}
		this.renderReviews = this.renderReviews.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.listDisplayReviews = this.listDisplayReviews.bind(this)
		this.fetchReviews = this.fetchReviews.bind(this)
	} 

	componentDidMount() {
		this.fetchReviews()
	}

	listDisplayReviews() {
		console.log(this.state.reviews)
		return this.state.reviews["reviews"].map(review => <ReviewItem review={review} />)
	}

	fetchReviews() {
		fetch("http://localhost:5000/display_park_reviews", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({park:this.props["park"]})
			})
		.then(data => data.json())
		.then((data) => {
			this.setState({reviews: data})
		})	
		.catch(error => console.error(error));	
	}

	handleClick() {
		this.setState({showReviews: !this.state.showReviews})
	}

	renderReviews() {
		if (this.state.showReviews && this.state.reviews) {
			return this.listDisplayReviews()
		} else if (this.state.showReviews) {
			return (<div>Loading ...</div>)
		}
	}

	viewReviewsButton() {
		if (this.state.showReviews) {
			return (<div><button onClick={this.handleClick}>
			Close park's reviews
			</button>
			{this.listDisplayReviews()}
			</div>
			)
		}
		else {
			return <button onClick={this.handleClick}>
			View park's reviews
			</button>
		}
	}

	render() {
		return (
			<div>
				{this.viewReviewsButton()}
				{this.renderReviews()}
			</div>
		)
	}
}

export default ReviewList;
