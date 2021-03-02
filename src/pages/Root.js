import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo wsiiz.png';

const RootWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  p {
  }
`;

function Root() {
  return (
    <RootWrapper>
      <img height='200px' src={logo} alt='logo wsiz' />
      <h1>Przetwarzanie i przechowywanie danych</h1>
      <h2>Zarządzanie Kontrahentami</h2>
      <p>
        Zadaniem systemu jest umożliwienie zarządzania bazą danych z
        kontrahentami i adresami oraz podgląd wszystkich faktur opłaconych lub
        nieopłaconych z danego dnia indywidualnego kontrahenta.
      </p>
      <p>
        Lista faktur pobierana jest z API udostępnianego przez grupę Zarządzanie
        Produktami.
      </p>
    </RootWrapper>
  );
}

export default Root;
