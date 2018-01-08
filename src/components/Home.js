/**
 * Components - Home.js
 */
import React from 'react';
import SearchBar from './SearchBar';
import wallpaper from '../image/pubg-man.jpg'

// Material UI dependencies - Home page
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {red500, white} from 'material-ui/styles/colors';

// Introduction Style
const cardStyles = {
    backgroundColor: red500,
};

const mediaStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    // backgroundSize: 'cover',
    // overflow: 'hidden',
    // backgroundColor: red500,
};

const titleStyles = {
    textAlign: 'center',
    color: white,
    fontSize: '30px',
};

const textStyles = {
    textAlign: 'center',
    color: white,
    fontSize: '20px',
};

const Home = () => (
    <div>
        <Card style={cardStyles}>
            <CardTitle
                title="Welcome to PUBG Stats!"
                titleStyle={titleStyles}/>
            <CardText style={textStyles}>
                Find your PUBG Stats here!
            </CardText>
        </Card>
        <SearchBar/>
        <Card>
            <CardMedia>
                <img src={wallpaper} alt=""/>
            </CardMedia>
        </Card>
    </div>
);

export default Home
