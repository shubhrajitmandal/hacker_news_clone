import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import logo from "../shared/images/logo.png";

const Navbar = styled.nav`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 750px) {
    padding: 10px 30px;
  }
`;
const StyledLink = styled(Link)`
  && {
    height: 30px;
  }
`;
const Logo = styled.img`
  margin-right: 20px;
  width: 30px;
  height: 30px;

  @media screen and (max-width: 600px) {
    margin-right: 10px;
  }
`;
const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const NavLink = styled(Link)`
  margin: 0 10px;
  color: ${(props) => (props.to === props.path ? "#ff6600" : "#606060")};
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ff6600;
  }

  @media screen and (max-width: 600px) {
    margin: 0 5px;
  }
  @media screen and (max-width: 450px) {
    font-size: 14px;
    line-height: 16px;

    :last-child {
      align-self: flex-start;
    }
  }
`;
const Spacer = styled.div`
  flex: 1;
`;

const AppBar = () => {
  const location = useLocation();

  return (
    <Navbar>
      <StyledLink to="/">
        <Logo src={logo} />
      </StyledLink>
      <NavList>
        <NavLink to="/new" path={location.pathname}>
          New
        </NavLink>
        <NavLink to="/past" path={location.pathname}>
          Past
        </NavLink>
        <NavLink to="/comments" path={location.pathname}>
          Comments
        </NavLink>
        <NavLink to="/ask" path={location.pathname}>
          Ask
        </NavLink>
        <NavLink to="/show" path={location.pathname}>
          Show
        </NavLink>
        <NavLink to="/jobs" path={location.pathname}>
          Jobs
        </NavLink>
        <NavLink to="/submit" path={location.pathname}>
          Submit
        </NavLink>
      </NavList>
      <Spacer />
      <NavLink to="/login" path={location.pathname}>
        Login
      </NavLink>
    </Navbar>
  );
};

export default AppBar;
