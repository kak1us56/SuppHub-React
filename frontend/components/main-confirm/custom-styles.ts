export const customSelectStyles = {
  container: (base: any) => ({
    ...base,
    width: '17.1875rem',
    '@media (max-width: 768px)': {
      width: '15.5rem',
    },
  }),
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: '#494949',
    borderColor: state.isFocused ? '#555' : '#444',
    boxShadow: state.isFocused ? '0 0 0 1px #888' : 'none',
    '&:hover': {
      borderColor: '#888',
    },
    minHeight: '40px',
    color: 'white',

    fontSize: '1.25rem',
    
    '@media (max-width: 768px)': {
      minHeight: '2rem',
      fontSize: '16px',
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: 'white',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#494949',
    zIndex: 20,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#444' : '#494949',
    color: 'white',
    cursor: 'pointer',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#ccc',
  }),
  input: (base: any) => ({
    ...base,
    color: 'white',
  }),
};
