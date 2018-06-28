import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import NewRecipe from './recipes/NewRecipe';
import RecipeList from './recipes/RecipeList';
import Dashboard from './Dashboard';
import RecipeShow from './recipes/RecipeShow';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route
                            exact
                            path="/create/recipe"
                            component={NewRecipe}
                        />
                        <Route exact path="/recipes" component={RecipeList} />
                        <Route
                            exact
                            path="/date/recipe/:date"
                            component={RecipeList}
                        />
                        <Route path="/recipes/:id" component={RecipeShow} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route path="/dashboard/:date" component={Dashboard} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(
    mapStateToProps,
    actions
)(App);
