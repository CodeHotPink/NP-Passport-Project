import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';

class ParkList extends Component {
	constructor(props){
		super(props);
		this.state = {
			parks: data['data'],
			park: data['data'][0],
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
		const {parks, park} = this.state;
		return (
			<div>
				<button onClick={this.handleClick}>
					View all
				</button>
				<div>
					{this.renderParks()}
				</div>
			</div>
		)
	}
}


export default ParkList;
