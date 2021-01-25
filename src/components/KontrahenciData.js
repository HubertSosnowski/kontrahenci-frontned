const sampleCodeKontrahenci = `// Wszyscy kontrahenci
axios.get('https://kontrahenci-api.herokuapp.com/kontrahenci');

// Informacje o danym kontrahenci po numerze nip
axio.get('https://kontrahenci-api.herokuapp.com/kontrahenci/przykladowyNumerNip')

// Dodaj nowego kontrahenta
axios({
  method: 'post',
  url: 'https://kontrahenci-api.herokuapp.com/kontrahenci',
  data: {
    {
      "adres":"przykladowy adres",
      "numer_telefonu":123 123 123,
      "nazwa_kontrachenta":"przykladowa nazwa",
      "email":"mail@mail.com",
      "nip":1111111111,
      "krs":"0001111",
      "regon":"111111",
      "branza":"przykladowa branza"
    }
  },
})

// Usuń kontrahenta po numerze id
axios.delete('https://kontrahenci-api.herokuapp.com/kontrahenci/numerId')`;

const initialStateForm = {
  nazwa_kontrachenta: '',
  nip: '',
  adres: '',
  branza: '',
  regon: '',
  krs: '',
  email: '',
  numer_telefonu: '',
};

const columns = [
  { field: 'id', headerName: 'ID', width: 210 },
  { field: 'nazwa_kontrachenta', headerName: 'Nazwa kontrahenta', width: 190 },
  { field: 'nip', headerName: 'Numer NIP', width: 130 },
  { field: 'adres', headerName: 'Adres', width: 190 },
  { field: 'branza', headerName: 'Branża', width: 190 },
  { field: 'regon', headerName: 'Numer Regon', width: 140 },
  { field: 'krs', headerName: 'Numer KRS', width: 130 },
  { field: 'email', headerName: 'Adres Email', width: 190 },
  { field: 'numer_telefonu', headerName: 'Numer Telefonu', width: 150 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAll':
      return {
        ...action.value,
      };
    case 'nazwa_kontrachenta':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'nip':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'adres':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'branza':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'regon':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'krs':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'email':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'numer_telefonu':
      return {
        ...state,
        [action.type]: action.value,
      };
    default:
      return state;
  }
};

export { sampleCodeKontrahenci, initialStateForm, columns, reducer };
