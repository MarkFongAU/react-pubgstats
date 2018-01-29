/**
 * Components - Header.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

// Material UI dependencies - Header
import {black} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// Header Style
const styles = {
    title: {
        cursor: 'pointer',
    },
};

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
};

const rightButtons = (
    <div>
        <FlatButton label="Home" style={buttonStyle} href='/'/>
        <FlatButton label="About" style={buttonStyle} href='/about'/>
    </div>
);

// Header - creates links that can be used to navigate between routes.
class Header extends Component {
    HandleOnClick = () => {
        console.log("here");
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <AppBar
                    style={{backgroundColor: black}}
                    title={<span style={styles.title}>PUBG Stats</span>}
                    onTitleClick={this.HandleOnClick}
                    showMenuIconButton={false}
                    iconElementRight={rightButtons}
                />
            </div>
        );
    }
}

export default withRouter(Header);