/**
 * Components - SearchBar.js
 */
import React from 'react';

// Material UI dependencies - SearchBar
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {white} from 'material-ui/styles/colors';


import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

// SearchBar Style
const cardStyles = {
    backgroundColor: white,
};

// const titleStyles = {
//     textAlign: 'center',
//     color: 'black',
//     fontSize: '20px',
// };

const textStyles = {
    textAlign: 'center',
    paddingTop: '20px',
    fontSize: '18px',
};

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

        {/*<Paper zDepth={1} style={{}}>*/}
        {/*<div style={pageStyles}>*/}
        {/*<b>Enter PUBG Username</b><br/>*/}
        {/*<TextField*/}
        {/*hintText="Username"*/}
        {/*/><br/>*/}
        {/*</div>*/}
        {/*</Paper>*/}


        {/*<br/>*/}
        {/*<TextField*/}
        {/*hintText="The hint text can be as long as you want, it will wrap."*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*id="text-field-default"*/}
        {/*defaultValue="Default Value"*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="Hint Text"*/}
        {/*floatingLabelText="Floating Label Text"*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*defaultValue="Default Value"*/}
        {/*floatingLabelText="Floating Label Text"*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="Hint Text"*/}
        {/*floatingLabelText="Fixed Floating Label Text"*/}
        {/*floatingLabelFixed={true}*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="Password Field"*/}
        {/*floatingLabelText="Password"*/}
        {/*type="password"*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="MultiLine with rows: 2 and rowsMax: 4"*/}
        {/*multiLine={true}*/}
        {/*rows={2}*/}
        {/*rowsMax={4}*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="Message Field"*/}
        {/*floatingLabelText="MultiLine and FloatingLabel"*/}
        {/*multiLine={true}*/}
        {/*rows={2}*/}
        {/*/><br/>*/}
        {/*<TextField*/}
        {/*hintText="Full width"*/}
        {/*fullWidth={true}*/}
        {/*/>*/}
    </div>
);

export default SearchBar;