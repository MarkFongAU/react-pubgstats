/**
 * Components - Player.js
 */
import React, {Component} from 'react'
import wallpaper from '../image/pubg-man.jpg'
import async from 'async'
import request from 'request'


// import {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} from 'pubg.op.gg'

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
            },
            Player: {}
        }
    }

    profileRequestOptions(category, playerID) {
        let option = this.state.APIOption;
        option.url += category + '/' + playerID;
        return option;
    };

    getPlayerStats() {
        fetch(`/api/users/${playerID}`)
            .then(res => {
                return res.json();
            }).then(data => {
            // console.log(data.playerProfile);
            //     return data.playerProfile;
            this.setState({Player: data.playerProfile});
        });
    };

    componentDidMount() {
        this.getPlayerStats();
    }

    // HandleOnClick = () => {
    //     console.log("here");
    //     // return <Redirect to='/'/>;
    //     // this.props.history.push("/");
    //     // return <Redirect to="/" push/>;
    //     // e.preventDefault();
    //     this.props.history.push('/');
    // };

    render() {
        // let profileOption = this.profileRequestOptions('users', playerID);
        // console.log(profileOption);

        // let playerProfile = this.getPlayerStats();
        // console.log(playerProfile);
        // fetch('https://randomuser.me/api/?result=500')
        //     .then(res => {
        //         return res.json();
        //     }).then(data => {
        //     let playerProfile = data.results.map((res) => {
        //         console.log(res.id.value);
        //         console.log(res.name.first);
        //         console.log(res.name.last);
        //         return playerProfile = {
        //             id: res.id.value,
        //             nickname: res.name.first + res.name.last,
        //         }
        //     });
        //     console.log(playerProfile);
        // });

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
                    <CardTitle title={this.state.Player.nickname} subtitle={this.state.Player.id} titleStyle={titleStyles}/>
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