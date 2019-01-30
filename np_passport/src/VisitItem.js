import React from 'react';
import PostCard from './postcard.css'

const VisitItem = ({visit}) => {
  const parkId = visit['parkId']
  const userId = visit['userId']
  const firstName = visit['firstName']
  const lastName = visit['lastName']
  const visitDate = visit['visitDate']
  const randomPostCardGreeting = ["You should've came!","Payback is a :)","Wish you were here! You should've called off sick","why am i even writing you?","neh, they wanted me to write something so here you go... 'something'","Say hi to the family for me!","I got bit by a lot of insects. Please have a cold bath waiting for me","I did not get any sleep. There's always this one a-hole that is blasting his music at 5AM IN THE MORNING!!!",`OMG ${parkId} was so fun! There was so much to see!`,"I think I lost like 15 pounds being out here","is it appropriate for me to start writing deep thought?","Sam I am?","Green eggs & ham","You got me boo'd up","I think I love you","I think I hate you",`I picked up a new partner at ${parkId}... So yeah.. Get your stuff out of my house before I get back home`]
  let rand = randomPostCardGreeting[Math.floor(Math.random() * randomPostCardGreeting.length)];
  
  return (
    <form class="postcard" action="">
      <div class="receiver absolute">
        <input type="text" name="receiver-name" placeholder={firstName}></input>
      </div>
      <div class="sender absolute">
        <input type="text" name="sender-name" placeholder={lastName} />
      </div>
      <div class="reply absolute">
        <input type="text" name="reply-text" rows="12" cols="2" placeholder={visitDate} />
      </div>
      <div class="message absolute">
        <br />
        <textarea name="message" rows="12" cols="19" placeholder={rand}></textarea>
      </div>
    </form>
  );
};

export default VisitItem;
