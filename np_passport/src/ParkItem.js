import React from 'react';
import ReviewList from './ReviewList';
import ParkList from './ParkList';
import ParkPage from './ParkPage';
import ErrorPicture from './images/404';
import {Col, Row, Grid} from 'react-bootstrap';

const ParkItem = ({park, handleShowParksClick, handleParkPageClick, boundSetState}) => {        
  const image = park['images'][0]['url']
  const secondImage = ErrorPicture
  const imageAlt = park['images'][0]['altText']
  const address = park['addresses'][0]['line1']
  const city = park['addresses'][0]['city']
  const state = park['addresses'][0]['stateCode']
  const zipCode = park['addresses'][0]['postalCode']
  const phoneNumber = park['contacts']['phoneNumbers'][0]['phoneNumber']
  const website = park['url']
  const parkName = park['fullName']
  const parkCode = park['parkCode']
  function viewParkPage(event) {
    boundSetState({'park':parkName})
    boundSetState({'singleParkPage':true})
    boundSetState({'showParks':false})
    boundSetState({'parkImageOne':image})
    boundSetState({'imageAlt':imageAlt})
    boundSetState({'parkImageTwo':secondImage})
    }
  return (
    <div className='container'>
      <Row>
      <Col md='auto'>
      <Row>
      <Col md={{ span: 6, offset: 3 }}>
      <button onClick={viewParkPage}>{parkName}</button>
      </Col>
      </Row>
      <Row>
      <object data={image} type="image/png" height='300' width='500'>
        <img src={secondImage} alt={imageAlt} height='300' width='500'/>
      </object>
      </Row>
      </Col>
      <Col md='6' id='map'>
      <Row style={{height: 38}}>
      <td onClick={()=> window.open(`https://www.nps.gov/${parkCode}/index.htm`, "_blank")}>{parkName}'s website</td>
      </Row>
      </Col>
      </Row>
      </div>

  );
};

export default ParkItem;
