Pubgstats is a website that displays player's stats from Player's Unknown Battleground. The project is build with ReactJS and the API originates from [PUBG op.gg](https://pubg.op.gg/).

To run the application, open 2 terminals, the first one run `npm install` and `node server` to start the NodeJS server.
 
On the second terminals, run `npm start` to start the react app.

Access the web application at `http://localhost:3000`.

Note: 

1. The Express Node server has been integrated successfully with the React front-end created with [Create React App](https://github.com/facebookincubator/create-react-app). More features will be added soon.

2. Currently there are only a few endpoints to retrieve data from [PUBG op.gg API](https://pubg.op.gg/api):

```
Returns player profile details 
- /users/<PUBG op.gg's data user ID>/       
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/ 

Returns player's stats for the particular server, season, mode, queue size
- /users/<PUBG op.gg's data user ID>/ranked-stats?server=<server name>&season=<season>&mode=<game mode>&queue_size=<queue size>       
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/ranked-stats?server=as&season=2018-01&mode=tpp&queue_size=4

Returns player's recent played friendlist
- /users/<PUBG op.gg's data user ID>/matches/summary-played-with?server=<server name>&season=<season> 
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/summary-played-with?server=as&season=2018-01
     
Returns player's recent games (20)
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name> 
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&after=<offset of games>  
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&mode=<game mode>&queue_size=<queue size>  
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&mode=<game mode>&queue_size=<queue size>&after=<offset of games>
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&after=19
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&mode=tpp&queue_size=4
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&mode=tpp&queue_size=4&after=19

Returns match details 
- /users/<PUBG op.gg's data user ID>/       
- Example: https://pubg.op.gg/api/matches/2U4GBNA0Yml_fdeqrDDqxho56ZwCV4jz6tX-0lvOAlhz7qIPN280fRMwcwmCQ3F1
```


