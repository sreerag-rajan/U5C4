import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";

export const Home = () => {
  const [meetups, setMeetups] = useState([]);
  const [subscribedMeetups, setSubscribedMeetups] = useState()
  const user = useSelector((store)=>store.auth.user);
  const dispatch = useDispatch()

  const [location, setlocation] = useState("");

  

  useEffect(()=>{
    let x = JSON.parse(localStorage.getItem("userLoginDetails"));
    dispatch(userLogin(x));
  },[])

  useEffect(()=>{
    axios.get("http://localhost:8080/meetups").then(({data})=>{
      setMeetups(data);
    })
  },[])
  useEffect(()=>{
    let x = [...meetups];
    x = x.filter((el)=>{
      if(el.location == location) return el;
    })
    setMeetups(x);
  },[location])
  useEffect(()=>{
    let sm = meetups.filter((el)=>{
      if(user.subscribed.includes(el.id)){
        return el;
      }
    })
    sm = sm.sort((a,b)=>a.date-b.date);
    setSubscribedMeetups(sm);
  },[])
  return (
    <div className="homeContainer">
      {meetups&&meetups.filter((el) => {
        if(el.location ==user.location && user.interests.includes(el.theme)){
          return true;                            
        }
        else{
          return false
        }
       }).map((el) => {
          console.log(el)
          return (            
            <Link to={`/meetup/${el.id}`} key={el.id} className="events">
              {/* add your children here (divs)
              ex : title, theme, description, date, time, location, image(optional)
              the classNames should be also : title, theme, description, date, time, location, image(optional)
             */}
             <h3 className="title">{el.title}</h3>
             <p className="theme">{el.theme}</p>
             <p className="description">{el.description}</p>
             <p className="date">{el.date}</p>
             <p className="location">{el.location}</p>
             <img src={el.image} alt="image(optional)" className="image(optional)" />
            </Link>
          );
        })}

      <div className="subscribedData">
        <div>
          <select
            value={location}  // add value here
            onChange={(e) => { setlocation(e.target.value) }}
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

          {subscribedMeetups && subscribedMeetups.map((el) => {
              return (
                <Link to={`add route here`} className="events">
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                    <h3 className="title">{el.title}</h3>
                    <p className="theme">{el.theme}</p>
                    <p className="description">{el.description}</p>
                    <p className="date">{el.date}</p>
                    <p className="location">{el.location}</p>
                    <img src={el.image} alt="image(optional)" className="image(optional)" />
                </Link>
              );
            })}

        </div>
        </div>}
      </div>
    </div>
  );
};
