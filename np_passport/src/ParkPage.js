import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import VisitItem from './VisitItem';
import ReviewList from './ReviewList';

class ParkPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			showParks: false,
			parkVisits: undefined,
			viewVisits: false,
			viewReviews: false
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.fetchParkVisits = this.fetchParkVisits.bind(this)
		this.listDisplayParkVisits = this.listDisplayParkVisits.bind(this)
		this.handleViewVisitsButton = this.handleViewVisitsButton.bind(this)
		this.viewVisitsButton = this.viewVisitsButton.bind(this)
		this.renderParkReviews = this.renderParkReviews.bind(this)
	} 

	componentDidMount() {
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

	renderParkReviews() {
		if (this.props.singleParkPage) {
			return <ReviewList park = {this.props.park}/>
		} else if (this.state.singleParkPage) {
			return (<div>Loading ...</div>)
		}
	}

	handleViewVisitsButton() {
		this.setState({viewVisits: !this.state.viewVisits})
	}

	viewVisitsButton() {
		if (this.state.viewVisits) {
			if (this.state.parkVisits) {
				return (<div><button onClick={this.handleViewVisitsButton}>
					Close park's visits
					</button>
					{this.listDisplayParkVisits()}
					</div>
				)
			} else {
				return (<div>Loading ...</div>)
			}
		}
		else {
			return <button onClick={this.handleViewVisitsButton}>
			View park's visits
			</button>
		}
	}

	listDisplayParkVisits() {
		return this.state.parkVisits["visits"].map(visit => <VisitItem visit={visit} />)
	}

	render() {
		const {parks} = this.state;
		return (
			<div>
				{this.renderParkReviews()}
				{this.viewVisitsButton()}
			</div>
		)
	}
}


export default ParkPage;
