/**
 * Components - About.js
 */
import React from 'react';
import wallpaper from '../image/pubg-man.jpg'

// Material UI dependencies - About page
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {blue500, white} from 'material-ui/styles/colors';

// About page Style
const cardStyles = {
    backgroundColor: blue500,
};

// const mediaStyles = {
//     backgroundImage: 'url(' + wallpaper + ')',
//     backgroundSize: 'cover',
//     overflow: 'hidden',
//     backgroundColor: red500,
// };

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
                <img src={wallpaper} alt=""/>
            </CardMedia>
        </Card>
    </div>
);

export default About