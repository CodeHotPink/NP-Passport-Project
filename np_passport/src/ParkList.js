import React, { Component } from 'react';
import data from './national_parks_list';
import ParkPage from './ParkPage';
import ParkItem from './ParkItem';

class ParkList extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			showParks: true,
			singleParkPage: false
		}
		this.renderParks = this.renderParks.bind(this)
		this.handleShowParksClick = this.handleShowParksClick.bind(this)
		this.handleParkPageClick = this.handleParkPageClick.bind(this)
		this.boundSetState = this.boundSetState.bind(this)
		this.fetchParkMaps = this.fetchParkMaps.bind(this)
	} 

	componentDidMount() {
		this.fetchParkMaps()
	}

	fetchParkMaps() {
		fetch("http://localhost:5000/fetch_park_maps", {
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

	handleShowParksClick() {
		this.setState({showParks: !this.state.showParks})
	}

	handleParkPageClick() {
		this.setState({singleParkPage: !this.state.singleParkPage})
	}

	boundSetState(state) {
		// this could set anything in parent state
		this.setState(state)
	}

	renderParks() {
		let parkList = this.state.parks.map(parkItem => <ParkItem park={parkItem} handleShowParksClick={this.handleShowParksClick} handleParkPageClick={this.handleParkPageClick} boundSetState={this.boundSetState}/>)
		if (this.state.showParks) {
			return parkList
		}
		else if (this.state.singleParkPage && this.state.showParks === false) {
			return <ParkPage park={this.state.park} singleParkPage={this.state.singleParkPage} handleParkPageClick={this.handleParkPageClick} handleShowParksClick={this.handleShowParksClick}/>
		}
	}

	viewAllParksButton() {
		if (this.state.singleParkPage && this.state.showParks === false) {
			return <button onClick={this.handleParkPageClick} onClick={this.handleShowParksClick}>
			Back
			</button>
		}
		else if (this.state.showParks) {
			if (this.state.singleParkPage) {
				this.setState({singleParkPage: false})
			}
			return <button onClick={this.handleShowParksClick}>
			Close list of all parks
			</button>
		}
		else {
			return <button onClick={this.handleShowParksClick}>
			View list of all parks
			</button>
		}
	}

	render() {
		const {parks} = this.state;
		return (
			<div>
				{this.viewAllParksButton()}
				<div>
					{this.renderParks()}
				</div>
			</div>
		)
	}
}


export default ParkList;
