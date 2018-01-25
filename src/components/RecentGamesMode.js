/**
 * Components - RecentGamesMode.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import GamesSummaryList from './GamesSummaryList';

// Material UI dependencies - RecentGamesMode
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

// SampleCard Styles
const sampleCardStyles = {
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
                               titleStyle={sampleCardStyles.title}
                               subtitleStyle={sampleCardStyles.subtitle}/>
                    <CardText style={sampleCardStyles.stats}>
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

export default RecentGamesMode;