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
    boundSetState({'parkName':parkName})
    boundSetState({'parkCode':parkCode})
    }
  return (
    <div className='container'>
      <Row>
        <Col md={4}></Col>
      <Col md={4}>
      <Row>
        <div className='centerContent'>
          <button onClick={viewParkPage}>{parkName}</button>
        </div>
      </Row>
      <Row>
        <div className='centerContent'>
          <td onClick={()=> window.open(`https://www.nps.gov/${parkCode}/index.htm`, "_blank")}>{parkName}'s website</td>
        </div>
      </Row>
      </Col>
      <Col md={4}></Col>
      </Row>
      <Row>
      <div className='centerPicContainer'>
        <div className='centerPic'>
          <object data={image} type="image/png" height='300' width='500'>
            <img src={secondImage} alt={imageAlt} height='300' width='500'/>
          </object>
        </div>
      </div>
      </Row>
      </div>

  );
};

export default ParkItem;
