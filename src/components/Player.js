/**
 * Components - Player.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import wallpaper from '../image/pubg-man.jpg'

// import {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} from 'pubg.op.gg'

// Material UI dependencies - Player profile (Card)
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {black, red500, yellow500, lightBlue500, blue500} from "material-ui/styles/colors";

// Player profile Style
const divStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    // minHeight: '300px',
};

const cardStyles = {
    header: {
        // width: '100%',
        height: '300px',
        // backgroundImage: 'url(' + wallpaper + ')',
        // opacity: 0.5,
        // backgroundSize: 'cover',
        // overflow: 'hidden',
        // backgroundColor: 'transparent',
    },
    lifetimeStats: {
        textAlign: 'center',

    },
    tabs: {
        width: '80%',
        margin: 'auto',
    }
};

const innerGridStyles = {
    // backgroundColor: red500,
    width: '90%',
    margin: 'auto',
};

const tabStyles = {
    headerTitle: {
        fontSize: 24,
        // paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

const mediaStyles = {
    // width: '100%',
    height: '150px',

    // backgroundImage: 'url(' + wallpaper + ')',
    // opacity: 0.5,
    // backgroundSize: 'cover',
    // overflow: 'hidden',
    backgroundColor: 'transparent',
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


// Player ID (based on OP.gg)
// rtzW_RED
const playerID = '59fe3604465dcc0001b82b45';
// LanYunKris
// const playerID = '5a43115bbf121f00014fadcf';
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
            Player: [],
            // Servers: [],
            PageLoaded: false,
            // Servers: {
            //     na: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     as: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     krjp: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     kakao: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     sa: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     eu: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     oc: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            //     sea: {
            //         pre5: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         pre6: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //         sea1: {tpp1: [], tpp2: [], tpp4: [], fpp1: [], fpp2: [], fpp4: [],},
            //     },
            // },
        };
    }

    profileRequestOptions(category, playerID) {
        let option = this.state.APIOption;
        option.url += category + '/' + playerID;
        return option;
    };

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getPlayerStats(playerID) {
        await fetch(`/api/users/${playerID}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setStateAsync({Player: data.player});
                // this.setState({Player: data.player});
                // console.log(this.state.Player);
            })
            .catch(error => {
                // Potentially some code for generating an error specific message here
                console.log('React backend is not available.');
                this.props.history.push('/*');
                // next(error);
            });

        // Pure Async Await
        // const res = await fetch(`/api/users/${playerID}`);
        // const data = await res.json();
        // await this.setStateAsync({Player: data.player});

    };

    async getServerSeasonStats(server, season) {
        await fetch(`/api/users/${playerID}/ranked-stats?server=${server}&season=${season}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setStateAsync({
                    Servers: {
                        ...this.state.Servers,
                        [server]: {
                            ...this.state.Servers[server],
                            [season]: data.serverSeasonStats,
                        }
                    },
                });
                // this.setState({
                //     Servers: {
                //         ...this.state.Servers,
                //         [server]: {
                //             ...this.state.Servers[server],
                //             [season]: data.serverSeasonStats,
                //         }
                //     },
                // });
                // console.log(this.state.Servers);
            })
            .catch(error => {
                // Potentially some code for generating an error specific message here
                console.log('React backend is not available.');
                this.props.history.push('/*');
                // next(error);
            });

        // Pure Async Await
        // const res = await fetch(`/api/users/${playerID}/ranked-stats?server=${server}&season=${season}`);
        // const data = await res.json();
        // await this.setStateAsync({
        //     Servers: {
        //         ...this.state.Servers,
        //         [server]: {
        //             ...this.state.Servers[server],
        //             [season]: data.serverSeasonStats,
        //         }
        //     },
        // });
    };

    async componentDidMount() {
        await this.getPlayerStats(playerID);
        console.log(this.state.Player);

        // if (!this.state.Player.profile) {
        //     // return;
        // } else {
        //     await Promise.all(this.state.Player.profile.servers.map(async (server) => {
        //         console.log(server);
        //         await Promise.all(this.state.Player.profile.seasons.map(async (season) => {
        //             console.log(season);
        //             await this.getServerSeasonStats(server.server, season.season);
        //         }));
        //     }));
        // }
        // //
        // console.log(this.state.Servers);
        this.setState({PageLoaded: true});
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
        // console.log(this.state.Player.servers);

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

        if (this.state.PageLoaded === false)
            return null;

        return (
            <div style={divStyles}>
                <Card style={cardStyles.header}>
                    <CardTitle title={this.state.Player.profile.name} subtitle={this.state.Player.profile.id}/>
                    <GridList
                        cols={3}
                        cellHeight="auto"
                        padding={5}
                        style={cardStyles.lifetimeStats}
                    >
                        <Subheader style={{fontSize: 20}}>Lifetime Stats:</Subheader>
                        <GridTile>
                            <div>
                                <b>Matches Played</b>
                                <p>{this.state.Player.lifetime_stats.matches_played}</p>
                            </div>
                        </GridTile>
                        <GridTile>
                            <div>
                                <b>Wins</b>
                                <p>{this.state.Player.lifetime_stats.matches_won}</p>
                            </div>
                        </GridTile>
                        <GridTile>
                            <div>
                                <b>Win Rate</b>
                                <p>{(this.state.Player.lifetime_stats.win_rate * 100).toFixed(2)}%</p>
                            </div>
                        </GridTile>
                        <GridTile>
                            <div>
                                <b>Top 10s</b>
                                <p>{this.state.Player.lifetime_stats.matches_top10}</p>
                            </div>
                        </GridTile>
                        <GridTile>
                            <div>
                                <b>Kills</b>
                                <p>{this.state.Player.lifetime_stats.kill_total}</p>
                            </div>
                        </GridTile>
                        <GridTile>
                            <div>
                                <b>K/D</b>
                                <p>{this.state.Player.lifetime_stats.kd.toFixed(2)}</p>
                            </div>
                        </GridTile>
                        {/*<GridTile>*/}
                        {/*<div>*/}
                        {/*<b>K/D/A</b>*/}
                        {/*<p>{this.state.Player.lifetime_stats.kda.toFixed(2)}</p>*/}
                        {/*</div>*/}
                        {/*</GridTile>*/}
                    </GridList>
                </Card>
                <Card style={cardStyles.tabs}>
                    <Tabs tabItemContainerStyle={{backgroundColor: blue500}}>
                        {this.state.Player.profile.servers.map((i) =>
                            <Tab key={i.server} label={i.server}>
                                <div>
                                    <h2 style={tabStyles.headerTitle}>{i.server.toUpperCase()}</h2>
                                    <p>
                                        This is an example tab.
                                    </p>
                                    <p>
                                        You can put any sort of HTML or react component in here. It even keeps the
                                        component
                                        state!
                                    </p>

                                </div>
                            </Tab>
                        )}
                    </Tabs>
                </Card>


                <Card style={cardStyles.tabs}>
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

                    <CardTitle title={this.state.Player.profile.nickname} subtitle={this.state.Player.profile.id}
                               titleStyle={titleStyles}/>


                    <CardText style={textStyles}>

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

export default withRouter(Player);

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