import React, { Component } from 'react';
import data from './national_parks_list';
import ParkItem from './ParkItem';
import VisitItem from './VisitItem';
import ReviewList from './ReviewList';
import ErrorPhoto from './images/404';
import ParkMap from './ParkMap';
import {Col, Row, Grid} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import boot from './images/boot.png';

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
		const AnyReactComponent = ({ text }) => <div>{text}</div>;
		const {parks} = this.state;
		if (this.state.parkInfo) {
			console.log(this.props)
			return (
				<div className='container'>
				<Row>
					<Col md='6'>
						<object data={this.state.parkInfo.parkPhoto} type="image/png" height='300' width='500'>
							<img src={ErrorPhoto} alt={this.props.imageAlt} height='300' width='500'/>
						</object>
					</Col>
					<Col md='6'>
						<Row>
							{this.state.parkInfo.parkDescription}
						</Row>
					</Col>
				</Row>
				<Row>
					{this.state.parkInfo.parkWeather}
				</Row>
				<Row className='map' style={{ height: '300px', width: '500px', backgroundColor: 'red' }} >
					<GoogleMapReact
						bootstrapURLKeys={{ key: this.state.parkInfo.google }}
						defaultCenter={{lat: Number(this.state.parkInfo.latitude), lng: Number(this.state.parkInfo.longitude)}}
						defaultZoom={8}
						>
						<AnyReactComponent
							lat={this.state.parkInfo.latitude}
							lng={this.state.parkInfo.longitude}
							text={<img src={boot} height='10' />}
						/>
					</GoogleMapReact>
				</Row>
				<Row>
					<Col md='6'>
						{this.renderParkReviews()}
					</Col>
					<Col md='6'>
						{this.viewVisitsButton()}
					</Col>
				</Row>
				</div>
			)
		} else {
			return (<div>Loading ...</div>)
		}
	}
}


export default ParkPage;
