/**
 * Components - PlayedWith.js
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

// Material UI dependencies - Player profile (Card)
import FlatButton from 'material-ui/FlatButton';


import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {red500, green500, lightBlue500, blue500, purple500} from "material-ui/styles/colors";

// PlayedWith - display player's recent played with friends list


class PlayedWith extends Component {
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
        // await this.getRecentPlayedWithList(this.state.ID ,server.server, season.season);
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Played With List*/}
                <Card>
                    <Subheader>Recently Played With</Subheader>
                    <Divider/>
                    <Table>
                        <TableHeader adjustForCheckbox={false}
                                     displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Username</TableHeaderColumn>
                                <TableHeaderColumn>Games</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.List.map((friend) =>
                                <TableRow key={friend.user.nickname}>
                                    <TableRowColumn>{friend.user.nickname}</TableRowColumn>
                                    <TableRowColumn>{friend.stats.matches_count}</TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        );
    }
}

export default PlayedWith;