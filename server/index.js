/**
 * Server - index.js
 */

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

// import express from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import App from '../shared/App';
// import NoMatch from '../shared/NoMatch';
// import Error from '../shared/Error';
// import {StaticRouter, matchPath} from 'react-router-dom';
// import renderIndex from "./render";
//
// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const routes = [
//     '/'
// ];
//
// app.use('/static', express.static('public'));
//
// app.get('/', (req, res) => {
//     res.status(200).send(renderIndex(
//         (
//             <StaticRouter context={{}} location={req.url}>
//                 <App />
//             </StaticRouter>
//         )
//     ));
// });
//
// app.get('*', (req, res) => {
//     res.status(404).send(renderIndex(<NoMatch/>));
//
//     // const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
//     // if (!match) {
//     //     res.status(404).send(render(<NoMatch />));
//     //     return;
//     // }
//     // fetch('https://api.github.com/gists')
//     //     .then(r => r.json())
//     //     .then(gists => {
//     //         res.status(200).send(render(
//     //             (
//     //                 <Router context={{}} location={req.url}>
//     //                     <App gists={gists} />
//     //                 </Router>
//     //             ), gists
//     //         ));
//     //     }).catch(err => {
//     //     console.error(err);
//     //     res.status(500).send(render(<Error />));
//     // });
// });
//
// app.listen(port, () => {
//     console.log(`Express app listening at http://${hostname}:${port}/`);
// });
//
// // app.listen(3000, () => console.log('Demo app listening on port 3000'));
//
// // app.listen(port, function () {
// // console.log(`Express app listening at http://${hostname}:${port}/`);
// // });