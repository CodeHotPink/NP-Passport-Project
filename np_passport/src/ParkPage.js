import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import VisitItem from './VisitItem';
import ReviewList from './ReviewList';

class ParkPage extends Component {
	constructor(props){
		super(props);
		console.log('these are the ParkPage props"')
		console.log(this.props)
		this.state = {
			parks: data['data'],
			showParks: false,
			parkVisits: undefined,
			viewVisits: false,
			viewReviews: false
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.fetchParkVisits = this.fetchParkVisits.bind(this)
		this.renderParkVisits = this.renderParkVisits.bind(this)
		this.listDisplayParkVisits = this.listDisplayParkVisits.bind(this)
		this.handleViewVisitsButton = this.handleViewVisitsButton.bind(this)
		this.viewVisitsButton = this.viewVisitsButton.bind(this)
		this.listDisplayParkReviews = this.listDisplayParkReviews.bind(this)
		this.viewReviewsButton = this.viewReviewsButton.bind(this)
		this.handleViewReviewsButton = this.handleViewReviewsButton.bind(this)
		this.renderParkReviews = this.renderParkReviews.bind(this)
	} 

	componentDidMount() {
		console.log(this.props)
		this.fetchParkVisits()
	}

	fetchParkVisits() {
		fetch("http://localhost:5000/display_park_visits", {
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
			this.setState({'parkVisits': data})
		})	
		.catch(error => console.error(error));	
	}

	renderParkVisits() {
		if (this.props.singleParkPage && this.state.parkVisits) {
			return this.viewVisitsButton() 
		} else if (this.state.singleParkPage) {
			return (<div>Loading ...</div>)
		}
	}

	renderParkReviews() {
		if (this.props.singleParkPage) {
			return this.listDisplayParkReviews() 
		} else if (this.state.singleParkPage) {
			return (<div>Loading ...</div>)
		}
	}

	handleViewVisitsButton() {
		this.setState({viewVisits: !this.state.viewVisits})
	}

	handleViewReviewsButton() {
		this.setState({viewReviews: !this.state.viewReviews})
	}

	viewVisitsButton() {
		if (this.state.viewVisits) {
			return (<div><button onClick={this.handleViewVisitsButton}>
			Close park's visits
			</button>
			{this.listDisplayParkVisits()}
			</div>
			)
		}
		else {
			return <button onClick={this.handleViewVisitsButton}>
			View park's visits
			</button>
		}
	}

	viewReviewsButton() {
		if (this.state.viewReviews) {
			return (<div><button onClick={this.handleViewReviewsButton}>
			Close park's reviews
			</button>
			{this.listDisplayParkReviews()}
			</div>
			)
		}
		else {
			return <button onClick={this.handleViewReviewsButton}>
			View park's reviews
			</button>
		}
	}

	listDisplayParkVisits() {
		console.log(this.state.parkVisits)
		return this.state.parkVisits["visits"].map(visit => <VisitItem visit={visit} />)
	}

	listDisplayParkReviews() {
		return <ReviewList park = {this.props.park}/>
	}

	render() {
		const {parks} = this.state;
		return (
			<div>
				{this.renderParkReviews()}
				{this.renderParkVisits()}
			</div>
		)
	}
}


export default ParkPage;
