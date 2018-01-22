/**
 * Components - Player.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import wallpaper from '../image/pubg-man.jpg'
import ServerStats from './ServerStats';

// Material UI dependencies - Player profile
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

// Player profile page Style
const pageStyles = {
    backgroundImage: 'url(' + wallpaper + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
};

// Lifetime Stats Style
const lifetimeStyles = {
    subHeader: {
        fontSize: '20px',
    },
    gridTile: {
        textAlign: 'center',
    },
};

// Server list Style
const serverListStyles = {
    subHeader: {
        textAlign: 'center',
        fontSize: '20px',
    },
    buttonList: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
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
            SelectedServer: '',
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

        this.ServerStatsComponent = null;
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getPlayerStats(playerID) {
        await fetch(`/player/${playerID}`)
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

    switchServer(server) {
        // console.log('PlayerID: ' + playerID + ' Server:' + server + ' Seasons:' + seasons);
        this.setState({SelectedServer: server});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        {/* Render ServerStats */}
        if (this.state.SelectedServer) {
            this.ServerStatsComponent =
                <ServerStats key={this.state.SelectedServer} playerID={this.state.Player.profile.id}
                             server={this.state.SelectedServer} seasons={this.state.Player.profile.seasons}/>;
        }

        return (
            <div>
                {/* Lifetime Stats */}
                <Card>
                    <CardTitle title={this.state.Player.profile.nickname} subtitle={this.state.Player.profile.id}/>
                    <GridList
                        cols={3}
                        cellHeight="auto"
                        padding={5}
                        style={lifetimeStyles.gridTile}
                    >
                        <Subheader style={lifetimeStyles.subHeader}>Lifetime Stats:</Subheader>
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

                {/* List of Servers */}
                <Card>
                    <Subheader style={serverListStyles.subHeader}>Servers:</Subheader>
                    <Divider/>
                    <div style={serverListStyles.buttonList}>
                        {this.state.Player.profile.servers.map((server) =>
                            <FlatButton key={server.server} label={server.server} onClick={() => {
                                this.switchServer(server.server);
                            }}/>
                        )}
                    </div>
                </Card>

                {/* Server Stats Component */}
                {this.ServerStatsComponent}
            </div>
        );
    }
}

export default withRouter(Player);