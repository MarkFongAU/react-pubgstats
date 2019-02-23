/**
 * Components - GamesSummaryList.js
 */
import React, {Component} from 'react'
import Matches from './Matches';

// Material UI dependencies - GamesSummaryList
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

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

// Recent Games Styles
const recentGamesStyles = {
    title: {
        textAlign: 'center',
        // color: 'white',
        fontSize: '20px',
    },
    subtitle: {
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
        await fetch(`/recentgames/${playerID}/matches/recent?server=${server}&season=${season}&mode=${mode}&queue_size=${queue_size}&after=${after}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.recentGames);
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
        console.log("Here");
    }

    // Convert the UTC time to local time
    formatTime(time) {
        let d = new Date(time);
        return d.toLocaleString();
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Games Summary (max 20) */}
                {this.state.Games.matches != null && this.state.Games.matches.summary.matches_cnt > 0 ?
                    <Card>
                        <CardTitle title='Recently Games Summary'
                                   titleStyle={recentGamesSummaryStyles.title}
                                   subtitleStyle={recentGamesSummaryStyles.subtitle}/>
                        <GridList
                            cols={3}
                            cellHeight="auto"
                            padding={5}
                        >
                            <GridTile>
                                <Subheader>
                                    Recent {this.state.Games.matches.summary.matches_cnt} Games Summary</Subheader>
                                <Divider/>
                                {this.state.Games.matches.summary.modes['1'] ?
                                    <CardText>
                                        Solo : {this.state.Games.matches.summary.modes['1'].matches_cnt} Games
                                        <br/>
                                        Rating
                                        Changes: {this.state.Games.matches.summary.modes['1'].rating_delta_sum.toFixed(0)}
                                    </CardText>
                                    :
                                    <div/>
                                }
                                {this.state.Games.matches.summary.modes['2'] ?
                                    <CardText>
                                        Duo : {this.state.Games.matches.summary.modes['2'].matches_cnt} Games
                                        <br/>
                                        Rating
                                        Changes: {this.state.Games.matches.summary.modes['2'].rating_delta_sum.toFixed(0)}
                                    </CardText>
                                    :
                                    <div/>
                                }
                                {this.state.Games.matches.summary.modes['4'] ?
                                    <CardText>
                                        Squad : {this.state.Games.matches.summary.modes['4'].matches_cnt} Games
                                        <br/>
                                        Rating
                                        Changes: {this.state.Games.matches.summary.modes['4'].rating_delta_sum.toFixed(0)}
                                    </CardText>
                                    :
                                    <div/>
                                }
                            </GridTile>
                            <GridTile>
                                <Subheader> Avg.Rank in
                                    Recent {this.state.Games.matches.summary.matches_cnt} Games </Subheader>
                                <Divider/>
                                <CardText>
                                    {this.state.Games.matches.summary.ranks_avg.toFixed(1)}
                                </CardText>
                            </GridTile>
                            <GridTile>
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
                                                <b>{Math.floor(this.state.Games.matches.summary.time_survived_avg / 60)}:{(Math.floor(this.state.Games.matches.summary.time_survived_avg % 60)) < 10 ? '0' + Math.floor(this.state.Games.matches.summary.time_survived_avg % 60) : Math.floor(this.state.Games.matches.summary.time_survived_avg % 60)} minutes
                                                </b>
                                                <br/>
                                                <sub>Survived time</sub>
                                            </p>
                                        </div>
                                    </GridTile>
                                </GridList>
                            </GridTile>
                        </GridList>
                    </Card> :
                    <Card>
                        <CardTitle title='Recently Games Summary'
                                   titleStyle={recentGamesSummaryStyles.title}
                                   subtitleStyle={recentGamesSummaryStyles.subtitle}/>
                        <CardText>
                            No games played, no stats summary.
                        </CardText>
                    </Card>
                }

                {/* Recent Games List (max 20) */}
                {this.state.Games.matches != null && this.state.Games.matches.summary.matches_cnt > 0 ?
                    <Card>
                        <CardTitle title='Recently Games'
                                   titleStyle={recentGamesStyles.title}
                                   subtitleStyle={recentGamesStyles.subtitle}/>
                        {this.state.Games.matches.items.map((match) =>
                            <Card key={match.match_id}>
                                {/* Basic Stats */}
                                <Subheader>Mode: {match.mode.toUpperCase()} Queue
                                    Size: {match.queue_size} Played on: {this.formatTime(match.started_at)}</Subheader>
                                <Divider/>
                                <CardText>
                                    <GridList
                                        cols={7}
                                        cellHeight="auto"
                                        padding={5}
                                    >
                                        <GridTile>
                                            <div>
                                                <p>
                                                    <b>{Math.floor(match.participant.stats.combat.time_survived / 60)}:{(Math.floor(match.participant.stats.combat.time_survived % 60)) < 10 ? '0' + Math.floor(match.participant.stats.combat.time_survived % 60) : Math.floor(match.participant.stats.combat.time_survived % 60)} minutes
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
                                                    <b>{((match.participant.stats.combat.distance_traveled.walk_distance + match.participant.stats.combat.distance_traveled.ride_distance) / 1000).toFixed(2)} km
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
                                    {/* Detailed Stats Toggle */}
                                    <IconMenu
                                        iconButtonElement={<RaisedButton label="More Details" primary={true}/>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        autoWidth={false}
                                    >
                                        <div style={{height: 300}}>
                                            <Matches matchID={match.match_id} teamID={match.team._id}
                                                     player_overallstats={match.participant.stats}/>
                                        </div>
                                    </IconMenu>
                                </CardText>
                            </Card>
                        )}
                    </Card> :
                    <Card>
                        <CardTitle title='Recently Games'
                                   titleStyle={recentGamesStyles.title}
                                   subtitleStyle={recentGamesStyles.subtitle}/>
                        <CardText>
                            No games played, no recent games.
                        </CardText>
                    </Card>
                }
            </div>
        );
    }
}

export default GamesSummaryList;