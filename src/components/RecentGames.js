/**
 * Components - RecentGames.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

// Material UI dependencies - RecentGames
import FlatButton from 'material-ui/FlatButton';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";

const mediaStyles = {
    // width: '100%',
    height: '150px',
    // backgroundImage: 'url(' + wallpaper + ')',
    // opacity: 0.5,
    // backgroundSize: 'cover',
    // overflow: 'hidden',
    backgroundColor: 'transparent',
};

const recentMatchesStyles = {
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
    }
};


// RecentGames - display player's recent games (20)
class RecentGames extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            Server: '',
            Season: '',
            List: [],
            ComponentLoaded: false,
        };
    }

    // Async setState
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getRecentPlayedWithList(playerID, server, season) {
        await fetch(`/api/users/${playerID}/matches/summary-played-with?server=${server}&season=${season}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // Server returns empty object due to invalid player ID
                if (data.friendList === 'Invalid playerID') {
                    console.log('Invalid Player ID');
                } else if (data.friendList === 'Invalid server/season') {
                    console.log('Invalid server/season');
                } else {
                    this.setStateAsync({List: data.friendList});

                    // Allow the component to render after the friend list has been loaded
                    this.setStateAsync({ComponentLoaded: true});
                }
            })
            .catch(error => {
                // Potentially some code for generating an error specific message here
                console.log('React backend is not available.');
            });
    };

    async componentDidMount() {
        await this.setState({
            ID: this.props.playerID,
            Server: this.props.server,
            Season: this.props.season
        });
        await this.getRecentPlayedWithList(this.state.ID, this.state.Server, this.state.Season);
        console.log(this.state.List);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Games */}
                <Card>
                    <CardTitle title='Servers'
                               titleStyle={recentMatchesStyles.title} subtitleStyle={recentMatchesStyles.subtitle}/>
                    <CardText style={recentMatchesStyles.stats}>
                        Add 20 match summary

                        Include - Rating change, Pie chart of Queue Size, Avg. Rank, K/D, Damage, Survived time

                    </CardText>
                </Card>

                {/* CONTINUE HERE */}



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
                               titleStyle={recentMatchesStyles.title} subtitleStyle={recentMatchesStyles.subtitle}/>
                    <CardText style={recentMatchesStyles.stats}>
                        Add 20 match summary

                        Include - Rating change, Pie chart of Queue Size, Avg. Rank, K/D, Damage, Survived time

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

export default RecentGames;