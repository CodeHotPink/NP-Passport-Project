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
		// this.handleClick = this.handleClick.bind(this)
		// this.listDisplayVisits = this.listDisplayVisits.bind(this)
		this.fetchVisits = this.fetchVisits.bind(this)
	} 

	componentDidMount() {
		this.fetchVisits()
	}

	listDisplayVisits() {
		console.log(this.state.visits)
		if (this.state.visits["userId"]) {
			return <div>{this.state.visits["userId"]} have not visited any parks yet</div>
		}
		else {
			return this.state.visits["visits"].map(visit => <VisitItem visit={visit} />)
		}
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
			body: JSON.stringify({email:this.props["email"]})
			})
		.then(data => data.json())
		.then((data) => {
			this.setState({visits: data})
		})	
		.catch(error => console.error(error));	
	}

	renderVisits() {
		if (this.state.visits) {
			return this.listDisplayVisits()
		} else if (this.state.showVisits) {
			return (<div>Loading ...</div>)
		}
	}

	render() {
		return (
			<div>
				{this.renderVisits()}
			</div>
		)
	}
}

export default VisitList;
