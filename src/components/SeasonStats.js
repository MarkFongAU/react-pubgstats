/**
 * Components - SeasonStats.js
 */
import React, {Component} from 'react'

// Material UI dependencies - SeasonStats
import {Tabs, Tab} from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {green500} from "material-ui/styles/colors";

// Stats Style
const statsStyles = {
    stats: {
        textAlign: 'center',
    },
    noGamesPlayed: {
        textAlign: 'center',
        fontSize: '20px',
    }
};

// SeasonStats - display player's stats in the played season
class SeasonStats extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Season: '',
            Stats: [],
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
        };
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    // Async Get Stats of the Selected Season
    async getSeasonStats(playerID, server, season) {
        await fetch(`/seasonstats/${playerID}/ranked-stats?server=${server}&season=${season}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setStateAsync({
                    Stats: data.serverSeasonStats,
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
            Season: this.props.season
        });

        await this.getSeasonStats(this.state.ID, this.state.Server, this.state.Season);
        console.log(this.state.Stats);

        // Allow the component to render after the stats from the season has been loaded
        await this.setStateAsync({ComponentLoaded: true});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Season Stats */}
                {/* TPP/FPP Tabs */}
                <Card>
                    <Subheader>Season {this.state.Season}</Subheader>
                    <Tabs tabItemContainerStyle={{backgroundColor: green500}}>
                        <Tab key='tpp' label='tpp' value='tpp'>
                            <br/>
                            <div>
                                <GridList
                                    cols={3}
                                    cellHeight="auto"
                                    padding={5}
                                >
                                    {this.state.GameMode.tpp.map((mode) =>
                                        <GridTile key={mode.mode}>
                                            <CardTitle title={mode.label}/>
                                            <Divider/>
                                            <CardText>
                                                {this.state.Stats[mode.mode].rating ?
                                                    <GridList
                                                        cols={3}
                                                        cellHeight="auto"
                                                        padding={5}
                                                        style={statsStyles.stats}
                                                    >
                                                        <Subheader
                                                            style={{fontSize: 20}}>Rating: {this.state.Stats[mode.mode].rating},
                                                            Games
                                                            Played: {this.state.Stats[mode.mode].matches_cnt}</Subheader>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].win_matches_cnt} /
                                                                        {(this.state.Stats[mode.mode].win_matches_cnt / this.state.Stats[mode.mode].matches_cnt).toFixed(1)} %
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Wins / Win %</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].topten_matches_cnt} /
                                                                        {(this.state.Stats[mode.mode].topten_matches_cnt / this.state.Stats[mode.mode].matches_cnt).toFixed(1)} %
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Top 10s / Top 10%</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b># {this.state.Stats[mode.mode].rank_avg.toFixed(1)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. Rank</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{(this.state.Stats[mode.mode].kills_sum / this.state.Stats[mode.mode].deaths_sum).toFixed(2)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>K/D</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{(this.state.Stats[mode.mode].headshot_kills_sum / this.state.Stats[mode.mode].kills_sum).toFixed(1)}%
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Headshot %</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].damage_dealt_avg.toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. Damage</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{((this.state.Stats[mode.mode].kills_sum + this.state.Stats[mode.mode].assists_sum) / this.state.Stats[mode.mode].deaths_sum).toFixed(2)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>KDA</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].kills_max}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Most Kills</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{Math.floor(this.state.Stats[mode.mode].time_survived_avg / 60)}:{(Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60)) < 10 ? '0' + Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60) : Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60)} minutes
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. survival
                                                                        time</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                    </GridList> :
                                                    <div style={statsStyles.noGamesPlayed}>
                                                        There is
                                                        no {mode.label.toLowerCase()} TPP game
                                                        yet
                                                    </div>
                                                }
                                            </CardText>

                                        </GridTile>
                                    )}
                                </GridList>
                            </div>
                            <br/>
                        </Tab>
                        <Tab key='fpp' label='fpp' value='fpp'>
                            <br/>
                            <div>
                                <GridList
                                    cols={3}
                                    cellHeight="auto"
                                    padding={5}
                                >
                                    {this.state.GameMode.fpp.map((mode) =>
                                        <GridTile key={mode.mode}>
                                            <CardTitle title={mode.label}/>
                                            <Divider/>
                                            <CardText>
                                                {this.state.Stats[mode.mode].rating ?
                                                    <GridList
                                                        cols={3}
                                                        cellHeight="auto"
                                                        padding={5}
                                                        style={statsStyles.stats}
                                                    >
                                                        <Subheader
                                                            style={{fontSize: 20}}>Rating: {this.state.Stats[mode.mode].rating},
                                                            Games
                                                            Played: {this.state.Stats[mode.mode].matches_cnt}</Subheader>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].win_matches_cnt} /
                                                                        {(this.state.Stats[mode.mode].win_matches_cnt / this.state.Stats[mode.mode].matches_cnt).toFixed(1)} %
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Wins / Win %</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].topten_matches_cnt} /
                                                                        {(this.state.Stats[mode.mode].topten_matches_cnt / this.state.Stats[mode.mode].matches_cnt).toFixed(1)} %
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Top 10s / Top 10%</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b># {this.state.Stats[mode.mode].rank_avg.toFixed(1)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. Rank</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{(this.state.Stats[mode.mode].kills_sum / this.state.Stats[mode.mode].deaths_sum).toFixed(2)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>K/D</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{(this.state.Stats[mode.mode].headshot_kills_sum / this.state.Stats[mode.mode].kills_sum).toFixed(1)}%
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Headshot %</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].damage_dealt_avg.toFixed(0)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. Damage</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{((this.state.Stats[mode.mode].kills_sum + this.state.Stats[mode.mode].assists_sum) / this.state.Stats[mode.mode].deaths_sum).toFixed(2)}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>KDA</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{this.state.Stats[mode.mode].kills_max}
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Most Kills</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                        <GridTile>
                                                            <div>
                                                                <p>
                                                                    <b>{Math.floor(this.state.Stats[mode.mode].time_survived_avg / 60)}:{(Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60)) < 10 ? '0' + Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60) : Math.floor(this.state.Stats[mode.mode].time_survived_avg % 60)} minutes
                                                                    </b>
                                                                    <br/>
                                                                    <sub>Avg. survival
                                                                        time</sub>
                                                                </p>
                                                            </div>
                                                        </GridTile>
                                                    </GridList> :
                                                    <div style={statsStyles.noGamesPlayed}>
                                                        There is
                                                        no {mode.label.toLowerCase()} FPP game
                                                        yet
                                                    </div>
                                                }
                                            </CardText>
                                        </GridTile>
                                    )}
                                </GridList>
                            </div>
                            <br/>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default SeasonStats;