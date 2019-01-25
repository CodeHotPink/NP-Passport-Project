import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';

class ParkPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			showParks: false
		}
		this.renderParks = this.renderParks.bind(this)
		this.handleClick = this.handleClick.bind(this)
	} 

	handleClick() {
		this.setState({showParks: !this.state.showParks})
	}

	renderParks() {
		let parkList = this.state.parks.map(parkItem => <ParkItem park={parkItem} />)
		if (this.state.showParks) {
			return parkList
		}
	}



	render() {
		const {parks} = this.state;
		return (
			<div>
				<div>
					I will render stuff here
				</div>
			</div>
		)
	}
}


export default ParkPage;
