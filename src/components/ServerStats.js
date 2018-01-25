/**
 * Components - ServerStats.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import SeasonStats from './SeasonStats';
import RecentPlayedWith from './RecentPlayedWith';
import RecentGamesMode from './RecentGamesMode';

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
            SelectedSeason: '2018-01',
            ComponentLoaded: false,
        };

        this.SeasonStatsComponent = null;
        this.RecentPlayedWithComponent = null;
        this.RecentGamesModeComponent = null;
    }

    // Invoked immediately after a component is mounted
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

    switchSeason(season) {
        this.setState({SelectedSeason: season});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        {/* Render SeasonStats */}
        if (this.state.SelectedSeason) {
            this.SeasonStatsComponent =
                <SeasonStats key={'SeasonStats' + '-' + this.state.SelectedSeason} playerID={this.state.ID} server={this.state.Server}
                             season={this.state.SelectedSeason}/>;

            this.RecentPlayedWithComponent =
                <RecentPlayedWith key={'RecentPlayedWith' + '-' + this.state.SelectedSeason} playerID={this.state.ID} server={this.state.Server}
                                  season={this.state.SelectedSeason}/>;

            this.RecentGamesModeComponent =
                <RecentGamesMode key={'RecentGamesMode' + '-' + this.state.SelectedSeason} playerID={this.state.ID} server={this.state.Server}
                             season={this.state.SelectedSeason}/>;
        }

        return (
            <div>
                {/* List of seasons */}
                <Card>
                    <Subheader style={seasonListStyles.subHeader}>{this.state.Server.toUpperCase()}'s
                        Seasons:</Subheader>
                    <Divider/>
                    <div style={seasonListStyles.buttonList}>
                        {this.state.Seasons.map((season) =>
                            <FlatButton key={season.season} label={season.season} onClick={() => {
                                this.switchSeason(season.season)
                            }}/>
                        )}
                    </div>
                </Card>

                {/* Season Stats Component*/}
                {this.SeasonStatsComponent}

                {/* Recent Played With Component */}
                {this.RecentPlayedWithComponent}

                {/* Recent Games Mode (20) Component */}
                {this.RecentGamesModeComponent}
            </div>
        );
    }
}

export default ServerStats;