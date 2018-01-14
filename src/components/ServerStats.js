/**
 * Components - ServerStats.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import SeasonStats from './SeasonStats';
import RecentPlayedWith from './RecentPlayedWith';
import RecentGames from './RecentGames';

// Material UI dependencies - ServerStats
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";

// Season list Style
const seasonListStyles = {
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

// ServerStats - display player's stats in the played server
class ServerStats extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Seasons: [],
            CurrentSeason: '2018-01',
            ComponentLoaded: false,
        };

        this.SeasonStatsComponent = null;
        this.RecentPlayedWithComponent = null;
        this.RecentGamesComponent = null;
    }

    async componentDidMount() {
        await this.setState({
            ID: this.props.playerID,
            Server: this.props.server,
            Seasons: this.props.seasons,
        });

        console.log('PlayerID: ' + this.state.ID + ' Server:' + this.state.Server + ' Seasons:' + this.state.Seasons);

        // Allow the page to render after the parameters has been loaded
        await this.setState({ComponentLoaded: true});
    }

    renderSeasonStats(playerID, server, season) {
        this.SeasonStatsComponent = <SeasonStats playerID={playerID} server={server}
                                                           season={season}/>
    }

    renderRecentPlayedWith(playerID, server, season) {
        this.RecentPlayedWithComponent = <RecentPlayedWith playerID={playerID} server={server}
                                                           season={season}/>
    }

    renderRecentGames(playerID, server, season) {
        this.RecentGamesComponent = <RecentGames playerID={playerID} server={server}
                                                           season={season}/>
    }

    switchSeason(playerID, server, season) {
        this.renderSeasonStats(playerID, server, season);
        this.renderRecentPlayedWith(playerID, server, season);
        this.renderRecentGames(playerID, server, season);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* List of seasons */}
                <Card>
                    <Subheader style={seasonListStyles.subHeader}>Seasons:</Subheader>
                    <div style={seasonListStyles.buttonList}>
                        {this.state.Seasons.map((season) =>
                            <FlatButton key={season.season} label={season.season} onClick={() => {
                                this.switchSeason(this.state.ID, this.state.Server, season.season)
                            }}/>
                        )}
                    </div>
                </Card>

                {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                    {/*<MenuItem value={1} primaryText="Never" />*/}
                    {/*<MenuItem value={2} primaryText="Every Night" />*/}
                    {/*<MenuItem value={3} primaryText="Weeknights" />*/}
                    {/*<MenuItem value={4} primaryText="Weekends" />*/}
                    {/*<MenuItem value={5} primaryText="Weekly" />*/}
                {/*</DropDownMenu>*/}

                {/* Season Stats Component*/}
                {this.SeasonStatsComponent}

                {/* Recent Played With Component */}
                {this.RecentPlayedWithComponent}

                {/* Recent Games (20) Component */}
                {this.RecentGamesComponent}
            </div>
        );
    }
}

export default ServerStats;