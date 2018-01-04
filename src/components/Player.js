/**
 * Components - Player.js
 */
import React, {Component} from 'react'
import wallpaper from '../image/pubg-man.jpg'
import async from 'async'
import request from 'request'


import {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} from 'pubg.op.gg'

// Material UI dependencies - Player profile (Card)
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {black, red500} from "material-ui/styles/colors";

// Player profile Style
const cardStyles = {
    // backgroundColor: red500,
    width: '80%',
    margin: 'auto',
};

const innerGridStyles = {
    // backgroundColor: red500,
    width: '90%',
    margin: 'auto',
};

const mediaStyles = {
    width: '100%',
    height: '150px',
    // backgroundImage: 'url(' + wallpaper + ')',
    // backgroundSize: 'cover',
    overflow: 'hidden',
    // backgroundColor: red500,
};

const titleStyles = {
    textAlign: 'center',
    // color: 'white',
    fontSize: '30px',

};

const textStyles = {
    textAlign: 'center',
    // color: 'white',
    fontSize: '20px',

};

const divStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    backgroundSize: '100%',
    width: '100%',
    minHeight: '300px',
};

// Player ID (based on OP.gg)
const playerID = '59fe3604465dcc0001b82b45';




function multipleGetRequest(options, callback) {
    request(options,
        function (err, res, body) {
            callback(err, body);
        }
    );
}

// Player - display player's stats
class Player extends Component {
    constructor() {
        super();
        this.state = {
            APIOption: {
                url: 'https://pubg.op.gg/api/',
                method: 'GET',
                // headers: {
                //     'Accept': 'application/json',
                // },
                json: true
            }
        }
    }

    profileRequestOptions(category, playerID) {
        let option = this.state.APIOption;
        option.url += category + '/' + playerID;
        return option;
    };


    // HandleOnClick = () => {
    //     console.log("here");
    //     // return <Redirect to='/'/>;
    //     // this.props.history.push("/");
    //     // return <Redirect to="/" push/>;
    //     // e.preventDefault();
    //     this.props.history.push('/');
    // };

    // state = {
    //     navigate: false
    // };
    //
    render() {

        // PUBG op.gg API: If no Redis configuration it wont be cached
        const api = new PubgAPI({
            redisConfig: {
                host: '127.0.0.1',
                port: 6379,
                expiration: 300, // Optional - defaults to 300.
            },
        });

        // let profileOption = this.profileRequestOptions('users', playerID);
        // console.log(profileOption);
        // const APIRequests = [profileOption];
        //
        // let playerProfile = async.map(APIRequests, multipleGetRequest, function (err, res) {
        //     if (err) {
        //         return console.log(err);
        //     } else {
        //         console.log(res);
        //     }
        //
        //     return playerProfile = {
        //         id: res[0].id,
        //         nickname: res[0].nickname,
        //         servers: res[0].servers,
        //         seasons: res[0].seasons,
        //     };
        // });

        api.getProfileByID('59fdabfb33bd730001661ad2', SEASON.RE2018sea1, REGION.EU, MATCH.SQUAD.size, MATCH.SQUAD.name)
            .then((profile) => {
                const data = profile.getStats();
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });



        return (
            <div>

                <Card>
                    <CardMedia style={mediaStyles}>
                        <img src={wallpaper} alt=""/>
                    </CardMedia>
                </Card>
                <Card style={cardStyles}>
                    {/*<CardHeader*/}
                    {/*title="URL Avatar"*/}
                    {/*subtitle="Subtitle"*/}
                    {/*avatar="images/jsa-128.jpg"*/}
                    {/*/>*/}
                    {/*<CardMedia*/}
                    {/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}*/}
                    {/*>*/}
                    {/*<img src="images/nature-600-337.jpg" alt=""/>*/}
                    {/*</CardMedia>*/}
                    <CardTitle title="sdasd" subtitle="Card subtitle" titleStyle={titleStyles}/>
                    <CardText style={textStyles}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1"/>
                        <FlatButton label="Action2"/>
                    </CardActions>
                    <GridList
                        cols={2}
                        cellHeight="auto"
                        padding={5}
                    >
                        <GridTile>
                            <Card style={{backgroundColor: red500}}>

                                <CardTitle title="Card title" subtitle="Card subtitle"/>
                                <CardText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Action1"/>
                                    <FlatButton label="Action2"/>
                                </CardActions>
                            </Card>
                        </GridTile>
                        <GridTile>
                            <Card style={{backgroundColor: red500}}>

                                <CardTitle title="Card title" subtitle="Card subtitle"/>
                                <CardText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Action1"/>
                                    <FlatButton label="Action2"/>
                                </CardActions>
                            </Card>
                        </GridTile>
                    </GridList>

                    <CardTitle title="Card title" subtitle="Card subtitle"/>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1"/>
                        <FlatButton label="Action2"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Player;

// /** Player's Card */
// const Card_Player = () => (

// );
//


// const AppBarExampleIcon = () => (
//     <AppBar
//         title={"PUBG Stat"}
//         iconClassNameRight={"muidocs-icon-navigation-expand-more"}
//     />
// );

// ReactDOM.render(
//     <index />,
//     document.getElementById('root'));

/*<div>*/
/*<a href="#" className="button">Button</a>*/
/*<div>{ipsumText}</div>*/
/*</div>,*/