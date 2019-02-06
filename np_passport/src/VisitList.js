import React, { Component } from 'react';
import VisitUserItem from './VisitUserItem';

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
			// this is where I should call passport component & change state here to update the pages of the book
			return this.state.visits["visits"].map(visit => <VisitUserItem allParkNames={this.props.allParkNames["parks"]} visit={visit} />)
			// <PassportBook allParkNames={this.props.allParkNames["parks"]} visits={this.state.visits["visits"]} />)
		}
		return this.state.visits["visits"].map(visit => <VisitUserItem visit={visit} />)
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
