import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import './Navigation.css';

const StyledNavigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  border-right: 1px solid black;
  font-weight: 400;

  transition: transform 400ms ease;

  @media (max-width: 768px) {
    transform: ${({ showNav }) =>
      !showNav ? 'translateX(-200px)' : 'translateX(0px)'};

    z-index: 100;
    background-color: #fdfdfd;

    .switch {
      display: block;
    }
  }
`;

const NavigationList = styled.ul`
  margin: 0;
  padding: 20px;
`;

const NavToggleButton = styled.button`
  background: #fdfdfd;
  border: 2px solid black;
  border-radius: 100px;
  padding: 10px;
`;

const ListItem = styled.li`
  padding: 5px 10px;
  list-style: none;

  transition: color 100ms ease;
  &:hover {
    color: #3f51b5;
  }

  &:first-child {
    margin: 20px 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const NavigationHeading = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

function Navigation() {
  const [showNav, setShowNav] = useState(false);

  return (
    <StyledNavigation showNav={showNav}>
      <NavToggleButton
        className='switch'
        onClick={() => setShowNav((prev) => !prev)}
      >
        {!showNav ? <MenuIcon /> : <MenuOpenIcon />}
      </NavToggleButton>
      <NavigationList onClick={() => setShowNav(false)}>
        <ListItem>
          <NavigationHeading to='/'>Kontrahenci API</NavigationHeading>
        </ListItem>
        <ListItem>
          <StyledNavLink activeClassName='active-nav-link' to='/kontrahenci'>
            Kontrahenci
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink activeClassName='active-nav-link' to='/adresy'>
            Adresy
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink activeClassName='active-nav-link' to='/faktury'>
            Faktury
          </StyledNavLink>
        </ListItem>
      </NavigationList>
    </StyledNavigation>
  );
}

export default Navigation;
