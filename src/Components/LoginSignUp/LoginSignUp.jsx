import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, checkLoginDetails } from "../../Redux/Login/action";

export const LoginSignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    name:"",
    password:"",
    location:"",
    technology:false,
    food: false,
    movies: false,
    culture: false, 
    art: false,
    drama: false,
    image: ""
  });
  const [loginFormData, setLoginFormData] = useState({
    name:"",
    password: ""
  })

  const user = useSelector((store)=>store.auth.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    let x = JSON.parse(localStorage.getItem("userLoginDetails"));
    dispatch(userLogin(x));
  },[])

  const handleChange= (e)=>{
    let {className, type, checked, value} = e.target;
    value = type==="checkbox"?checked:value;

    setSignUpFormData({...signUpFormData,[className]:value});
  }


  const handleLoginChange = (e)=>{
    const {className, value} = e.target;
    setLoginFormData({...loginFormData, [className]:value})
  }

  const handleSignUpSubmit = (e)=>{
    e.preventDefault();
    let interests = [];
    if(signUpFormData.technology===true){
      interests.push("technology")
    }
    if(signUpFormData.food===true){
      interests.push("food")
    }
    if(signUpFormData.movies===true){
      interests.push("movies")
    }
    if(signUpFormData.culture===true){
      interests.push("culture")
    }
    if(signUpFormData.art===true){
      interests.push("art")
    }
    if(signUpFormData.drama===true){
      interests.push("drama")
    }

    localStorage.setItem("userLoginDetails",JSON.stringify({
      name: signUpFormData.name,
      password: signUpFormData.password,
      interests: interests,
      image: signUpFormData.image,
      location: signUpFormData.location,
      subscribed: []
    }))
    axios.post("http://localhost:8080/users",{
      name: signUpFormData.name,
      password: signUpFormData.password,
      interests: interests,
      image: signUpFormData.image,
      location:signUpFormData.location,
      subscribed: []
    }).then(()=>{
      setSignUpFormData({
        name:"",
        password:"",
        location:"",
        technology:false,
        food: false,
        movies: false,
        culture: false, 
        art: false,
        drama: false,
        image: ""
      })
    })
  }

  const handleLoginSubmit = (e)=>{
    e.preventDefault();
    dispatch(checkLoginDetails(loginFormData))
  }
  return (
    <div className="loginSignUp">
      <form className="signUp" onSubmit={(e) => { handleSignUpSubmit(e)}}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={handleChange}
          required
          value={signUpFormData.name}
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {handleChange(event)}}
          value = {signUpFormData.password}
          required
        />
        <br />
        <select value={signUpFormData.location} className="location" onChange={(event) => { handleChange(event)}}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox"
          className="technology"
          onChange={(event) => { handleChange(event) }}
          checked={signUpFormData.technology}
          value={signUpFormData.technology}
        />
        <br />
        <label>food</label>
        <input type="checkbox" className="food" onChange={(event) => { handleChange(event) }} checked={signUpFormData.food} value={signUpFormData.food} />
        <br />
        <label>movies</label>
        <input type="checkbox" className="movies" onChange={(event) => { handleChange(event)  }} checked={signUpFormData.movies} value={signUpFormData.movies} />
        <br />
        <label>culture</label>
        <input type="checkbox" className="culture" onChange={(event) => { handleChange(event) }} checked={signUpFormData.culture} value={signUpFormData.culture} />
        <br />
        <label>art</label>
        <input type="checkbox" className="art" onChange={(event) => { handleChange(event) }} checked={signUpFormData.art} value={signUpFormData.art} />
        <br />
        <label>drama</label>
        <input type="checkbox" className="drama" onChange={(event) => { handleChange(event) }} checked={signUpFormData.drama} value={signUpFormData.drama}/>
        <br />
        <label>image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => { handleChange(event)}}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={(e) => { handleLoginSubmit(e) }}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {handleLoginChange(event) }}
          required
          value={loginFormData.name}
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {handleLoginChange(event) }}
          required
          value={loginFormData.password}
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
