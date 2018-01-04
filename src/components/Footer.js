/**
 * Components - Footer.js
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'

// Material UI dependencies - Footer
import {red500, orange500, yellow500, green500, blue500, purple500, grey200} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

// Footer Style
const footerStyles = {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
};

const pageStyles = {
    textAlign: 'center',
    padding: '20px',
};
//
// const rightButtons = (
//     <div>
//         <FlatButton label="Home" style={buttonStyle} href='/'/>
//         <FlatButton label="About" style={buttonStyle} href='/about'/>
//     </div>
// );

// Footer - Display footer information
const Footer = () => (
    <div style={footerStyles}>
        <Paper zDepth={1} style={{backgroundColor: grey200}} >
            <div style={pageStyles}>
                © 2017 PUBG Stats. Data based on PUBG.OP.GG<br/>
                <IconButton iconClassName="fa fa-github"/>
                Mark Fong
            </div>
        </Paper>
    </div>
);

{/*<AppBar*/
}
{/*style={{backgroundColor: grey900}}*/
}
{/*title={<span style={styles.title}>PUBG Stats</span>}*/
}
{/*showMenuIconButton={false}*/
}
{/*iconElementRight={rightButtons}*/
}
{/*/>*/
}
export default Footer