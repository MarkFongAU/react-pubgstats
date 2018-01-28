// Player profile page Style
// const pageStyles = {
//     backgroundImage: 'url(' + wallpaper + ')',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '100%',
//     width: '100%',
// };

// Async Get Player Stats
// async getPlayerStats(playerID) {
//     await fetch(`/player/${playerID}`)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             // Server returns empty object due to invalid player ID
//             if (data.player === null) {
//                 console.log('Invalid Player ID');
//                 this.props.history.push('/*');
//             } else {
//                 this.setStateAsync({Player: data.player});
//             }
//         })
//         .catch(error => {
//             // Potentially some code for generating an error specific message here
//             // next(error);
//             console.log('React backend is not available.');
//             this.props.history.push('/*');
//         });

    // Pure Async Await
    // const res = await fetch(`/api/users/${playerID}`);
    // const data = await res.json();
    // await this.setStateAsync({Player: data.player});
// };


// // Invoked immediately after a component is mounted
// async componentDidMount() {
//     await this.setState({ID: this.props.match.params.id});
//     console.log(this.state.ID);
//     await this.getPlayerStats(this.state.ID);
//     console.log(this.state.Player);
//
//     // Allow the page to render after the player stats has been loaded
//     await this.setStateAsync({ComponentLoaded: true});
//
//     // if (!this.state.Player.profile) {
//     //     // return;
//     // } else {
//     //     await Promise.all(this.state.Player.profile.servers.map(async (server) => {
//     //         console.log(server);
//     //         await Promise.all(this.state.Player.profile.seasons.map(async (season) => {
//     //             console.log(season);
//     //             await this.getServerSeasonStats(server.server, season.season);
//     //         }));
//     //     }));
//     // }
//     // //
//     // console.log(this.state.Servers);
// }

// // Async Get Stats of the Selected Season
// async getSeasonStats(playerID, server, season) {
//     await fetch(`/seasonstats/${playerID}/ranked-stats?server=${server}&season=${season}`)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             this.setStateAsync({
//                 Stats: data.serverSeasonStats,
//             });
//
//             // this.setState({
//             //     Servers: {
//             //         ...this.state.Servers,
//             //         [server]: {
//             //             ...this.state.Servers[server],
//             //             [season]: data.serverSeasonStats,
//             //         }
//             //     },
//             // });
//             // console.log(this.state.Servers);
//         })
//         .catch(error => {
//             // Potentially some code for generating an error specific message here
//             console.log('React backend is not available.');
//         });
//
//     // Pure Async Await
//     // const res = await fetch(`/api/users/${playerID}/ranked-stats?server=${server}&season=${season}`);
//     // const data = await res.json();
//     // await this.setStateAsync({
//     //     Servers: {
//     //         ...this.state.Servers,
//     //         [server]: {
//     //             ...this.state.Servers[server],
//     //             [season]: data.serverSeasonStats,
//     //         }
//     //     },
//     // });
// };



// // Add the server and season stats object into the player object
// player.server_stats = {
//     ...player.server_stats,
//     [server]: {
//         ...player.server_stats[server],
//         [season]: serverSeasonStats,
//     }
// };