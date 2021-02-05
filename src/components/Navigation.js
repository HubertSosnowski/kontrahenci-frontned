import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  border-right: 1px solid black;
  font-weight: 400;
`;

const NavigationList = styled.ul`
  margin: 0;
  padding: 20px;
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
  return (
    <StyledNavigation>
      <NavigationList>
        <ListItem>
          <NavigationHeading to='/'>Kontrahenci API</NavigationHeading>
        </ListItem>
        <ListItem>
          <StyledNavLink
            activeStyle={{
              fontWeight: 'bold',
              color: '#3f51b5',
            }}
            to='/kontrahenci'
          >
            Kontrahenci
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink
            activeStyle={{
              fontWeight: 'bold',
              color: '#3f51b5',
            }}
            to='/adresy'
          >
            Adresy
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink
            activeStyle={{
              fontWeight: 'bold',
              color: '#3f51b5',
            }}
            to='/faktury'
          >
            Faktury
          </StyledNavLink>
        </ListItem>
        {/* <ListItem>
          <StyledNavLink to='/'></StyledNavLink>
        </ListItem> */}
      </NavigationList>
    </StyledNavigation>
  );
}

export default Navigation;
