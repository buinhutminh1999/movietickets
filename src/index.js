import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import { URL_API } from './ulti/setting';
import i18n from './i18n.js';
//websocket
// const signalR = require("@aspnet/signalr");
// import * as signalR from '@aspnet/signalr'
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${URL_API}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
// connection.start().then(() => {
//     const root = ReactDOM.createRoot(document.getElementById('root'));
//     root.render(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// }).catch((err) => { 
//     console.log(err)
//  })

