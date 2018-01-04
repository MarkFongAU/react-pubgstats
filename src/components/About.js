/**
 * Components - About.js
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import wallpaper from '../image/pubg-man.jpg'


// Material UI dependencies - About page
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {
    red500, orange500, yellow500, green500, blue500, purple500, grey200, white
} from 'material-ui/styles/colors';

// About page Style
const cardStyles = {
    backgroundColor: blue500,
};

const mediaStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    // backgroundSize: 'cover',
    // overflow: 'hidden',
    // backgroundColor: red500,
};

const titleStyles = {
    textAlign: 'center',
    color: 'white',
    fontSize: '30px',
};

const textStyles = {
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
};

const divStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    backgroundSize: '100%',
    width: '100%',
    minHeight: '500px',
};

const About = () => (
    <div>
        <Card style={cardStyles}>
            <CardTitle
                title="About PUBG Stats"
                titleStyle={titleStyles}/>
            <CardText style={textStyles}>
                PUBG Stats is a website for players to check their stats and leaderboard ranking
                for PLAYERUNKNOWN'S BATTLEGROUNDS.<br/><br/>
                PUBG Stats is built with ReactJS.
            </CardText>
            <CardMedia>
                <img src={wallpaper} alt="" />
            </CardMedia>
        </Card>
    </div>
    // <div>
    //     <h1>About PUBG Stat!</h1>
    // </div>
);

export default About