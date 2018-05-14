import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';
import { Link, Redirect } from 'react-router-dom';

class RecipeList extends Component {
    componentDidMount() {
        this.props.fetchRecipes();
    }

    renderRecipes() {
        let defaultImage = <i className="material-icons circle">image</i>;

        return this.props.recipes.map(recipe => {
            return (
                <Link
                    className="collection-item avatar"
                    key={recipe._id}
                    to={`/recipes/${recipe._id}`}
                >
                    {/* Display image or default */}
                    {recipe.image ? (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="circle"
                        />
                    ) : (
                        defaultImage
                    )}
                    <span className="black-text title">{recipe.title}</span>
                    <p className="grey-text">
                        {recipe.ingredients.map((ingredient, i, arr) => {
                            if (arr.length === i + 1 && arr.length < 4) {
                                return ingredient;
                            }
                            if (i + 1 > 2 && i < 3) {
                                return ingredient + '...';
                            }
                            if (i < 3) {
                                return ingredient + ', ';
                            }

                            return '';
                        })}
                    </p>
                </Link>
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
                        paddingTop: '10px',
                    }}
                >
                    <Link className="btn left" to="/dashboard">
                        Back
                    </Link>
                    <h4
                        style={{
                            paddingLeft: '20px',
                            display: 'inline-block',
                            margin: '0',
                        }}
                    >
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

export default connect(mapStateToProps, { fetchRecipes })(RecipeList);
