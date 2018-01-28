/**
 * Components - Header.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'

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

// const Header = () => {
//     HandleOnClick(){
//         this.props.history.push('/about');
//     }
//
//
//         return (
//             <header style={{bottom: 0}}>
//                 <AppBar
//                     style={{backgroundColor: black}}
//                     title={<span style={styles.title}>PUBG Stats</span>}
//                     onTitleClick={HandleOnClick}
//                     showMenuIconButton={false}
//                     iconElementRight={rightButtons}
//                 />
//             </header>
//         );
//
// };

class Header extends Component {
    // constructor() {
    //     super();
    //     this.HandleOnClick = this.HandleOnClick.bind(this);
    // }


    HandleOnClick = () => {
        console.log("here");
        // return <Redirect to='/'/>;
        // this.props.history.push("/");
        // return <Redirect to="/" push/>;
        // e.preventDefault();
        this.props.history.push('/');
    };

    // state = {
    //     navigate: false
    // };
    //
    render() {
        // const {navigate} = this.state;
        //
        // if (navigate) {
        //     <Redirect to="/" push={true} />
        // }

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