import React, { useEffect, useReducer, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { styled as styledMaterial } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import axios from 'axios';
import Fakerator from 'fakerator';
import { CodeBlock, dracula } from 'react-code-blocks';

import {
  sampleCodeKontrahenci,
  initialStateForm,
  columns,
  reducer,
} from '../components/KontrahenciData';

const DeleteButtonWrapper = styledMaterial(Button)({
  bottom: '20px',
  left: '150px',
  position: 'absolute',
});

const CodeBlockDiv = styled.div`
  font-size: 13px;
  font-family: 'Fira Code', monospace;
`;

const AddKontrahent = styled.div`
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

const CodeWrapper = styled.div``;

function Kontrahenci() {
  const [allKontrahenci, setAllKontrahenci] = useState();
  const [state, dispatch] = useReducer(reducer, initialStateForm);
  const [allFilled, setAllFiled] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);

  useEffect(() => {
    let isFilled = false;
    isFilled = Object.values(state).every(Boolean);
    setAllFiled(isFilled);
  }, [state]);

  const submitKontrahent = () => {
    axios({
      method: 'post',
      url: 'https://kontrahenci-api.herokuapp.com/kontrahenci',
      data: state,
    })
      .then((res) =>
        setAllKontrahenci((prev) => [
          ...prev,
          { ...res.data, id: res.data._id },
        ])
      )
      .catch((err) => console.log('bład z bazą danych', err));
  };

  const textUpdateFunction = (e, item) => {
    dispatch({ type: item.field, value: e.target.value });
  };

  const deleteButtonClick = () => {
    if (selectedToDelete.length) {
      selectedToDelete.forEach((selectedId) => {
        axios
          .delete(
            `https://kontrahenci-api.herokuapp.com/kontrahenci/${selectedId}`
          )
          .then((res) => console.log(res))
          .then(
            setAllKontrahenci((old) =>
              old.filter((item) => item._id !== selectedId)
            )
          )
          .catch((err) => console.log(err));
      });
    }
    setSelectedToDelete([]);
  };

  useEffect(() => {
    getAllKontrahenci();
  }, []);

  const getAllKontrahenci = () => {
    axios
      .get('https://kontrahenci-api.herokuapp.com/kontrahenci')
      .then(function (response) {
        setAllKontrahenci(response.data.kontrahenci);
      })
      .catch(function (error) {
        console.error('bład łaczenia z bazą danych', error);
      });
  };

  const randomButton = () => {
    const fakerator = Fakerator('pl-PL');
    const adres = `${fakerator.address.city()} ${fakerator.address.street()}`;
    const numer_telefonu = fakerator.random.number(111111111, 999999999);
    const nazwa_kontrachenta = fakerator.company.name();
    const email = fakerator.internet.email();
    const nip = fakerator.random.number(1111111111, 9999999999);
    const krs = `0000${fakerator.random.number(111111, 999999)}`;
    const regon = fakerator.random.number(11111111, 99999999);
    const branza = 'e-commerce';

    dispatch({
      type: 'setAll',
      value: {
        adres,
        numer_telefonu,
        nazwa_kontrachenta,
        email,
        nip,
        krs,
        regon,
        branza,
      },
    });
  };

  return (
    <>
      <h2>Wszyscy Kontrahenci</h2>
      <div style={{ height: 400, width: '100%', color: '#efeff1' }}>
        <DataGrid
          rows={allKontrahenci ? allKontrahenci : []}
          columns={columns}
          pageSize={5}
          loading={allKontrahenci ? false : true}
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
        <AddKontrahent style={{ width: '350px' }}>
          <h2>Dodaj nowego kontrahenta</h2>
          <StyledForm>
            {columns.map((item) => {
              if (item.field !== 'id') {
                return (
                  <TextField
                    key={item.field}
                    variant='outlined'
                    id={item.field}
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
              Dodaj kontrahenta
            </Button>
          </StyledForm>
        </AddKontrahent>
        <CodeWrapper>
          <h2>Przykładowy kod</h2>
          <CodeBlockDiv>
            <CodeBlock
              text={sampleCodeKontrahenci}
              theme={dracula}
              language='jsx'
            />
          </CodeBlockDiv>
        </CodeWrapper>
      </BottomDiv>
    </>
  );
}

export default Kontrahenci;
