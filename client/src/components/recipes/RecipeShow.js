import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe, deleteRecipe } from '../../actions';
import { Link, Redirect } from 'react-router-dom';

class Recipeshow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchRecipe(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteRecipe(id, () => {
            this.props.history.push('/recipes');
        });
    }

    renderIngredients(list) {
        return list.map(listItem => {
            return (
                <li className="collection-item" key={listItem}>
                    {listItem}
                </li>
            );
        });
    }

    renderRecipe(list) {
        return list.map((item, i) => {
            return (
                <li key={i}>
                    {i + 1}. {item}
                </li>
            );
        });
    }

    render() {
        const { recipe } = this.props;

        if (!this.props.auth) {
            return <Redirect to="/" />;
        }

        if (!recipe) {
            return <div>Loading ..</div>;
        }

        return (
            <div className="container">
                <Link className="white-text" to="/recipes">
                    <button className="btn left">Back</button>
                </Link>
                <h4 style={{ paddingLeft: '120px' }}>{recipe.title}</h4>
                <ul className="collection">
                    {this.renderIngredients(recipe.ingredients)}
                </ul>
                <p>Time: {recipe.time}mins</p>
                <ul>{this.renderRecipe(recipe.steps)}</ul>

                <Link className="white-text" to={`/api/recipe/${recipe._id}`}>
                    <button
                        className="btn btn-small red white-text right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete Recipe
                    </button>
                </Link>
            </div>
        );
    }
}

function mapStateToProps({ recipes, auth }, ownProps) {
    return {
        recipe: recipes.filter(
            recipe => recipe._id === ownProps.match.params.id
        )[0],
        auth,
    };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(
    Recipeshow
);