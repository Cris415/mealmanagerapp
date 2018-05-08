import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';
import { Link } from 'react-router-dom';

class RecipeList extends Component {
    componentDidMount() {
        this.props.fetchRecipes();
    }

    renderRecipes() {
        return this.props.recipes.map(recipe => {
            return (
                <li key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <h4>{recipe.title}</h4>
                    </Link>
                </li>
            );
        });
    }
    render() {
        return (
            <div className="container">
                <Link className="btn left" to="/dashboard">
                    Back
                </Link>
                <h4>My Recipes</h4>
                <ul>{this.renderRecipes()}</ul>
            </div>
        );
    }
}
function mapStateToProps({ recipes }) {
    return { recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipeList);
