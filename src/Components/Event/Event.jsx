// This is an event details page which has its own route

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";

export const Event = () => {
  const [event, setEvent] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((store)=>store.auth.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    let x = JSON.parse(localStorage.getItem("userLoginDetails"));
    dispatch(userLogin(x));
  },[])
  const {id} = useParams();
  useEffect(()=>{
    axios.get(`http://localhost:8080/meetups/${id}`).then(({data})=>{
      setEvent(data);
    })
  },[])

  useEffect(()=>{
    
    if(user&&event&&user.subscribed.includes(event.id)){
      setIsSubscribed(true);
    }
    else{
      setIsSubscribed(false);
    }
  },[event]);
  return event?(
    <div className="eventContainer">
      {/* add your children here (divs)
      ex : title, theme, description, date, time, location, image(optional)
      the classNames should be also : title, theme, description, date, time, location, image(optional)
      */}

      {/* only one of the buttons should be visible depending on the status of subcription
      Hint : use conditional rendering */}
      <div className="title">{event.title}</div>
      <div className="theme">{event.theme}</div>
      <div className="description">{event.description}</div>
      <div className="date">{event.date}</div>
      <div className="time">{event.time}</div>
      <div className="location">{event.location}</div>
      <div className="image(optional)"><img src={event.image} alt="image"  /></div>
      
      {isSubscribed ? <button className="unsubscribe" onClick={()=>{
        let us = {...user}
        let x = us.subscribed.filter((el)=>{
          if(el!=event.id){
            return el;
          }
        })
        us.subscribed = x;
        console.log(us)
        axios.patch(`http://localhost:8080/users/${user.id}`,us).then(({data})=>{
          localStorage.setItem("userLoginDetails",JSON.stringify(data));
          setIsSubscribed(false);
        })
      }}>Unsubscribe</button> : <button className="subscribe" onClick={() => {
        let us = {...user};
        us.subscribed = [...us.subscribed,event.id];
        axios.patch(`http://localhost:8080/users/${user.id}`,us).then(({data})=>{
          localStorage.setItem("userLoginDetails",JSON.stringify(data));
          setIsSubscribed(true);
        })
       }}>Subscribe</button>}
    </div>
  ):"";
};
