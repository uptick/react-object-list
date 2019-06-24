// Style overrides are a bit trickier too.
const styles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#fff',
    minHeight: 0,
    ...(controlStyle || {}),
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: 'rgba(0,126,255,0.08)',
    border: '1px solid rgba(0,126,255,0.24)',
    color: '#007eff',
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    color: '#007eff',
    borderRight: '1px solid rgba(0,126,255,0.24)',
    fontSize: '90%',
  }),
}


const custom = {
  control: (base, state) => ({
    ...base,
    ...(controlStyle || {}),
    backgroundColor: '#fff',
    borderRadius: '2px',
    borderColor: '#ced4da',
    outline: '0',
    boxShadow: 0,
    minHeight: 0,
    fontSize: '0.85rem',
    '&:hover': {
      borderColor: '#ced4da',
    },
    '&:active': {
      borderColor: '#ced4da',
    },
  }),
  indicatorContainer: (base, state) => ({
    ...base,
    color: '#00A19C',
  }),
  input: (base, state) => ({
    ...base,
    borderRadius: '2px',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '0.85rem',
    '&:hover': {
      background: '#f0f9f9',
    },
    '&:active': {
      background: '#f0f9f9',
    },
    '&:first-child': {
      background: '#fff',
      color: 'black',
      opacity: '0.84',
      '&:hover': {
        background: '#f0f9f9',
      },
    },
  }),
  menuList: (base, state) => ({
    ...base,
    borderRadius: '2px',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#00A19C',
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: 'rgba(0,126,255,0.08)',
    border: '1px solid rgba(0,126,255,0.24)',
    color: '#00A19C',
    '&:active': {
      background: '#f0f9f9',
    },
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    color: '#00A19C',
    borderRight: '1px solid rgba(0,126,255,0.24)',
    fontSize: '0.85rem',
  }),
}
