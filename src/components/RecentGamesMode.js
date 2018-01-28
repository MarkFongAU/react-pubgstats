/**
 * Components - RecentGamesMode.js
 */
import React, {Component} from 'react'
import GamesSummaryList from './GamesSummaryList';

// Material UI dependencies - RecentGamesMode
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card} from 'material-ui/Card';

// Recent Games Mode Styles
const recentGamesModeStyles = {
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

// RecentGamesMode - display player's recent games (20) by mode
class RecentGamesMode extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Season: '',
            SelectedMode: 'total',
            SelectedQueueSize: '',
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

        this.GamesSummaryListComponent = null;
    }

    // Invoked immediately after a component is mounted
    async componentDidMount() {
        await this.setState({
            ID: this.props.playerID,
            Server: this.props.server,
            Season: this.props.season
        });

        console.log('Recent Game Mode: ' + 'PlayerID: ' + this.state.ID + ' Server:' + this.state.Server + ' Seasons:' + this.state.Seasons);

        // Allow the page to render after the parameters has been loaded
        await this.setState({ComponentLoaded: true});
    }

    // Select game mode
    switchModes(mode, queue_size) {
        this.setState({SelectedMode: mode, SelectedQueueSize: queue_size});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        {/* Render Recent Games */}
        if (this.state.SelectedMode) {
            if (this.state.SelectedMode === 'total') {
                this.GamesSummaryListComponent =
                    <GamesSummaryList key={this.state.SelectedMode} playerID={this.state.ID}
                                      server={this.state.Server} seasons={this.state.Season} mode={''}
                                      queue_size={''}/>;
            } else {
                this.GamesSummaryListComponent =
                    <GamesSummaryList key={this.state.SelectedMode + this.state.SelectedQueueSize}
                                      playerID={this.state.ID}
                                      server={this.state.Server} seasons={this.state.Season}
                                      mode={this.state.SelectedMode} queue_size={this.state.SelectedQueueSize}/>;
            }
        }

        return (
            <div>
                {/* Game Modes */}
                <Card>
                    <Subheader style={recentGamesModeStyles.subHeader}>Modes :</Subheader>
                    <Divider/>
                    <div style={recentGamesModeStyles.buttonList}>
                        {/* Total */}
                        <FlatButton key={'total'} label={'total'} onClick={() => {
                            this.switchModes('total', '')
                        }}/>

                        {/* TPP */}
                        {this.state.GameMode.tpp.map((mode) =>
                            <FlatButton key={mode.key} label={mode.label} onClick={() => {
                                this.switchModes(mode.mode, mode.queue_size)
                            }}/>
                        )}

                        {/* FPP */}
                        {this.state.GameMode.fpp.map((mode) =>
                            <FlatButton key={mode.key} label={mode.label} onClick={() => {
                                this.switchModes(mode.mode, mode.queue_size)
                            }}/>
                        )}
                    </div>
                </Card>
                <Divider/>

                {/* GamesSummaryList Component */}
                {this.GamesSummaryListComponent}
            </div>
        );
    }
}

export default RecentGamesMode;