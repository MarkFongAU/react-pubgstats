/**
 * Npm Start entry - index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

/** Client Page Rendering */
ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
