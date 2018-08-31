import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import { Store, Persistor } from "./Store/store";
import { PersistGate } from 'redux-persist/integration/react'
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
