/**
 * Components - SearchBar.js
 */
import React from 'react';

// Material UI dependencies - SearchBar
import {Card, CardText} from 'material-ui/Card';
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

// SearchBar Style
const cardStyles = {
    backgroundColor: white,
};

const textStyles = {
    textAlign: 'center',
    paddingTop: '20px',
    fontSize: '18px',
};

// const titleStyles = {
//     textAlign: 'center',
//     color: 'black',
//     fontSize: '20px',
// };
//
// const searchBarStyles = {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
// };
//
// const pageStyles = {
//     textAlign: 'center',
//     padding: '20px',
// };

// SearchBar - Display search bar to search for player profile
const SearchBar = () => (
    <div>
        <Card style={cardStyles}>
            <CardText style={textStyles}>
                <b>Enter PUBG Username</b><br/>
                <TextField
                    hintText="Username"
                /><br/>
            </CardText>
        </Card>
    </div>
);

export default SearchBar;