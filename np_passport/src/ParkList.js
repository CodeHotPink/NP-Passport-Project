import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import ParkPage from './ParkPage';

class ParkList extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			showParks: false,
			singleParkPage: false
		}
		this.renderParks = this.renderParks.bind(this)
		this.handleShowParksClick = this.handleShowParksClick.bind(this)
		this.handleParkPageClick = this.handleParkPageClick.bind(this)
		this.boundSetState = this.boundSetState.bind(this)
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
