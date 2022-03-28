// This is an event details page which has its own route

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";

export const Event = () => {
  const [event, setEvent] = useState();
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
  return event?(
    <div className="eventContainer">
      {/* add your children here (divs)
      ex : title, theme, description, date, time, location, image(optional)
      the classNames should be also : title, theme, description, date, time, location, image(optional)
      */}

      {/* only one of the buttons should be visible depending on the status of subcription
      Hint : use conditional rendering */}
      <h1 className="title">{event.title}</h1>
      <p className="theme">{event.theme}</p>
      <p className="description">{event.description}</p>
      <p className="date">{event.date}</p>
      <p className="time">{event.time}</p>
      <p className="location">{event.location}</p>
      <img src={event.image} alt="image" className="image(optional)" />
      <button className="unsubscribe" onClick={()=>{
        let us = {...user}
        us.subcribed = us.subscribed.filter((el)=>{
          if(el!==event.id){
            return el;
          }
        })
        axios.patch(`http://localhost:8080/users/${user.id}`,us).then(()=>{
          console.log("subscribed");
        })
      }}>Unsubscribe</button>
      <button className="subscribe" onClick={() => {
        let us = {...user};
        us.subsribed.push(event.id);
        axios.patch(`http://localhost:8080/users/${user.id}`,us).then(()=>{
          console.log("subscribed");
        })
       }}>Subscribe</button>
    </div>
  ):"";
};
