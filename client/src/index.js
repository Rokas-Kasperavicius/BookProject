import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Store, Persistor } from './Store/store';
import registerServiceWorker from './registerServiceWorker';
import './Styles/Main.css';

ReactDOM.render((
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

