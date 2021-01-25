import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Kontrahenci from './pages/Kontrahenci';
import Navigation from './components/Navigation';
import Adresy from './pages/Adresy';

const AppWrapper = styled.div`
  padding: 20px;
  padding-left: 250px;
`;

const App = () => {
  return (
    <AppWrapper>
      <Navigation />
      <Switch>
        <Route path='/kontrahenci' component={Kontrahenci} />
        <Route path='/adresy' component={Adresy} />
      </Switch>
    </AppWrapper>
  );
};

export default App;
