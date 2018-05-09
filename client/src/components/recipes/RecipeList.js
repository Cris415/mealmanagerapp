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
                    {/* Display regular image default */}
                    {recipe.image ? (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="circle"
                        />
                    ) : (
                        defaultImage
                    )}
                    <h5 className="title">{recipe.title}</h5>
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
                <Link className="btn left" to="/dashboard">
                    Back
                </Link>

                <h4 style={{ paddingLeft: '120px' }}>My Recipes</h4>

                <div className="collection">{this.renderRecipes()}</div>

                <Link className="white-text" to="/create/recipe">
                    <button className="btn right">Create Recipe</button>
                </Link>
            </div>
        );
    }
}
function mapStateToProps({ recipes, auth }) {
    return { recipes, auth };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipeList);
