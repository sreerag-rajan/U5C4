import { Link } from "react-router-dom";
import styled from "styled-components"

export const Navbar = () => {
  const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 80px;
    border: 1px solid green;
    background-color: yellow;
    align-items: center;
    margin: 20px 0;
  `
  return (
    <div className="navbar">
      <Link className="navbarHome" to={"/"}>
        Home
      </Link>
      <Link className="navbarLoginSignUp" to={"/loginsignup"}>
        Login/Sign Up
      </Link>
    </div>
  );
};
