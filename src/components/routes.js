/**
 * Components - routes.js
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import Player from './Player'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/player/:id' component={Player}/>
            <Route path='/*' component={NotFound}/>
        </Switch>
    </main>
);

export default Routes