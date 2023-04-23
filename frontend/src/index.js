import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import { createRoot } from 'react-dom/client';
import csrfFetch, { restoreCSRF } from './store/csrf';
import { debug } from './util/util';

const store = configureStore();
export let inDevelopment = false;

if (process.env.NODE_ENV !== 'production') {
  inDevelopment = true;
  window.store = store;
  window.csrfFetch = csrfFetch;
  let x = csrfFetch
}

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  debugger;
  debug();
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>)
};

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApp)
} else {
  renderApp();
}

