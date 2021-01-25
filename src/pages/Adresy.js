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

const CodeWrapper = styled.div``;

function Adresy() {
  const [allFilled, setAllFiled] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialStateForm);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [allAdresy, setAllAdresy] = useState([]);

  useEffect(() => {
    getAllAdresy();
  }, []);

  useEffect(() => {
    let isFilled = false;
    isFilled = Object.values(state).every(Boolean);
    setAllFiled(isFilled);
  }, [state]);

  const getAllAdresy = () => {
    axios
      .get('https://kontrahenci-api.herokuapp.com/adresy')
      .then(function (response) {
        console.log(response);
        setAllAdresy(response.data.adresy);
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
    axios({
      method: 'post',
      url: 'https://kontrahenci-api.herokuapp.com/adresy',
      data: state,
    })
      .then((res) =>
        setAllAdresy((prev) => [...prev, { ...res.data, id: res.data._id }])
      )
      .catch((err) => window.alert('Brak kontrahenta o podanym id.'));
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
      <h2>Wszystkie Adresy</h2>
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
            {columns.map((item) => {
              if (item.field !== 'id') {
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
        <CodeWrapper>
          <h2>Przykładowy kod</h2>
          <CodeBlockDiv>
            <CodeBlock text={sampleCode} theme={dracula} language='jsx' />
          </CodeBlockDiv>
        </CodeWrapper>
      </BottomDiv>
    </>
  );
}

export default Adresy;
