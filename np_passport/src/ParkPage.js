import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import VisitItem from './VisitItem';

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
		this.renderParkVisits = this.renderParkVisits.bind(this)
		this.listDisplayParkVisits = this.listDisplayParkVisits.bind(this)
		this.handleViewVisitsButton = this.handleViewVisitsButton.bind(this)
		this.viewVisitsButton = this.viewVisitsButton.bind(this)
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

	handleViewVisitsButton() {
		this.setState({viewVisits: !this.state.viewVisits})
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

	listDisplayParkVisits() {
		console.log(this.state.parkVisits)
		return this.state.parkVisits["visits"].map(visit => <VisitItem visit={visit} />)
	}

	render() {
		const {parks} = this.state;
		return (
			<div>
				{this.renderParkVisits()}
			</div>
		)
	}
}


export default ParkPage;
