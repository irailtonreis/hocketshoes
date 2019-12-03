import React from 'react';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router  history={history}>
        {/* <Header/> */}
        <Header/>
        <GlobalStyles/>
        <Routes/>      
      </Router>
      <ToastContainer autoClose={8000}/>
    </Provider>
    );
}

export default App;
