import React from 'react';
import postcard from './postcard.css';
import passportBook from './passportBook.css';

const VisitItem = ({visit, allParkNames}) => {
  console.log(allParkNames)
  const parkId = visit['parkId']
  const parkPic = visit['parkPic']
  console.log(visit)
  const userId = visit['userId']
  const firstName = visit['firstName']
  const lastName = visit['lastName']
  const visitDate = visit['visitDate']
  let currentPage = 0
  const randomPostCardGreeting = ["You should've came!","Payback is a :)","Wish you were here! You should've called off sick","why am i even writing you?","neh, they wanted me to write something so here you go... 'something'","Say hi to the family for me!","I got bit by a lot of insects. Please have a cold bath waiting for me","I did not get any sleep. There's always this one a-hole that is blasting his music at 5AM IN THE MORNING!!!",`OMG ${parkId} was so fun! There was so much to see!`,"I think I lost like 15 pounds being out here","is it appropriate for me to start writing deep thought? i had a lot of alone time out here.. a lot to think about","Sam I am?","Green eggs & ham","You got me boo'd up","I think I love you","I think I hate you",`I picked up a new partner at ${parkId}... So yeah.. Get your stuff out of my house before I get back home`]
  let rand = randomPostCardGreeting[Math.floor(Math.random() * randomPostCardGreeting.length)]
  function turnPage() {
    currentPage = currentPage+1
    console.log(currentPage)
    console.log('I have clicked to turn the page')
  };
  
  // this is for postcard.css
  // return (
  //   <form class="postcard" action="">
  //     <div class="receiver absolute">
  //       <input type="text" name="receiver-name" placeholder={firstName}></input>
  //     </div>
  //     <div class="sender absolute">
  //       <input type="text" name="sender-name" placeholder={lastName} />
  //     </div>
  //     <div class="reply absolute">
  //       <input type="text" name="reply-text" rows="12" cols="2" placeholder={visitDate} />
  //     </div>
  //     <div class="message absolute">
  //       <br />
  //       <textarea name="message" rows="12" cols="19" placeholder={rand}></textarea>
  //     </div>
  //   </form>
  // );

  // this is for passportBook.css


  return (
    <div class="container">
      <div class="card-wrapper">
        <div class="greeting">
          Greetings from
        </div>
        <div class="city">
            <div class="city-title" style={{background: `url(${String(parkPic)}) no-repeat center center/ cover`, WebkitBackgroundClip: "text"}}>
            {parkId}
          </div>
          <div class="city-title-shadow">
            {parkId}
          </div>
        </div>
        <div class="stamp-text">
           VISITED {visitDate}
        </div>
      </div>
    </div>
    // <div className='stamp-text'>
    //   {visitDate}
    // </div>
    // <div>
    //   <button onClick={turnPage}>Click Me</button>
    // <div class="book">
    // this is what I need to return onClick
    //   <div class="pagenext">
    //     <p> THIRD PAGE?</p>
    //   </div>
    //   <div class="page">
    //       <p>SECOND PAGE?</p>
    //       this is also what I need to return onClick
    //     <div class="pageprev">
    //       <p>BACK OF PAGE 2</p>
    //     </div>
    //   </div>  
    //   <div class="line"></div>
    //     <p>NATIONAL PARKS PASSPORT</p>
    //     <p>PROPERTY OF {firstName} {lastName}</p>
    // </div>
    // </div>
  );
};

export default VisitItem;
