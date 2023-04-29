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
import { fetchSession } from './store/session';
import * as sessionActions from './store/session';
import { fetchForms, deleteForm, fetchForm } from './store/formReducer';
import * as questionActions from './store/questionReducer';

const store = configureStore();
export let inDevelopment = false;

if (process.env.NODE_ENV !== 'production') {
  inDevelopment = true;
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.fetchForms = fetchForms;
  window.deleteForm = deleteForm;
  window.fetchForm = fetchForm;
  window.questionActions = questionActions;
}

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>)
};

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  // console.log("restoring in index");
  store.dispatch(sessionActions.restoreSession()).then(renderApp)
} else {
  renderApp();
}

