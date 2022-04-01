import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";
import styled from "styled-components"

export const Home = () => {
  const [meetups, setMeetups] = useState([]);
  const [subscribedMeetups, setSubscribedMeetups] = useState([])
  const [userMeetups, setUserMeetups] = useState([])
  const user = useSelector((store)=>store.auth.user);
  const dispatch = useDispatch()
  const [location, setlocation] = useState("");

  const Main = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 20px;

    & img{
      width: 300px;
    }
  `
  const EventCard = styled.div`
   border: 1px solid black; 
   height: 400px;
  `

  

  useEffect(()=>{
    let x = JSON.parse(localStorage.getItem("userLoginDetails"));
    dispatch(userLogin(x));
  },[])

  useEffect(()=>{
    axios.get("http://localhost:8080/meetups").then(({data})=>{
      setMeetups(data);
    })
  },[])

  //useEffect for filtering location feature
  useEffect(()=>{
    if(location!==""){
      axios.get("http://localhost:8080/meetups").then(({data})=>{
      let x = [...data];
      x = x.filter((el)=>{
      if(el.location == location) return el;
    })
    setSubscribedMeetups(x);      
    })

    }
    
    
  },[location])

//useEffect for getting subscribed meetups in a sorted manner
  useEffect(()=>{
    if(user){
      let sm = meetups.filter((el)=>{
        if(user.subscribed.includes(el.id)){
          return el;
        }
      })
      sm = sm.sort((a,b)=>a.date-b.date);
      setSubscribedMeetups(sm);
    }
    
  },[meetups])

  //Useeffect for getting user specific interest and location meetups
  useEffect(()=>{
    if(user){
      let umu = meetups.filter((el) => {
        if(el.location ==user.location && user.interests.includes(el.theme)){
          
          return el;                        
        }}) 
        console.log("UMU", umu)
        setUserMeetups(umu);
    }
    else{
      setUserMeetups(meetups)
    }
    
  },[meetups])
  return (
    <div className="homeContainer">
      {!user?<Main>
      {userMeetups.map((el) => {
          // console.log(el)
          return (            
            <Link to={`/meetup/${el.id}`} key={el.id} className="events">
              {/* <EventCard>               */}
             <div className="title">{el.title}</div>
             <div className="theme">{el.theme}</div>
             <div className="description">{el.description}</div>
             <div className="date">{el.date}</div>
             <div className="location">{el.location}</div>
             <div className="time">{el.time}</div>
             <div className="image(optional)"><img src={el.image} alt="image(optional)"  /></div>
             {/* </EventCard> */}
            </Link>
          );
        })}
        </Main>:<div className="subscribedData">
        <div>
          <select
            value={location}  // add value here
            onChange={(e) => { 
              // console.log(e.target.value)
              setlocation(e.target.value)
             }}
          >
            <option value="">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        {user?<Link to={"/addmeetup"}> Add Meetup</Link>:""}
        {!user?"":<div>
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}
          <Main>
          {subscribedMeetups && subscribedMeetups.map((el) => {
              return (
                <Link to={`/meetup/${el.id}`} key={el.id} className="events">
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                    
                    <div className="subscribedMeetups">
                    <div className="title">{el.title}</div>
                    <div className="theme">{el.theme}</div>
                    <div className="description">{el.description}</div>
                    <div className="date">{el.date}</div>
                    <div className="time">{el.time}</div>
                    <div className="location">{el.location}</div>
                    <img src={el.image} alt="image(optional)" className="image(optional)" />
                    </div>
                </Link>
              );
            })}
            </Main>

        </div>
        </div>}
      </div>}    
    </div>
  );
};
