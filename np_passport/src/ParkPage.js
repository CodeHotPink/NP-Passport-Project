import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import VisitItem from './VisitItem';
import ReviewList from './ReviewList';
import ErrorPhoto from './404';
import ParkMap from './ParkMap';
import {Col, Row, Grid} from 'react-bootstrap';

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
		this.fetchParkInfo = this.fetchParkInfo.bind(this)
	} 

	componentDidMount() {
		this.fetchParkInfo()
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

	fetchParkInfo() {
		fetch("http://localhost:5000/individual_park_info", {
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
			this.setState({'parkInfo': data})
			console.log(this.state.parkInfo)
			console.log(this.state.parkInfo.parkDescription)
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
		console.log(this.props)
		console.log(this.state)
		if (this.state.parkInfo) {
			return (
				<div className='container'>
				<Row>
					<Col md='6'>
						<object data={this.state.parkInfo.parkPhoto} type="image/png" height='300' width='500'>
							<img src={ErrorPhoto} alt={this.props.imageAlt} height='300' width='500'/>
						</object>
					</Col>
					<Col md='6'>
							{this.state.parkInfo.parkDescription}
						<Row>
							{this.state.parkInfo.parkWeather}
						</Row>
					</Col>
				</Row>>
				<Row>

					<Row>
						<ParkMap testProp='test prop'/>
					</Row>
					<Row>
						{this.renderParkReviews()}
						{this.viewVisitsButton()}
					</Row>
				</Row>
				</div>
			)
		} else {
			return (<div>Loading ...</div>)
		}
	}
}


export default ParkPage;
