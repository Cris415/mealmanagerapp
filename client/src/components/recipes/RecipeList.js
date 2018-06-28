import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';
import { Link, Redirect } from 'react-router-dom';
import RecipeListItem from './RecipeListItem';
import BackButton from '../BackButton';

class RecipeList extends Component {
    componentDidMount() {
        this.props.fetchRecipes();
    }

    renderRecipes() {
        return this.props.recipes.map(recipe => {
            return (
                <RecipeListItem
                    recipe={recipe}
                    date={this.props.match.params.date}
                    addToDay
                    key={recipe._id}
                />
            );
        });
    }
    render() {
        if (!this.props.auth) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <div
                    style={{
                        paddingTop: '10px'
                    }}>
                    <BackButton />
                    <h4
                        style={{
                            paddingLeft: '20px',
                            display: 'inline-block',
                            margin: '0'
                        }}>
                        My Recipes
                    </h4>

                    <Link className="white-text btn right" to="/create/recipe">
                        Create Recipe
                    </Link>
                </div>

                <div className="collection">{this.renderRecipes()}</div>
            </div>
        );
    }
}

function mapStateToProps({ recipes, auth }) {
    return { recipes, auth };
}

export default connect(
    mapStateToProps,
    { fetchRecipes }
)(RecipeList);
