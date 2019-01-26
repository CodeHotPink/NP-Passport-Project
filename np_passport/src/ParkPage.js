import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';

class ParkPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			showParks: false,
			parkVisits: undefined
		}
		this.renderParks = this.renderParks.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.fetchParkVisits = this.fetchParkVisits.bind(this)
		this.renderParkVisits = this.renderParkVisits.bind(this)
		this.listDisplayParkVisits = this.listDisplayParkVisits.bind(this)
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
			this.setState({parkVisits: data})
		})	
		.catch(error => console.error(error));	
	}

	renderParkVisits() {
		if (this.state.singleParkPage && this.state.parkVisits) {
			return this.listDisplayParkVisits()
		} else if (this.state.singleParkPage) {
			return (<div>Loading ...</div>)
		}
	}

	listDisplayParkVisits() {
		console.log(this.state.parkVisits)
	}

	render() {
		const {parks} = this.state;
		return (
			<div>
				<div>
					{this.renderParkVisits}
				</div>
			</div>
		)
	}
}


export default ParkPage;
