import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppComponent} from './modules/home/App';
import registerServiceWorker from './registerServiceWorker';


import { Provider } from "react-redux";
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
