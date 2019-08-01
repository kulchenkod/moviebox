import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import '@fortawesome/fontawesome-free/css/all.css';

import "./configs/axios";
import App from './App';
import MovieStore from "./stores/MovieStore";
import './index.css';


ReactDOM.render(
  <Provider movieStore={MovieStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
