import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';



// axios.defaults.baseURL = 'https://0.0.0.0:5005'
// const token = JSON.parse(localStorage.getItem('UserData'))
// const tokenId = token.token
// axios.defaults.headers.common['x-access-tokens'] = tokenId
// console.log("TOKEN", tokenId)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>

        <App />

  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
