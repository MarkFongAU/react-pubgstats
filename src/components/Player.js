/**
 * Components - Player.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import wallpaper from '../image/pubg-man.jpg'
import PlayedWith from './PlayedWith';

// Material UI dependencies - Player profile (Card)
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";


// Player profile Style
const divStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    // minHeight: '300px',
};

const statsStyles = {
    header: {
        // width: '100%',
        // height: '300px',
        // backgroundImage: 'url(' + wallpaper + ')',
        // opacity: 0.5,
        // backgroundSize: 'cover',
        // overflow: 'hidden',
        // backgroundColor: 'transparent',
    },
    lifetimeStats: {
        textAlign: 'center',
    },
    serverStats: {
        textAlign: 'center',
    },
    noGamesPlayed: {
        textAlign: 'center',
        fontSize: '20px',
    }
};

const tabStyles = {
    paper: {
        width: '98%',
        margin: 'auto',
    },
    headerTitle: {
        fontSize: 24,
        // paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

const innerGridStyles = {
    // backgroundColor: red500,
    width: '90%',
    margin: 'auto',
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

const recentMatchesStyles = {
    title: {
        textAlign: 'center',
        // color: 'white',
        fontSize: '20px',
    },
    subtitle: {
        textAlign: 'center',
    },
    stats: {
        textAlign: 'center',
    }
};

// Player ID (based on OP.gg)
// rtzW_RED
// const playerID = '59fe3604465dcc0001b82b45';
// LanYunKris
// const playerID = '5a43115bbf121f00014fadcf';
// OTsong
// const playerID = '59fda96523e6d80001da818d';

// Player - display player's stats
class Player extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Player: [],
            ComponentLoaded: false,
            GameMode: {
                tpp: [
                    {mode: 'tpp1', label: 'Solo'},
                    {mode: 'tpp2', label: 'Duo'},
                    {mode: 'tpp4', label: 'Squad'},

                ],
                fpp: [
                    {mode: 'fpp1', label: 'Solo'},
                    {mode: 'fpp2', label: 'Duo'},
                    {mode: 'fpp4', label: 'Squad'},
                ]
            },
            CurrentTabServer: '',
            CurrentTabSeason: '',
            // Servers: [],
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

        this.FriendListComponent = null;
    }

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
                // Server returns empty object due to invalid player ID
                if (data.player === null) {
                    console.log('Invalid Player ID');
                    this.props.history.push('/*');
                } else {
                    this.setStateAsync({Player: data.player});
                    // this.setState({Player: data.player});
                    // console.log(this.state.Player);

                    // Allow the page to render after the player stats has been loaded
                    this.setStateAsync({ComponentLoaded: true});
                }
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
        await fetch(`/api/users/${this.state.ID}/ranked-stats?server=${server}&season=${season}`)
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
        await this.setState({ID: this.props.match.params.id});
        console.log(this.state.ID);
        await this.getPlayerStats(this.state.ID);
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

    }

    // HandleOnClick = () => {
    //     console.log("here");
    //     // return <Redirect to='/'/>;
    //     // this.props.history.push("/");
    //     // return <Redirect to="/" push/>;
    //     // e.preventDefault();
    //     this.props.history.push('/');
    // };

    // CONTINUE HERE
    TabServerChange = (value) => {
        // this.setState({
        //     CurrentTabServer: value,
        // });
        // console.log('Current tab on:' + 'Server:' + this.state.CurrentTabServer + ' Season: ' + this.state.CurrentTabSeason);
        // this.renderFriendList();
    };

    TabSeasonChange = (value) => {
        // this.setState({
        //     CurrentTabSeason: value,
        // });
        // console.log('Current tab on' + ' Server:' + this.state.CurrentTabServer + ' Season: ' + this.state.CurrentTabSeason);
        // this.renderFriendList();
    };

    renderFriendList(playerID, server, season) {
        this.FriendListComponent = <PlayedWith playerID={playerID} server={server}
                                               season={season}/>
    }

    render() {
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

        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div style={divStyles}>
                <Card style={statsStyles.header}>
                    <CardTitle title={this.state.Player.profile.nickname} subtitle={this.state.Player.profile.id}/>
                    <GridList
                        cols={3}
                        cellHeight="auto"
                        padding={5}
                        style={statsStyles.lifetimeStats}
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
                    </GridList>
                </Card>

                {/* Servers Tabs */}
                <Paper zDepth={1}>
                    <Tabs tabItemContainerStyle={{backgroundColor: blue500}}>
                        {this.state.Player.profile.servers.map((server) =>
                            <Tab key={server.server} label={server.server} value={server.server} onActive={this.TabServerChange}>
                                <br/>

                                {/* TPP/FPP Tabs */}
                                <Paper zDepth={1} style={tabStyles.paper}>
                                    <Tabs tabItemContainerStyle={{backgroundColor: green500}}>
                                        <Tab key='tpp' label='tpp' value='tpp'>
                                            <br/>

                                            {/* Seasons Tabs */}
                                            <Paper zDepth={1} style={tabStyles.paper}>
                                                <Tabs tabItemContainerStyle={{backgroundColor: purple500}}>
                                                    {this.state.Player.profile.seasons.map((season) =>
                                                        <Tab key={season.season} label={season.season}
                                                             value={server.season} onActive={this.TabSeasonChange}>
                                                            <div>
                                                                {this.state.GameMode.tpp.map((mode) =>
                                                                    <Card key={mode.mode}>
                                                                        <CardTitle title={mode.label}/>
                                                                        {this.state.Player.server_stats[server.server][season.season][mode.mode].rating ?
                                                                            <GridList
                                                                                cols={3}
                                                                                cellHeight="auto"
                                                                                padding={5}
                                                                                style={statsStyles.serverStats}
                                                                            >
                                                                                <Subheader
                                                                                    style={{fontSize: 20}}>Rating: {this.state.Player.server_stats[server.server][season.season][mode.mode].rating},
                                                                                    Games
                                                                                    Played: {this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt}</Subheader>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].win_matches_cnt} /
                                                                                                {(this.state.Player.server_stats[server.server][season.season][mode.mode].win_matches_cnt / this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt).toFixed(1)} %
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Wins / Win %</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].topten_matches_cnt} /
                                                                                                {(this.state.Player.server_stats[server.server][season.season][mode.mode].topten_matches_cnt / this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt).toFixed(1)} %
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Top 10s / Top 10%</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b># {this.state.Player.server_stats[server.server][season.season][mode.mode].rank_avg.toFixed(1)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. Rank</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum / this.state.Player.server_stats[server.server][season.season][mode.mode].deaths_sum).toFixed(2)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>K/D</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].headshot_kills_sum / this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum).toFixed(1)}%
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Headshot %</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].damage_dealt_avg.toFixed(0)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. Damage</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{((this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum + this.state.Player.server_stats[server.server][season.season][mode.mode].assists_sum) / this.state.Player.server_stats[server.server][season.season][mode.mode].deaths_sum).toFixed(2)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>KDA</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].kills_max}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Most Kills</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].time_survived_avg / 60).toFixed(2)} minutes
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. survival
                                                                                                time</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                            </GridList> :
                                                                            <CardText style={statsStyles.noGamesPlayed}>
                                                                                There is
                                                                                no {mode.label.toLowerCase()} TPP game
                                                                                yet
                                                                            </CardText>
                                                                        }
                                                                    </Card>
                                                                )}
                                                            </div>
                                                        </Tab>
                                                    )}
                                                </Tabs>
                                            </Paper>

                                            <br/>
                                        </Tab>
                                        <Tab key='fpp' label='fpp' value='fpp'>
                                            <br/>

                                            {/* Seasons Tabs */}
                                            <Paper zDepth={1} style={tabStyles.paper}>
                                                <Tabs tabItemContainerStyle={{backgroundColor: purple500}}>
                                                    {this.state.Player.profile.seasons.map((season) =>
                                                        <Tab key={season.season} label={season.season}
                                                             value={server.season} onActive={this.TabSeasonChange}>
                                                            <div>
                                                                {this.state.GameMode.fpp.map((mode) =>
                                                                    <Card key={mode.mode}>
                                                                        <CardTitle title={mode.label}/>
                                                                        {this.state.Player.server_stats[server.server][season.season][mode.mode].rating ?
                                                                            <GridList
                                                                                cols={3}
                                                                                cellHeight="auto"
                                                                                padding={5}
                                                                                style={statsStyles.serverStats}
                                                                            >
                                                                                <Subheader
                                                                                    style={{fontSize: 20}}>Rating: {this.state.Player.server_stats[server.server][season.season][mode.mode].rating},
                                                                                    Games
                                                                                    Played: {this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt}</Subheader>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].win_matches_cnt} /
                                                                                                {(this.state.Player.server_stats[server.server][season.season][mode.mode].win_matches_cnt / this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt).toFixed(1)} %
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Wins / Win %</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].topten_matches_cnt} /
                                                                                                {(this.state.Player.server_stats[server.server][season.season][mode.mode].topten_matches_cnt / this.state.Player.server_stats[server.server][season.season][mode.mode].matches_cnt).toFixed(1)} %
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Top 10s / Top 10%</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b># {this.state.Player.server_stats[server.server][season.season][mode.mode].rank_avg.toFixed(1)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. Rank</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum / this.state.Player.server_stats[server.server][season.season][mode.mode].deaths_sum).toFixed(2)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>K/D</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].headshot_kills_sum / this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum).toFixed(1)}%
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Headshot %</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].damage_dealt_avg.toFixed(0)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. Damage</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{((this.state.Player.server_stats[server.server][season.season][mode.mode].kills_sum + this.state.Player.server_stats[server.server][season.season][mode.mode].assists_sum) / this.state.Player.server_stats[server.server][season.season][mode.mode].deaths_sum).toFixed(2)}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>KDA</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{this.state.Player.server_stats[server.server][season.season][mode.mode].kills_max}
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Most Kills</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                                <GridTile>
                                                                                    <div>
                                                                                        <p>
                                                                                            <b>{(this.state.Player.server_stats[server.server][season.season][mode.mode].time_survived_avg / 60).toFixed(2)} minutes
                                                                                            </b>
                                                                                            <br/>
                                                                                            <sub>Avg. survival
                                                                                                time</sub>
                                                                                        </p>
                                                                                    </div>
                                                                                </GridTile>
                                                                            </GridList> :
                                                                            <CardText style={statsStyles.noGamesPlayed}>
                                                                                There is
                                                                                no {mode.label.toLowerCase()} FPP game
                                                                                yet
                                                                            </CardText>
                                                                        }
                                                                    </Card>
                                                                )}
                                                            </div>
                                                        </Tab>
                                                    )}
                                                </Tabs>
                                            </Paper>

                                            <br/>
                                        </Tab>
                                    </Tabs>
                                </Paper>

                                <br/>
                            </Tab>
                        )}
                    </Tabs>
                </Paper>

                {/* Friend List Component */}
                {this.FriendListComponent}

                {/*<Card>*/}
                {/*<CardHeader*/}
                {/*title="Recently Played With"*/}
                {/*// subtitle="Subtitle"*/}
                {/*// avatar="images/jsa-128.jpg"*/}
                {/*/>*/}
                {/*<CardMedia*/}
                {/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}*/}
                {/*>*/}
                {/*<img src="images/nature-600-337.jpg" alt=""/>*/}
                {/*</CardMedia>*/}

                {/*Insert PlayedWith component*/}
                {/*</Card>*/}

                <Card>
                    <CardTitle title='Recent games' subtitle='Subtitles here'
                               titleStyle={recentMatchesStyles.title} subtitleStyle={recentMatchesStyles.subtitle}/>
                    <CardText style={recentMatchesStyles.stats}>
                        Add 20 match summary

                        Include - Rating change, Pie chart of Queue Size, Avg. Rank, K/D, Damage, Survived time

                    </CardText>
                    {/*<CardActions>*/}
                    {/*<FlatButton label="Action1"/>*/}
                    {/*<FlatButton label="Action2"/>*/}
                    {/*</CardActions>*/}
                    {/*<GridList*/}
                    {/*cols={2}*/}
                    {/*cellHeight="auto"*/}
                    {/*padding={5}*/}
                    {/*>*/}
                    {/*<GridTile>*/}
                    {/*<Card style={{backgroundColor: red500}}>*/}

                    {/*<CardTitle title="Card title" subtitle="Card subtitle"/>*/}
                    {/*<CardText>*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                    {/*Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.*/}
                    {/*Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.*/}
                    {/*Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.*/}
                    {/*</CardText>*/}
                    {/*<CardActions>*/}
                    {/*<FlatButton label="Action1"/>*/}
                    {/*<FlatButton label="Action2"/>*/}
                    {/*</CardActions>*/}
                    {/*</Card>*/}
                    {/*</GridTile>*/}
                    {/*<GridTile>*/}
                    {/*<Card style={{backgroundColor: red500}}>*/}

                    {/*<CardTitle title="Card title" subtitle="Card subtitle"/>*/}
                    {/*<CardText>*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                    {/*Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.*/}
                    {/*Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.*/}
                    {/*Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.*/}
                    {/*</CardText>*/}
                    {/*<CardActions>*/}
                    {/*<FlatButton label="Action1"/>*/}
                    {/*<FlatButton label="Action2"/>*/}
                    {/*</CardActions>*/}
                    {/*</Card>*/}
                    {/*</GridTile>*/}
                    {/*</GridList>*/}

                    {/*<CardTitle title="Card title" subtitle="Card subtitle"/>*/}
                    {/*<CardText>*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                    {/*Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.*/}
                    {/*Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.*/}
                    {/*Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.*/}
                    {/*</CardText>*/}
                    {/*<CardActions>*/}
                    {/*<FlatButton label="Action1"/>*/}
                    {/*<FlatButton label="Action2"/>*/}
                    {/*</CardActions>*/}
                </Card>
            </div>
        );
    }
}

export default withRouter(Player);