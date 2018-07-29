import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App'; // using Router instead of App now
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
