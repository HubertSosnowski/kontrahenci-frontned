import React, { useEffect, useReducer, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled as styledMaterial } from '@material-ui/core/styles';
import styled from 'styled-components';
import axios from 'axios';
import Fakerator from 'fakerator';
import { CodeBlock, dracula } from 'react-code-blocks';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import {
  columns,
  reducer,
  initialStateForm,
  sampleCode,
} from '../components/AdresyData';

const DeleteButtonWrapper = styledMaterial(Button)({
  bottom: '20px',
  left: '150px',
  position: 'absolute',
});

const AddAdres = styled.div`
  padding: 12px;
`;

const StyledForm = styled.form`
  display: grid;
  grid-gap: 10px;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CodeBlockDiv = styled.div`
  font-size: 13px;
  font-family: 'Fira Code', monospace;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;

  h4 {
    padding-right: 30px;
  }
`;

const CodeWrapper = styled.div``;

function Adresy() {
  const [allFilled, setAllFiled] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialStateForm);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [allAdresy, setAllAdresy] = useState([]);
  const [allNipy, setAllNipy] = useState([]);
  const [selectedNip, setSelectedNip] = useState('');

  const selectOnChange = (event) => {
    const nip = event.target.value;
    setSelectedNip(nip);
    console.log(selectedNip);
    axios
      .get(`https://kontrahenci-api.herokuapp.com/adresy/nip/${nip}`)
      .then(function (response) {
        setAllAdresy(response.data.adresy);
        console.log(response.data.adresy);
      })
      .catch(function (error) {
        console.log('bład łaczenia z bazą danych', error);
      });
  };

  useEffect(() => {
    getAllNipy();
  }, []);

  useEffect(() => {
    let isFilled = false;
    isFilled = Object.values(state).every(Boolean);
    setAllFiled(isFilled);
  }, [state]);

  const getAllNipy = () => {
    axios
      .get('https://kontrahenci-api.herokuapp.com/kontrahenci')
      .then(function (response) {
        // setSelectedNip(response.data.kontrahenci[0].nip);
        setAllNipy(response.data.kontrahenci);
        console.log(response.data.kontrahenci);
      })
      .catch(function (error) {
        console.error('bład łaczenia z bazą danych', error);
      });
  };

  const deleteButtonClick = () => {
    if (selectedToDelete.length) {
      selectedToDelete.forEach((selectedId) => {
        axios
          .delete(`https://kontrahenci-api.herokuapp.com/adresy/${selectedId}`)
          .then((res) => console.log(res))
          .then(
            setAllAdresy((old) => old.filter((item) => item._id !== selectedId))
          )
          .catch((err) => console.log(err));
      });
    }
    setSelectedToDelete([]);
  };

  const submitKontrahent = () => {
    console.log(state);
    axios({
      method: 'post',
      url: 'https://kontrahenci-api.herokuapp.com/adresy',
      data: state,
    }).catch((err) => window.alert('Brak kontrahenta o podanym id.'));
  };

  const textUpdateFunction = (e, item) => {
    dispatch({ type: item.field, value: e.target.value });
  };

  const randomButton = () => {
    const fakerator = Fakerator('pl-PL');
    const miasto = fakerator.address.city();
    const ulica = fakerator.address.streetName();
    const numer_budynku = fakerator.random.number(1, 200);
    const kod_pocztowy = fakerator.address.postCode();

    dispatch({
      type: 'setAll',
      value: {
        miasto,
        ulica,
        numer_budynku,
        kod_pocztowy,
      },
    });
  };

  return (
    <>
      <h2>Adresy danego kontrahenta</h2>
      <SelectWrapper>
        <h4>Wybierz kontrahenta:</h4>
        <FormControl variant='outlined'>
          <InputLabel id='demo-simple-select-outlined-label'>NIP</InputLabel>
          <Select value={selectedNip} onChange={selectOnChange} label='NIP'>
            {allNipy.map((kontrahent, i) => (
              <MenuItem key={kontrahent.nip} value={Number(kontrahent.nip)}>
                {kontrahent.nip}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SelectWrapper>
      <div style={{ height: 400, width: '100%', color: '#efeff1' }}>
        <DataGrid
          rows={allAdresy ? allAdresy : []}
          columns={columns}
          pageSize={5}
          loading={allAdresy ? false : true}
          checkboxSelection={true}
          onSelectionChange={(e) => setSelectedToDelete(e.rowIds)}
        />
        <DeleteButtonWrapper
          onClick={deleteButtonClick}
          disabled={selectedToDelete.length ? false : true}
          startIcon={<DeleteIcon />}
          variant='contained'
          color='secondary'
        >
          Usuń zaznaczone
        </DeleteButtonWrapper>
      </div>
      <BottomDiv>
        <AddAdres style={{ width: '350px' }}>
          <h2>Dodaj nowy adres dla danego kontrahenta</h2>
          <StyledForm>
            <FormControl variant='outlined'>
              <InputLabel id='demo-simple-select-outlined-label'>
                NIP
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={state.id_kontrahenta.field}
                onChange={(e) =>
                  textUpdateFunction(e, { field: 'id_kontrahenta' })
                }
                label='NIP'
              >
                {allNipy.map((kontrahent, i) => (
                  <MenuItem key={kontrahent.nip} value={kontrahent.id}>
                    {kontrahent.nip}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {columns.map((item) => {
              if (item.field !== 'id' && item.field !== 'id_kontrahenta') {
                return (
                  <TextField
                    key={item.field}
                    variant='outlined'
                    // id={item.field}
                    label={item.headerName}
                    value={state[item.field]}
                    onChange={(e) => textUpdateFunction(e, item)}
                    size='small'
                    required
                    type={item.field === 'nip' || '' ? 'number' : 'text'}
                  />
                );
              } else return null;
            })}
            <Button onClick={randomButton}>Wypełnij randomowo</Button>
            <Button
              disabled={allFilled ? false : true}
              variant='contained'
              onClick={submitKontrahent}
            >
              Dodaj adres
            </Button>
          </StyledForm>
        </AddAdres>
        {/* <CodeWrapper>
          <h2>Przykładowy kod</h2>
          <CodeBlockDiv>
            <CodeBlock text={sampleCode} theme={dracula} language='jsx' />
          </CodeBlockDiv>
        </CodeWrapper> */}
      </BottomDiv>
    </>
  );
}

export default Adresy;
