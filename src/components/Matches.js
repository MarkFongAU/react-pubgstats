/**
 * Components - Matches.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

// Material UI dependencies - Matches
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

// Matches - display match details
class Matches extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            TeamID: '',
            PlayerStats: [],
            Match: [],
            ComponentLoaded: false,
        };
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getMatch(matchID) {
        // /matches/recent?season=2018-01&server=as&queue_size=4&mode=tpp&after=0
        await fetch(`/matches/${matchID}`)
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
                    Match: data.match,
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
            ID: this.props.matchID,
            TeamID: this.props.teamID,
            PlayerStats: this.props.player_overallstats,
        });

        await this.getMatch(this.state.ID);
        console.log(this.state.TeamID);
        console.log(this.state.PlayerStats);
        console.log(this.state.Match);
    }

    formUsernameString(team) {
        let string = '';
        let participant_count = 0;
        let participant_count_full = team.participants.length;
        team.participants.map((participant) => {
            ++participant_count;
            if (participant_count < participant_count_full) {
                string += participant.user.nickname + ' , ';
            } else {
                string += participant.user.nickname;
            }
        });
        return string;
    }

    calculateTotalKill(team) {
        let totalKills = 0;
        team.participants.map((participant) => {
            totalKills += participant.stats.combat.kda.kills;
        });
        return totalKills;
    }

    calculateTotalDamage(team) {
        let totalDamage = 0;
        team.participants.map((participant) => {
            totalDamage += participant.stats.combat.damage.damage_dealt;
        });
        return totalDamage;
    }

    calculateAvgDistance(team) {
        let distance = 0;
        let participant_count = 0;
        team.participants.map((participant) => {
            ++participant_count;
            distance += (participant.stats.combat.distance_traveled.walk_distance + participant.stats.combat.distance_traveled.ride_distance);
        });
        return distance / participant_count;
    }

    displayTeamStat(team) {
        let string = '';
        team.participants.map((participant) => {
            string += <TableRow key={participant._id}>
                <TableRowColumn>{participant.user.nickname}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.kda.kills}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.damage.damage_dealt}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.kda.assists}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.dbno.knock_downs}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.distance_traveled.walk_distance + participant.stats.combat.distance_traveled.ride_distance}</TableRowColumn>
                <TableRowColumn>{participant.stats.combat.time_survived}</TableRowColumn>
            </TableRow>;
        });
        return string;
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Match Details */}
                <Tabs tabItemContainerStyle={{backgroundColor: blue500}}>
                    <Tab key='overall' label='overall' value='overall'>
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
                                            <b>{this.state.PlayerStats.combat.damage.damage_dealt.toFixed(0)}
                                            </b>
                                            <br/>
                                            <sub>Damage</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.kda.kills} ({this.state.PlayerStats.combat.kda.headshot_kills})
                                            </b>
                                            <br/>
                                            <sub>Kills (Headshot)</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.kda.assists}
                                            </b>
                                            <br/>
                                            <sub>Assists</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.dbno.knock_downs}
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
                                            <b>{(this.state.PlayerStats.combat.distance_traveled.walk_distance + this.state.PlayerStats.combat.distance_traveled.ride_distance).toFixed(0)}
                                            </b>
                                            <br/>
                                            <sub>Total Distance</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.distance_traveled.walk_distance.toFixed(0)}
                                            </b>
                                            <br/>
                                            <sub>Walk Distance</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.distance_traveled.ride_distance.toFixed(0)}
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
                                            <b>{this.state.PlayerStats.combat.heals} / {this.state.PlayerStats.combat.boosts}
                                            </b>
                                            <br/>
                                            <sub>Heals / Boosts</sub>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <b>{this.state.PlayerStats.combat.dbno.revives}
                                            </b>
                                            <br/>
                                            <sub>Revives</sub>
                                        </p>
                                    </div>
                                </GridTile>
                            </GridList>
                        </Card>
                    </Tab>
                    <Tab key='total-rank' label='total rank' value='total-rank'>
                        <Card>
                            <Table>
                                <TableHeader displaySelectAll={false}
                                             adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Rank</TableHeaderColumn>
                                        <TableHeaderColumn>Username</TableHeaderColumn>
                                        <TableHeaderColumn>Total Kill</TableHeaderColumn>
                                        <TableHeaderColumn>Total Damage</TableHeaderColumn>
                                        <TableHeaderColumn>Avg Distance</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.Match.teams.map((team) =>
                                        <TableRow key={team._id}>
                                            <TableRowColumn>{team.stats.rank}</TableRowColumn>
                                            <TableRowColumn>
                                                {this.formUsernameString(team)}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {this.calculateTotalKill(team)}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {this.calculateTotalDamage(team)}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {this.calculateAvgDistance(team)}
                                            </TableRowColumn>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </Tab>
                    <Tab key='team-stats' label='team stats' value='team-stats'>
                        <Card>
                            <Table>
                                <TableHeader displaySelectAll={false}
                                             adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Username</TableHeaderColumn>
                                        <TableHeaderColumn>Kill</TableHeaderColumn>
                                        <TableHeaderColumn>Damage</TableHeaderColumn>
                                        <TableHeaderColumn>Assists</TableHeaderColumn>
                                        <TableHeaderColumn>DBNO</TableHeaderColumn>
                                        <TableHeaderColumn>Distance</TableHeaderColumn>
                                        <TableHeaderColumn>Survived Time</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.Match.teams.map((team) => {
                                            if (team._id === this.state.TeamID) this.displayTeamStat(team)
                                        }
                                        // {team._id === this.state.TeamID ? team.participants.map((participant) => {
                                        //     return <TableRow key={participant._id}>
                                        //         <TableRowColumn>{participant.user.nickname}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.kda.kills}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.damage.damage_dealt}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.kda.assists}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.dbno.knock_downs}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.distance_traveled.walk_distance + participant.stats.combat.distance_traveled.ride_distance}</TableRowColumn>
                                        //         <TableRowColumn>{participant.stats.combat.time_survived}</TableRowColumn>
                                        //     </TableRow>
                                        // }): ''}

                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Matches;

// let string = '';
// console.log(team._id);
//     if (team._id === this.state.TeamID) {
//         team.participants.map((participant) => {
//             string += <TableRow key={participant._id}>
//                 + <TableRowColumn>{participant.user.nickname}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.kda.kills}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.damage.damage_dealt}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.kda.assists}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.dbno.knock_downs}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.distance_traveled.walk_distance + participant.stats.combat.distance_traveled.ride_distance}</TableRowColumn>
//                 + <TableRowColumn>{participant.stats.combat.time_survived}</TableRowColumn>
//                 + </TableRow>;
//
//         });
//     }
// return string;
// }

