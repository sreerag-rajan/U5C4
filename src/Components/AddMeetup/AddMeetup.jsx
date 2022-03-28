// User should be able to add/create new meetups 

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AddMeetup = () => {
  const user = useSelector((store)=>store.auth.user);
  const [meetupFormData, setMeetupFormData]= useState({
    title:'',
    location:"",
    date:"",
    time:'',
    theme:"",
    description:"",
    image:""
  })

  const handleChange=(e)=>{
    const {className, value} = e.target;
    setMeetupFormData({...meetupFormData, [className]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/meetups",meetupFormData).then(({data})=>{
      console.log(data)
    })
  }

  if(!user){
    return <Navigate to="/loginsignup"/>
  }
  return (
    <div className="addMeetupContainer">
      <form onSubmit={handleSubmit}>
        <h1>Add Meetup</h1>
        <label>title</label>
        <input type="text" className="title" onChange={(e) => { handleChange(e) }} required value={meetupFormData.title} />
        <label>Location</label>
        <select value={meetupFormData.location} className="location" onChange={(event) => { handleChange(event)}}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>date</label>
        <input
          type="text"
          className="date"
          onChange={(event) => { handleChange(event)}}
          placeholder="format YYYY-MM-DD"
          required
          value={meetupFormData.date}
        />
        <br />
        <label>time</label>
        <input
          type="text"
          className="time"
          onChange={(event) => { handleChange(event)}}
          placeholder="format HH:MM"
          required
          value={meetupFormData.time}
        />
        <br />
        <label>Theme</label>
        <select value={meetupFormData.theme} className="theme" onChange={(event) => { handleChange(event)}}>
          <option value="">-----------</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="movies">Movies</option>
          <option value="culture">Culture</option>
          <option value="art">Art</option>
          <option value="drama">Drama</option>
        </select>
        <label>description</label>
        <input
          type="text"
          className="description"
          onChange={(event) => { handleChange(event)}}
          placeholder="Description"
          required
          value={meetupFormData.description}
        />
        <br />
        <label>Image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => {handleChange(event) }}
          required
          value={meetupFormData.image}
        />
        <br />
        <input className="submitMeetupForm" type="submit" />
      </form>
    </div>
  );
};
