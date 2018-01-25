/**
 * Components - GamesSummaryList.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Matches from './Matches';

// Material UI dependencies - GamesSummaryList
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import IconMenu from 'material-ui/IconMenu';

import {Tabs, Tab} from 'material-ui/Tabs';
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

// GamesSummaryList - display player's recent games summary and list (20)
class GamesSummaryList extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Season: '',
            Mode: '',
            QueueSize: '',
            Games: [],
            ComponentLoaded: false,
        };

    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    // Async Get Recent Games
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

            })
            .catch(error => {
                // Potentially some code for generating an error specific message here
                console.log('React backend is not available.');
            });
    };

    // Invoked immediately after a component is mounted
    async componentDidMount() {
        await this.setState({
            ID: this.props.playerID,
            Server: this.props.server,
            Season: this.props.season,
            Mode: this.props.mode,
            QueueSize: this.props.queue_size,
        });

        await this.getRecentGames(this.state.ID, this.state.Server, this.state.Season, this.state.Mode, this.state.QueueSize, '');

        // Allow the component to render after the recent games has been loaded
        await this.setStateAsync({ComponentLoaded: true});

        console.log(this.state.Games);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Games Summary (max 20) */}
                {this.state.Games.matches.summary.matches_cnt > 0 ?
                    <Card>
                        <CardTitle title='Recently Games Summary'
                                   titleStyle={recentGamesSummaryStyles.title}
                                   subtitleStyle={recentGamesSummaryStyles.subtitle}/>
                        <Card>
                            <Subheader>
                                Recent {this.state.Games.matches.summary.matches_cnt} Games Summary</Subheader>
                            <Divider/>

                            {this.state.Games.matches.summary.modes['1'] ?
                                <CardText>
                                    Solo : {this.state.Games.matches.summary.modes['1'].matches_cnt} Games
                                    <br/>
                                    Rating : {this.state.Games.matches.summary.modes['1'].rating_delta_sum.toFixed(0)}
                                </CardText>
                                :
                                <div/>
                            }
                            {this.state.Games.matches.summary.modes['2'] ?
                                <CardText>
                                    Duo : {this.state.Games.matches.summary.modes['2'].matches_cnt} Games
                                    <br/>
                                    Rating : {this.state.Games.matches.summary.modes['2'].rating_delta_sum.toFixed(0)}
                                </CardText>
                                :
                                <div/>
                            }
                            {this.state.Games.matches.summary.modes['4'] ?
                                <CardText>
                                    Squad : {this.state.Games.matches.summary.modes['4'].matches_cnt} Games
                                    <br/>
                                    Rating : {this.state.Games.matches.summary.modes['4'].rating_delta_sum.toFixed(0)}
                                </CardText>
                                :
                                <div/>
                            }
                        </Card>

                        <Card>
                            <Subheader> Avg.Rank in
                                Recent {this.state.Games.matches.summary.matches_cnt} Games </Subheader>
                            <Divider/>
                            <CardText>
                                {this.state.Games.matches.summary.ranks_avg.toFixed(1)}
                            </CardText>
                        </Card>

                        <Card>
                            <Subheader>Recent {this.state.Games.matches.summary.matches_cnt} Game
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

                {/* Recent Games List (max 20) */}
                <Card>
                    <Subheader
                        style={{fontSize: 20}}>The data will be refreshed once the winner is determined.</Subheader>
                    {this.state.Games.matches.summary.matches_cnt > 0 ?
                        <div>
                            {this.state.Games.matches.items.map((match) =>
                                <Card key={match.match_id}>
                                    {/* Basic Stats */}
                                    <GridList
                                        cols={7}
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
                                    </GridList>
                                    {/*<IconMenu*/}
                                        {/*iconButtonElement={<IconButton*/}
                                            {/*iconClassName="fa fa-caret-down"/>}*/}
                                        {/*anchorOrigin={{horizontal: 'left', vertical: 'top'}}*/}
                                        {/*targetOrigin={{horizontal: 'left', vertical: 'top'}}*/}
                                        {/*autoWidth={false}*/}
                                    {/*>*/}
                                        {/* Detailed Stats Toggle */}
                                        <Matches matchID={match.match_id} teamID={match.team._id}
                                                 player_overallstats={match.participant.stats}/>
                                    {/*</IconMenu>*/}
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

            </div>
        );
    }
}

export default GamesSummaryList;