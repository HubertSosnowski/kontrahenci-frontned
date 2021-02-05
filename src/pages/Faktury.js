import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import 'date-fns';
import axios from 'axios';
import { Button } from '@material-ui/core';

import { staticData } from '../components/FakturyData';

import './faktury.css';

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  flex-wrap: wrap;
`;

const SwitchWrapper = styled.div`
  p {
    margin: 0;
  }
`;

const DisplayFaktury = styled.div`
  margin: 100px 50px;
`;

const FirstLineFaktura = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 30px;
`;

const FakturyGrid = styled.div`
  max-width: 1200px;
`;

const Faktura = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &:not(:first-child) {
    border-top: 1px solid #afafaf;
  }
`;

const FakturaInfo = styled.div`
  margin: 5px 30px;

  .info {
    font-size: 15px;
    padding-right: 5px;
  }

  color: ${({ paymentStatus }) => paymentStatus === 'Opłacono' && '#74ff72'};
  color: ${({ paymentStatus }) => paymentStatus === 'Nieopłacono' && '#e47171'};
`;

const SumaBrutto = styled.div`
  margin-top: 20px;
  text-align: right;

  .info-red {
    color: #e47171;
  }
`;

function Faktury() {
  const [allKontrahenci, setAllKontrahenci] = useState([]);

  const [selectedNip, setSelectedNip] = useState('');
  const [switchApi, setSwitchApi] = useState(false);
  const [odDate, setOdDate] = useState('2010-01-13');
  const [doDate, setDoDate] = useState('2021-02-05');

  const [lockedData, setLockedData] = useState({});

  const [allFaktury, setAllFaktury] = useState([]);

  const [priceValue, setPriceValue] = useState(0);

  useEffect(() => {
    getAllKontrahenci();
  }, []);

  const getAllKontrahenci = () => {
    axios
      .get('https://kontrahenci-api.herokuapp.com/kontrahenci')
      .then(function (response) {
        setSelectedNip(response.data.kontrahenci[0].nip);
        setAllKontrahenci(response.data.kontrahenci);
        console.log(response.data.kontrahenci);
      })
      .catch(function (error) {
        console.error('bład łaczenia z bazą danych', error);
      });
  };

  useEffect(() => {
    console.log(selectedNip);
  }, [selectedNip]);

  const formSubmit = () => {
    console.log(selectedNip, switchApi, odDate, doDate);
    setLockedData({ selectedNip: selectedNip, odDate: odDate, doDate: doDate });
    setAllFaktury([]);
    if (switchApi) {
      axios
        .get(
          `https://invoicingmodulepipdproject.azurewebsites.net/api/Invoices/NIP/${selectedNip}?date_do=${doDate}&date_od=${odDate}`
        )
        .then(function (response) {
          if (!response.data.length) {
            setAllFaktury('none');
          } else {
            setAllFaktury(response.data);
            calculateValue(response.data);
          }
          console.log(response.data);
        })
        .catch(function (error) {
          window.alert(error);
        });
    } else {
      const allFakturyFilter = staticData.filter(
        (item) => item.nip === String(selectedNip)
      );
      if (allFakturyFilter.length) {
        setAllFaktury(allFakturyFilter);
        calculateValue(allFakturyFilter);
      } else {
        setAllFaktury('none');
      }
    }
  };

  const calculateValue = (a) => {
    let value = 0;

    a.forEach((faktura) => {
      if (!faktura.paymentStatus) {
        value += faktura.invoiceGrossPrice;
      }
    });

    setPriceValue(value);
  };

  return (
    <div>
      <h2>Faktury danego kontrahenta po numerze nip oraz dacie</h2>
      {allKontrahenci.length ? (
        <SelectWrapper>
          <h4>Faktury do sprawdzenia:</h4>
          <FormControl variant='outlined'>
            <InputLabel id='demo-simple-select-outlined-label'>NIP</InputLabel>
            <Select
              value={selectedNip ? selectedNip : allKontrahenci[0].nip}
              onChange={(e) => setSelectedNip(e.target.value)}
              label='NIP'
            >
              {allKontrahenci.map((kontrahent, i) => (
                <MenuItem key={kontrahent.nip} value={Number(kontrahent.nip)}>
                  {kontrahent.nip}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <SwitchWrapper>
            <p>Dane z api</p>
            <Switch
              checked={switchApi}
              onChange={() => setSwitchApi((prev) => !prev)}
              name='switchApi'
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </SwitchWrapper>
          <TextField
            id='date'
            label='Od'
            type='date'
            value={odDate}
            onChange={(e) => setOdDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='date'
            label='Do'
            type='date'
            value={doDate}
            onChange={(e) => setDoDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={formSubmit} variant='contained'>
            Sprawdź
          </Button>
        </SelectWrapper>
      ) : (
        <></>
      )}
      {allFaktury.length && allFaktury !== 'none' ? (
        <DisplayFaktury>
          <FirstLineFaktura>
            <div className='nip-div'>
              <span className='info'>Sprawdzany numer nip kontrahenta: </span>
              <span className='large'>{lockedData.selectedNip}</span>
            </div>
            <div className='date-div'>
              <span className='info padding'>W zakresie dat od</span>
              <span>
                {lockedData.odDate}
              </span> <span className='info'>do</span>{' '}
              <span>{lockedData.doDate}</span>
            </div>
          </FirstLineFaktura>
          <FakturyGrid>
            {allFaktury.map((faktura) => (
              <Faktura key={faktura.invoiceId}>
                <FakturaInfo>
                  <span className='info'>Numer faktury</span>
                  <span>{faktura.invoiceNumber}</span>
                </FakturaInfo>
                <FakturaInfo>
                  <span className='info'>Data płatności</span>
                  <span>{faktura.paymentDate}</span>
                </FakturaInfo>
                <FakturaInfo
                  paymentStatus={
                    faktura.paymentStatus ? 'Opłacono' : 'Nieopłacono'
                  }
                >
                  <span className='info'>Status faktury</span>
                  <span>
                    {faktura.paymentStatus ? 'Opłacono' : 'Nieopłacono'}
                  </span>
                </FakturaInfo>
                <FakturaInfo>
                  <span className='info'>Wartość brutto</span>
                  <span>{faktura.invoiceGrossPrice} zł</span>
                </FakturaInfo>
              </Faktura>
            ))}
            <SumaBrutto>
              <span className='info'>Suma brutto nieopłaconych faktur: </span>{' '}
              <span className={priceValue && 'info-red'}>{priceValue} zł</span>
            </SumaBrutto>
          </FakturyGrid>
        </DisplayFaktury>
      ) : allFaktury === 'none' ? (
        <>
          <h1>Brak faktur</h1>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default Faktury;
