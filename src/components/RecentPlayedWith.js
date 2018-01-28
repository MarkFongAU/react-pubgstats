/**
 * Components - RecentPlayedWith.js
 */
import React, {Component} from 'react'

// Material UI dependencies - RecentPlayedWith Friend List
import Subheader from 'material-ui/Subheader';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Card} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

// RecentPlayedWith - display player's recent played with friends list
class RecentPlayedWith extends Component {
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

    // Async Get Recently Played List
    async getRecentPlayedWithList(playerID, server, season) {
        await fetch(`/recentplayedwith/${playerID}/matches/summary-played-with?server=${server}&season=${season}`)
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
                }
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
        await this.getRecentPlayedWithList(this.state.ID, this.state.Server, this.state.Season);
        console.log(this.state.List);

        // Allow the component to render after the friend list has been loaded
        await this.setStateAsync({ComponentLoaded: true});
    }

    render() {
        if (this.state.ComponentLoaded === false)
            return null;

        return (
            <div>
                {/* Recent Played With List */}
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

export default RecentPlayedWith;