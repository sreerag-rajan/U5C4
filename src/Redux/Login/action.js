import axios from "axios";

//Action Types:
export const LOGIN = "LOGIN";

//Action Creators:
export const userLogin = (payload) => ({ type: LOGIN, payload });


export const checkLoginDetails = (payload)=>(dispatch)=>{
    axios.get("http://localhost:8080/users").then(({data})=>{
        let user = data.filter((el)=>{
            if(el.name === payload.name && el.password===payload.password){
                return el;
            }
        })
        // console.log(user)
        if(user){
            localStorage.setItem("userLoginDetails",JSON.stringify(user[0]));
            dispatch(userLogin(user[0]));
        }
    })
}