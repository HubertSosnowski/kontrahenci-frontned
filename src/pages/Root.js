import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo wsiiz.png';

const RootWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Root() {
  return (
    <RootWrapper>
      <img height='200px' src={logo} alt='logo wsiz' />
      <h1>Przetwarzanie i przechowywanie danych</h1>
      <h2>Zarządzanie Kontrahentami</h2>
      <p>
        Zadaniem systemu jest umożliwienie zarządzania bazą danych z
        kontrahentami oraz adresami.
      </p>
    </RootWrapper>
  );
}

export default Root;
