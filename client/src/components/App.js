import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import NewRecipe from './recipes/NewRecipe';
const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/landing" component={Landing} />
                        <Route path="/recipes/new" component={NewRecipe} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
