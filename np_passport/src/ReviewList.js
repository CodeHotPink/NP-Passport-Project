import React, { Component } from 'react';
import data from './review_data';
import ReviewItem from './ReviewItem';

class ReviewList extends Component {
	constructor(props){
		super(props);
		this.state = {
			reviews: data['data'],
			review: data['data'][0],
			showReviews: false
		}
		this.renderReviews = this.renderReviews.bind(this)
		this.handleClick = this.handleClick.bind(this)
	} 

	sortsReviews(review) {
		// console.log(this.state)
		console.log(review.park_id)
		// console.log(this.state.sortReviewList)
	}

	handleClick() {
		this.setState({showReviews: !this.state.showReviews})
	}

	renderReviews() {
		// let reviewList = this.state.reviews.map(reviewItem => <ReviewItem review={reviewItem} />)
		let reviewList = this.state.reviews.map(sortReview => console.log(sortReview.park_id))
		console.log(reviewList)
		// if (this.state.showReviews) {
		// 	return reviewList
		// }
	}

	render() {
		const {reviews, review} = this.state;
		return (
			<div>
				<button onClick={this.handleClick}>
					View all reviews
				</button>
				<div>
					{this.renderReviews()}
				</div>
			</div>
		)
	}
}
// 4 columns total: column 1(Need photo on left), column 2((average number of stars, button for view website), column 3(address) & column 4(google map display)

export default ReviewList;
