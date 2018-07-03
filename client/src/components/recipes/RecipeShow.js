import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe, deleteRecipe } from '../../actions';
import { Redirect } from 'react-router-dom';
import BackButton from '../BackButton';
import ConfirmButton from '../parts/ConfirmButton';
import '../styles/recipe-show.css';

class Recipeshow extends Component {
    constructor(props) {
        super(props);
        this.state = { displayConfirm: false };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchRecipe(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteRecipe(id, () => {
            this.props.history.push('/dashboard');
        });
    }

    displayConfirmToggle = () => {
        if (this.state.displayConfirm) {
            this.setState({ displayConfirm: false });
        } else {
            this.setState({ displayConfirm: true });
        }
    };

    renderIngredients() {
        const { ingredients } = this.props.recipe;
        return ingredients.map(listItem => {
            return (
                <li className="collection-item" key={listItem}>
                    {listItem}
                </li>
            );
        });
    }

    renderRecipe() {
        const { steps } = this.props.recipe;
        return steps.map((item, i) => {
            return (
                <li key={i}>
                    {i + 1}. {item}
                </li>
            );
        });
    }

    renderImage() {
        const { recipe } = this.props;

        if (!recipe.image) {
            return;
        }
        return <img src={recipe.image} alt={recipe.title} />;
    }

    renderConfirmDelete() {
        if (this.state.displayConfirm) {
            return (
                <div>
                    <ConfirmButton>
                        <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-small red white-text right">
                            Delete
                        </button>
                        <button
                            onClick={this.displayConfirmToggle}
                            className="btn btn-small left">
                            Back
                        </button>
                    </ConfirmButton>
                </div>
            );
        }
        return;
    }

    render() {
        const { recipe, auth } = this.props;

        if (!auth) {
            return <Redirect to="/" />;
        }

        if (!recipe) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="container">
                <BackButton />
                <h4 style={{ paddingLeft: '120px' }}>{recipe.title}</h4>
                {this.renderImage()}
                <ul className="collection">{this.renderIngredients()}</ul>
                <p>Total Time: {recipe.time}mins</p>
                <ul>{this.renderRecipe()}</ul>
                <p>Source: {recipe.source ? recipe.source : 'N/A'}</p>
                {this.renderConfirmDelete()}
                <button
                    className="btn btn-small red white-text right"
                    onClick={this.displayConfirmToggle}>
                    Delete Recipe
                </button>
            </div>
        );
    }
}

function mapStateToProps({ recipes, auth }, ownProps) {
    return {
        recipe: recipes.filter(
            recipe => recipe._id === ownProps.match.params.id
        )[0],
        auth
    };
}

export default connect(
    mapStateToProps,
    { fetchRecipe, deleteRecipe }
)(Recipeshow);
