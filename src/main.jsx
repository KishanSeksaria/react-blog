import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Header, Footer } from './components';
import './index.css';
import LogoutButton from './components/headers/LogoutButton.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Header />
    <App />
    {/* <Footer /> */}
  </Provider>
);
