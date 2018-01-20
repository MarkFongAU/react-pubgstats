/**
 * Components - RecentGames.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

// Material UI dependencies - RecentGames
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import IconMenu from 'material-ui/IconMenu';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";

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

        {/* Render Recent Games */} {/* Continue Here */}
        // if (this.state.SelectedServer) {
        //     this.ServerStatsComponent =
        //         <ServerStats key={this.state.SelectedServer} playerID={this.state.Player.profile.id}
        //                      server={this.state.SelectedServer} seasons={this.state.Player.profile.seasons}/>;
        // }

        return (
            <div>
                {/* Recent Games Summary (max 20) */}
                {this.state.Games.matches.summary.modes ?
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
                    </Card> :
                    <Card>
                        <CardText>
                            No games played, no stats.
                        </CardText>
                    </Card>
                }

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
                    <Subheader
                        style={{fontSize: 20}}>The data will be refreshed once the winner is determined.</Subheader>
                    {this.state.Games.matches.items ?
                        <div>
                            {this.state.Games.matches.items.map((match, index) =>
                                <Card key={match.match_id}>
                                    {/* Basic Stats */}
                                    <GridList
                                        cols={8}
                                        cellHeight="auto"
                                        padding={5}
                                    >
                                        <Subheader>Game ID: {match.match_id} Mode: {match.mode} Queue
                                            Size: {match.queue_size} Played on: {match.started_at}</Subheader>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{Math.floor(match.participant.stats.combat.time_survived / 60)}:{Math.floor(match.participant.stats.combat.time_survived % 60)} minutes
                                                    </b>
                                                    <br/>
                                                    <sub>Time Survived</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b># {match.participant.stats.rank} / {match.total_rank}
                                                    </b>
                                                    <br/>
                                                    <sub>Rank</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{match.participant.stats.rating_delta.toFixed(0)}
                                                    </b>
                                                    <br/>
                                                    <sub>Rating Changed</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{match.participant.stats.combat.kda.kills}
                                                    </b>
                                                    <br/>
                                                    <sub>Kills</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{match.participant.stats.combat.damage.damage_dealt.toFixed(0)}
                                                    </b>
                                                    <br/>
                                                    <sub>Damage</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{(match.participant.stats.combat.distance_traveled.walk_distance + match.participant.stats.combat.distance_traveled.ride_distance).toFixed(0)}
                                                    </b>
                                                    <br/>
                                                    <sub>Distance</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{match.team._id}
                                                    </b>
                                                    <br/>
                                                    <sub>Teammates ID</sub>
                                                </p>
                                            </div>
                                        </GridTile>
                                        <GridTile>
                                            {/*<Toggle*/}
                                            {/*label="More Details"*/}
                                            {/*defaultToggled={true}*/}
                                            {/*onToggle={this.handleChange}*/}
                                            {/*labelPosition="right"*/}
                                            {/*style={{margin: 20}}*/}
                                            {/*/>*/}
                                            <IconMenu
                                                iconButtonElement={<IconButton
                                                    iconClassName="fa fa-caret-down"/>}
                                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                            >
                                                {/* Detailed Stats Toggle*/}
                                                <Card>
                                                    <GridList
                                                        cols={3}
                                                        cellHeight="auto"
                                                        padding={5}
                                                    >
                                                        <GridTile>
                                                            <Subheader>Combat</Subheader>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.damage.damage_dealt.toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Damage</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.kda.kills} ({match.participant.stats.combat.kda.headshot_kills})
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Kills (Headshot)</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.kda.assists}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Assists</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.dbno.knock_downs}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>DBNO</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <Subheader>Distance</Subheader>
                                                            <div>
                                                                <p>
                                                                    <b>{(match.participant.stats.combat.distance_traveled.walk_distance + match.participant.stats.combat.distance_traveled.ride_distance).toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Total Distance</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.distance_traveled.walk_distance.toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Walk Distance</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.distance_traveled.ride_distance.toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Ride Distance</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <Subheader>Survival</Subheader>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.heals} / {match.participant.stats.combat.boosts}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Heals / Boosts</sub>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <b>{match.participant.stats.combat.dbno.revives}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Revives</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                    </GridList>
                                                </Card>
                                            </IconMenu>
                                        </GridTile>
                                    </GridList>
                                </Card>
                            )}
                        </div> :
                        <div>
                            <Card>
                                <CardText>
                                    No games played, no stats.
                                </CardText>
                            </Card>
                        </div>
                    }
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
                               titleStyle={recentGamesSummaryStyles.title}
                               subtitleStyle={recentGamesSummaryStyles.subtitle}/>
                    <CardText style={recentGamesSummaryStyles.stats}>
                        Include - Rating change, Pie chart of Queue Size (not doing), Avg. Rank, K/D, Damage, Survived
                        time (Done)

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