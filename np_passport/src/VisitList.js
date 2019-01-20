import React, { Component } from 'react';
import VisitItem from './VisitItem';

class VisitList extends Component {
	constructor(props){
		super(props);
		this.state = {
			showVisits: false,
			visits: undefined
		}
		this.renderVisits = this.renderVisits.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.listDisplayVisits = this.listDisplayVisits.bind(this)
		this.fetchVisits = this.fetchVisits.bind(this)
	} 

	componentDidMount() {
		this.fetchVisits()
	}

	listDisplayVisits() {
		console.log(this.state.visits)
		return this.state.visits["visits"].map(visit => <VisitItem visit={visit} />)
	}

	fetchVisits() {
		fetch("http://localhost:5000/display_user_visits", {
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
			this.setState({visits: data})
		})	
		.catch(error => console.error(error));	
	}

	handleClick() {
		this.setState({showVisits: !this.state.showVisits})
	}

	renderVisits() {
		if (this.state.showVisits && this.state.visits) {
			return this.listDisplayVisits()
		} else if (this.state.showVisits) {
			return (<div>Loading ...</div>)
		}
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>
					View all visits
				</button>
				{this.renderVisits()}
			</div>
		)
	}
}

export default VisitList;
