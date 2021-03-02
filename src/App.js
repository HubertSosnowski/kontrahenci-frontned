import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import Kontrahenci from './pages/Kontrahenci';
import Adresy from './pages/Adresy';
import Faktury from './pages/Faktury';
import Root from './pages/Root';

const AppWrapper = styled.div`
  padding: 20px;
  padding-left: 250px;

  @media (max-width: 768px) {
    padding-left: 20px;

    /* .delete-button {
      left: 15px;
    } */
  }

  @media (max-width: 600px) {
    .delete-button {
      left: 15px;
    }
  }
`;

const App = () => {
  return (
    <AppWrapper>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Root} />
        <Route path='/kontrahenci' component={Kontrahenci} />
        <Route path='/adresy' component={Adresy} />
        <Route path='/faktury' component={Faktury} />
      </Switch>
    </AppWrapper>
  );
};

export default App;
