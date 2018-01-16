/**
 * Components - RecentGames.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

// Material UI dependencies - RecentGames
import FlatButton from 'material-ui/FlatButton';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";

const mediaStyles = {
    // width: '100%',
    height: '150px',
    // backgroundImage: 'url(' + wallpaper + ')',
    // opacity: 0.5,
    // backgroundSize: 'cover',
    // overflow: 'hidden',
    backgroundColor: 'transparent',
};

// Recent Games Summary Styles
const recentGamesSummaryStyles = {
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
    },
};

// Recent Games List Styles
const recentGamesListStyles = {
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

// RecentGames - display player's recent games (20)
class RecentGames extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Season: '',
            Games: [],
            ComponentLoaded: false,
            GameMode: {
                tpp: [
                    {key: 'tpp1', label: 'Solo TPP', mode: 'tpp', queue_size: '1'},
                    {key: 'tpp2', label: 'Duo TPP', mode: 'tpp', queue_size: '2'},
                    {key: 'tpp4', label: 'Squad TPP', mode: 'tpp', queue_size: '4'},

                ],
                fpp: [
                    {key: 'fpp1', label: 'Solo FPP', mode: 'fpp', queue_size: '1'},
                    {key: 'fpp2', label: 'Duo FPP', mode: 'fpp', queue_size: '2'},
                    {key: 'fpp4', label: 'Squad FPP', mode: 'fpp', queue_size: '4'},
                ]
            },
        };
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getRecentGames(playerID, server, season, mode, queue_size, after) {
        // /matches/recent?season=2018-01&server=as&queue_size=4&mode=tpp&after=0
        await fetch(`/recentgames/${playerID}/matches/recent?server=${server}&season=${season}&mode=${mode}&queue_size=${queue_size}&after=${after}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // // Server returns empty object due to invalid player ID
                // if (data.friendList === 'Invalid playerID') {
                //     console.log('Invalid Player ID');
                // } else if (data.friendList === 'Invalid server/season') {
                //     console.log('Invalid server/season');
                // } else {
                //     this.setStateAsync({List: data.friendList});
                //
                //     // Allow the component to render after the friend list has been loaded
                //     this.setStateAsync({ComponentLoaded: true});
                // }

                this.setStateAsync({
                    Games: data.recentGames,
                });

                // Allow the component to render after the recent games has been loaded
                this.setStateAsync({ComponentLoaded: true});
            })
            .catch(error => {
                // Potentially some code for generating an error specific message here
                console.log('React backend is not available.');
            });
    };

    async componentDidMount() {
        await this.setState({
            ID: this.props.playerID,
            Server: this.props.server,
            Season: this.props.season
        });
        await this.getRecentGames(this.state.ID, this.state.Server, this.state.Season, '', '', '');
        console.log(this.state.Games);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Games Summary (max 20) */}
                <Card>
                    <CardTitle title='Recently Games Summary'
                               titleStyle={recentGamesSummaryStyles.title}
                               subtitleStyle={recentGamesSummaryStyles.subtitle}/>

                    <Card>
                        <Subheader>Rating Changes in
                            Recent {this.state.Games.matches.summary.modes['4'].matches_cnt} Games</Subheader>
                        <Divider/>
                        <CardText>
                            {this.state.Games.matches.summary.modes['4'].rating_delta_sum.toFixed(0)}
                        </CardText>
                    </Card>

                    <Card>
                        <Subheader>Avg. Rank in
                            Recent {this.state.Games.matches.summary.modes['4'].matches_cnt} Games</Subheader>
                        <Divider/>
                        <CardText>
                            {this.state.Games.matches.summary.ranks_avg.toFixed(1)}
                        </CardText>
                    </Card>

                    <Card>
                        <Subheader>Recent {this.state.Games.matches.summary.modes['4'].matches_cnt} Game
                            Stats</Subheader>
                        <Divider/>
                        <GridList
                            cols={3}
                            cellHeight="auto"
                            padding={5}
                            style={recentGamesSummaryStyles.stats}
                        >
                            <GridTile>
                                <div>
                                    <p>
                                        <b>{(this.state.Games.matches.summary.kills_avg / this.state.Games.matches.summary.deaths_avg).toFixed(2)}
                                        </b>
                                        <br/>
                                        <sub>K/D</sub>
                                    </p>
                                </div>
                            </GridTile>
                            <GridTile>
                                <div>
                                    <p>
                                        <b>{this.state.Games.matches.summary.damage_avg.toFixed(0)}
                                        </b>
                                        <br/>
                                        <sub>Damage</sub>
                                    </p>
                                </div>
                            </GridTile>
                            <GridTile>
                                <div>
                                    <p>
                                        <b>{Math.floor(this.state.Games.matches.summary.time_survived_avg / 60)}:{Math.floor(this.state.Games.matches.summary.time_survived_avg % 60)} minutes
                                        </b>
                                        <br/>
                                        <sub>Survived time</sub>
                                    </p>
                                </div>
                            </GridTile>
                        </GridList>
                    </Card>
                </Card>

                {/* Recent Games List (max 20) CONTINUE HERE */}
                <Card>
                    <Subheader style={recentGamesListStyles.subHeader}>Modes :</Subheader>
                    <Divider/>
                    {/* Button modes */}
                    <div style={recentGamesListStyles.buttonList}>
                        {/* Total */}
                        <FlatButton key={'total'} label={'total'} onClick={async () => {
                            await this.getRecentGames(this.state.ID, this.state.Server, this.state.Season, '', '', '')
                        }}/>

                        {/* TPP */}
                        {this.state.GameMode.tpp.map((mode) =>
                            <FlatButton key={mode.key} label={mode.label} onClick={async () => {
                                await this.getRecentGames(this.state.ID, this.state.Server, this.state.Season, mode.mode, mode.queue_size, '')
                            }}/>
                        )}

                        {/* FPP */}
                        {this.state.GameMode.fpp.map((mode) =>
                            <FlatButton key={mode.key} label={mode.label} onClick={async () => {
                                await this.getRecentGames(this.state.ID, this.state.Server, this.state.Season, mode.mode, mode.queue_size, '')
                            }}/>
                        )}
                    </div>
                    <Divider/>

                    {/* Games List (max 20) */}
                    {this.state.Games.matches.items.map((match) =>
                        <Card key={match.match_id}>
                            <div>
                                Mode: {match.mode}
                            </div>
                            <div>
                                Queue Size: {match.queue_size}
                            </div>
                            <div>
                                Rank: {match.participant.stats.rank}/{match.total_rank}
                            </div>
                        </Card>
                    )}
                </Card>


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
                               titleStyle={recentGamesSummaryStyles.title} subtitleStyle={recentGamesSummaryStyles.subtitle}/>
                    <CardText style={recentGamesSummaryStyles.stats}>
                        Include - Rating change, Pie chart of Queue Size (not doing), Avg. Rank, K/D, Damage, Survived time (Done)

                        - Add 20 match summary (Halfway)
                        - add condition to handle empty match list (NOT DONE YET)

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

export default RecentGames;