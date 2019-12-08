import React from 'react'
import App from './App'
import { HashRouter, Route, Switch } from 'react-router-dom'

export default class Router extends React.Component {
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                </Switch>
            </HashRouter>
        )
    }
}