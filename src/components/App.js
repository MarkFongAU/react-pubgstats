/**
 * Components - App.js
 */
import React, {Component} from 'react';
import Header from './Header';
import Routes from './routes';
import Footer from './Footer';

// Material UI dependencies - MuiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import logo from './logo.svg';
// import './App.css';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'

/** This component will be rendered the contents based on the Routes */
const App = () => (
    <MuiThemeProvider>
        <div>
            <Header/>
            <Routes/>
            <Footer/>
        </div>
    </MuiThemeProvider>
);

export default App;

// ReactDOM.render((
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// ), document.getElementById('root'));



// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf FOLLOW THIS
// https://codesandbox.io/s/vVoQVk78

// NOT USEFUL (Express + React router 4) https://ebaytech.berlin/universal-web-apps-with-react-router-4-15002bb30ccb
// (Tutorial React) http://buildwithreact.com/tutorial/events
// USING THIS (React with server) https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
// http://www.material-ui.com/#/components/grid-list (Material UI)

// USEFUL https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d



// const express = require('express');
// const path = require('path');
// const app = express();
//
// app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
//
// app.listen(9000);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;
