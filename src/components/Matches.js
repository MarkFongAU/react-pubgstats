/**
 * Components - Matches.js
 */
import React, {Component} from 'react'

// Material UI dependencies - Matches
import {Tabs, Tab} from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {blue500} from "material-ui/styles/colors";

// Matches - display match details
class Matches extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            TeamID: '',
            PlayerStats: [],
            Match: [],
            TeamIDIndex: '',
            ComponentLoaded: false,
        };
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    // Async Get Match
    async getMatch(matchID) {
        await fetch(`/matches/${matchID}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setStateAsync({
                    Match: data.match,
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
            ID: this.props.matchID,
            TeamID: this.props.teamID,
            PlayerStats: this.props.player_overallstats,
        });

        await this.getMatch(this.state.ID);

        // Find the Index of the Team ID in the Teams Array
        await this.getTeamsIndex(this.state.TeamID);

        // Allow the component to render after the recent games has been loaded
        this.setStateAsync({ComponentLoaded: true});

        console.log(this.state.TeamID);
        console.log(this.state.TeamIDIndex);
        console.log(this.state.PlayerStats);
        console.log(this.state.Match);
    }

    // Async Get Team Index in the array
    async getTeamsIndex(teamID) {
        this.state.Match.teams
            .sort((a, b) => a.stats.rank - b.stats.rank)
            .map((team, index) => {
                if (team._id === teamID.toString()) {
                    console.log('Showing' + team._id, teamID);
                    this.setStateAsync({
                        TeamIDIndex: index,
                    });
                }
            })
    }

    // Form Team Username string
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

    // Calculate Team Total Kill
    calculateTotalKill(team) {
        let totalKills = 0;
        team.participants.map((participant) => {
            totalKills += participant.stats.combat.kda.kills;
        });
        return totalKills;
    }

    // Calculate Team Total Damage
    calculateTotalDamage(team) {
        let totalDamage = 0;
        team.participants.map((participant) => {
            totalDamage += participant.stats.combat.damage.damage_dealt;
        });
        return totalDamage;
    }

    // Calculate Team Average Distance
    calculateAvgDistance(team) {
        let distance = 0;
        let participant_count = 0;
        team.participants.map((participant) => {
            ++participant_count;
            distance += (participant.stats.combat.distance_traveled.walk_distance + participant.stats.combat.distance_traveled.ride_distance);
        });
        return ((distance / participant_count) / 1000).toFixed(2);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Match Details */}
                <Tabs tabItemContainerStyle={{backgroundColor: blue500}}>
                    <Tab key='overall' label='overall' value='overall'>
                        <div>
                            <GridList
                                cols={3}
                                cellHeight="auto"
                                padding={5}
                            >
                                <GridTile>
                                    <Subheader>Combat</Subheader>
                                    <Divider/>
                                    <Card>
                                        <CardText>
                                            <GridList
                                                cols={2}
                                                cellHeight="auto"
                                                padding={5}
                                            >
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{this.state.PlayerStats.combat.damage.damage_dealt.toFixed(0)}
                                                            </b>
                                                            <br/>
                                                            <sub>Damage</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{this.state.PlayerStats.combat.kda.kills} ({this.state.PlayerStats.combat.kda.headshot_kills})
                                                            </b>
                                                            <br/>
                                                            <sub>Kills (Headshot)</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{this.state.PlayerStats.combat.kda.assists}
                                                            </b>
                                                            <br/>
                                                            <sub>Assists</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{this.state.PlayerStats.combat.dbno.knock_downs}
                                                            </b>
                                                            <br/>
                                                            <sub>DBNO</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                            </GridList>
                                        </CardText>
                                    </Card>
                                </GridTile>
                                <GridTile>
                                    <Subheader>Distance</Subheader>
                                    <Divider/>
                                    <Card>
                                        <CardText>
                                            <GridList
                                                cols={2}
                                                cellHeight="auto"
                                                padding={5}
                                            >
                                                <GridTile cols={2}>
                                                    <div>
                                                        <p>
                                                            <b>{((this.state.PlayerStats.combat.distance_traveled.walk_distance + this.state.PlayerStats.combat.distance_traveled.ride_distance) / 1000).toFixed(2)} km
                                                            </b>
                                                            <br/>
                                                            <sub>Total Distance</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{(this.state.PlayerStats.combat.distance_traveled.walk_distance / 1000).toFixed(2)} km
                                                            </b>
                                                            <br/>
                                                            <sub>Walk Distance</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile>
                                                    <div>
                                                        <p>
                                                            <b>{(this.state.PlayerStats.combat.distance_traveled.ride_distance / 1000).toFixed(2)} km
                                                            </b>
                                                            <br/>
                                                            <sub>Ride Distance</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                            </GridList>
                                        </CardText>
                                    </Card>
                                </GridTile>
                                <GridTile>
                                    <Subheader>Survival</Subheader>
                                    <Divider/>
                                    <Card>
                                        <CardText>
                                            <GridList
                                                cols={1}
                                                cellHeight="auto"
                                                padding={5}
                                            >
                                                <GridTile cols={1}>
                                                    <div>
                                                        <p>
                                                            <b>{this.state.PlayerStats.combat.heals} / {this.state.PlayerStats.combat.boosts}
                                                            </b>
                                                            <br/>
                                                            <sub>Heals / Boosts</sub>
                                                        </p>
                                                    </div>
                                                </GridTile>
                                                <GridTile cols={1}>
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
                                        </CardText>
                                    </Card>
                                </GridTile>
                            </GridList>
                        </div>
                    </Tab>
                    <Tab key='total-rank' label='total rank' value='total-rank'>
                        <Card>
                            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>
                                <TableHeader displaySelectAll={false}
                                             adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Rank</TableHeaderColumn>
                                        <TableHeaderColumn>Username</TableHeaderColumn>
                                        <TableHeaderColumn>Total Kill</TableHeaderColumn>
                                        <TableHeaderColumn>Total Damage</TableHeaderColumn>
                                        <TableHeaderColumn>Avg Distance (km)</TableHeaderColumn>
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
                            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Username</TableHeaderColumn>
                                        <TableHeaderColumn>Kill</TableHeaderColumn>
                                        <TableHeaderColumn>Damage</TableHeaderColumn>
                                        <TableHeaderColumn>Assists</TableHeaderColumn>
                                        <TableHeaderColumn>DBNO</TableHeaderColumn>
                                        <TableHeaderColumn>Distance (km)</TableHeaderColumn>
                                        <TableHeaderColumn>Survived Time (minutes)</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.state.Match.teams[this.state.TeamIDIndex].participants.map((participant) =>
                                        <TableRow key={participant._id}>
                                            <TableRowColumn>{participant.user.nickname}</TableRowColumn>
                                            <TableRowColumn>{participant.stats.combat.kda.kills}
                                            </TableRowColumn>
                                            <TableRowColumn>{participant.stats.combat.damage.damage_dealt}
                                            </TableRowColumn>
                                            <TableRowColumn>{participant.stats.combat.kda.assists}
                                            </TableRowColumn>
                                            <TableRowColumn>{participant.stats.combat.dbno.knock_downs}
                                            </TableRowColumn>
                                            <TableRowColumn>{((participant.stats.combat.distance_traveled.walk_distance +
                                                participant.stats.combat.distance_traveled.ride_distance) / 1000).toFixed(2)}
                                            </TableRowColumn>
                                            <TableRowColumn>{Math.floor(participant.stats.combat.time_survived / 60)}:{(Math.floor(participant.stats.combat.time_survived % 60)) < 10 ? '0' + Math.floor(participant.stats.combat.time_survived % 60) : Math.floor(participant.stats.combat.time_survived % 60)}
                                            </TableRowColumn>
                                        </TableRow>
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