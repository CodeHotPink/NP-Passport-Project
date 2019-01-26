import React from 'react';
import ReviewList from './ReviewList';
import ParkList from './ParkList';
import ParkPage from './ParkPage';

const ParkItem = ({park, handleShowParksClick, handleParkPageClick, boundSetState}) => {        
  const image = park['images'][0]['url']
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
    handleShowParksClick()
    handleParkPageClick()
  }
  return (
    <div>
      <button onClick={viewParkPage}>{parkName}</button>
      <img src={image} alt={imageAlt} height='100' width='100' /><br />
      {address}<br />
      {city}, {state} {zipCode}<br />
      {phoneNumber}<br />
      <td onClick={()=> window.open(`https://www.nps.gov/${parkCode}/index.htm`, "_blank")}>{parkName}'s website</td>
      Put # of stars<ReviewList park = {parkName}/>
    </div>
  );
};

export default ParkItem;
