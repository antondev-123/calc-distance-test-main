import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

import App from './App';

const theme = unstable_createMuiStrictModeTheme();

const Main = () => (
  <ThemeProvider theme={theme}> 
    <App />
  </ThemeProvider >
);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
