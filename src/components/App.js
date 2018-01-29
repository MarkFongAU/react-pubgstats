/**
 * Components - App.js
 */
import React from 'react';
import Header from './Header';
import Routes from './routes';
import Footer from './Footer';

// Material UI dependencies - MuiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import logo from './logo.svg';
// import './App.css';

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

// Tutorials
// (FOLLOW THIS) https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// https://codesandbox.io/s/vVoQVk78
// NOT USEFUL (Express + React router 4) https://ebaytech.berlin/universal-web-apps-with-react-router-4-15002bb30ccb
// (Tutorial React) http://buildwithreact.com/tutorial/events
// USING THIS (React with server) https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
// (Material UI) http://www.material-ui.com/#/components/grid-list
// USEFUL https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d