/**
 * Components - Footer.js
 */
import React from 'react';

// Material UI dependencies - Footer
import {grey200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
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

export default Footer