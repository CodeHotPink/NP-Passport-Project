import React from 'react';
import ReviewList from './ReviewList';
import ParkList from './ParkList';
import ParkPage from './ParkPage';
import ErrorPicture from './404';

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
    <div>
      <button onClick={viewParkPage}>{parkName}</button>
      <object data={image} type="image/png" height='100' width='100'>
        <img src={secondImage} alt={imageAlt} height='100' width='100'/>
      </object>
      {address}<br />
      {city}, {state} {zipCode}<br />
      {phoneNumber}<br />
      <td onClick={()=> window.open(`https://www.nps.gov/${parkCode}/index.htm`, "_blank")}>{parkName}'s website</td>
      Put # of stars
    </div>
  );
};

export default ParkItem;
