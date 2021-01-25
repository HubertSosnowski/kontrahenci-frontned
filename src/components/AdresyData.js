const columns = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'id_kontrahenta', headerName: 'ID kontrahenta', width: 220 },
  { field: 'miasto', headerName: 'Miasto', width: 200 },
  { field: 'ulica', headerName: 'Ulica', width: 200 },
  { field: 'numer_budynku', headerName: 'Numer budynku', width: 150 },
  { field: 'kod_pocztowy', headerName: 'Kod pocztowy', width: 150 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAll':
      return {
        ...state,
        ...action.value,
      };
    case 'id_kontrahenta':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'miasto':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'ulica':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'numer_budynku':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'kod_pocztowy':
      return {
        ...state,
        [action.type]: action.value,
      };
    default:
      return state;
  }
};

const initialStateForm = {
  id_kontrahenta: '',
  miasto: '',
  ulica: '',
  numer_budynku: '',
  kod_pocztowy: '',
};

const sampleCode = `// Wszystkie adresy
axios.get('https://kontrahenci-api.herokuapp.com/adresy');

// Informacje o danym adresie po numerze id adresy
axio.get('https://kontrahenci-api.herokuapp.com/adresy/przykladowyNumerId')

// Dodaj nowy adres
axios({
  method: 'post',
  url: 'https://kontrahenci-api.herokuapp.com/adresy',
  data: {
    {
      id_kontrahenta: 'przykladowe id',
      miasto: 'przykladowe miasto',
      ulica: 'przykladowa ulica',
      numer_budynku: 'przykladowy numer',
      kod_pocztowy: 'przykladowy kod-pocztowy',
    }
  },
})

// Usuń adres po numerze id
axios.delete('https://kontrahenci-api.herokuapp.com/adresy/numerId')
`;

export { columns, reducer, initialStateForm, sampleCode };
