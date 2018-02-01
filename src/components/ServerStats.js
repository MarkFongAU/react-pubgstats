/**
 * Components - ServerStats.js
 */
import React, {Component} from 'react'
import SeasonStats from './SeasonStats';
import RecentPlayedWith from './RecentPlayedWith';
import RecentGamesMode from './RecentGamesMode';

// Material UI dependencies - ServerStats
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card} from 'material-ui/Card';

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
            SelectedSeason: '',
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
            SelectedSeason: this.props.preSelectedSeason,
        });
        console.log('PlayerID: ' + this.state.ID + ' Server:' + this.state.Server + ' Seasons:' + this.state.Seasons);

        // Allow the page to render after the parameters has been loaded
        await this.setState({ComponentLoaded: true});
    }

    // Select season
    switchSeason(season) {
        this.setState({SelectedSeason: season});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        /* Render SeasonStats */
        if (this.state.SelectedSeason) {
            this.SeasonStatsComponent =
                <SeasonStats key={'SeasonStats' + '-' + this.state.SelectedSeason} playerID={this.state.ID}
                             server={this.state.Server}
                             season={this.state.SelectedSeason}/>;

            this.RecentPlayedWithComponent =
                <RecentPlayedWith key={'RecentPlayedWith' + '-' + this.state.SelectedSeason} playerID={this.state.ID}
                                  server={this.state.Server}
                                  season={this.state.SelectedSeason}/>;

            this.RecentGamesModeComponent =
                <RecentGamesMode key={'RecentGamesMode' + '-' + this.state.SelectedSeason} playerID={this.state.ID}
                                 server={this.state.Server}
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

                <Card>
                    <GridList
                        cols={3}
                        cellHeight="auto"
                        padding={5}
                    >
                        <GridTile cols={1}>
                            {/* Recent Played With Component */}
                            {this.RecentPlayedWithComponent}
                        </GridTile>
                        <GridTile cols={2}>
                            {/* Recent Games Mode (20) Component */}
                            {this.RecentGamesModeComponent}
                        </GridTile>
                    </GridList>
                </Card>
            </div>
        );
    }
}

export default ServerStats;