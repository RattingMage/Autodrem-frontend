import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {store} from './reducers'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
      </LocalizationProvider>
  </Provider>
);

