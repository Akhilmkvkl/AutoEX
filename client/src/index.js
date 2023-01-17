import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './Redux/Store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);


