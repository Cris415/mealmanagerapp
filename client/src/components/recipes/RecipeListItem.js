import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addDateRecipe, removeDateRecipe } from '../../actions';

class RecipeListItem extends Component {
    state = { redirect: false };
    handleRecipeAdd = () => {
        this.props.addDateRecipe(this.props.date, this.props.recipe._id, () => {
            this.setState({ redirect: true });
        });
    };

    renderImage = () => {
        const { recipe } = this.props;
        const defaultImage = <i className="material-icons circle">image</i>;
        return recipe.image ? (
            <img src={recipe.image} alt={recipe.title} className="circle" />
        ) : (
            defaultImage
        );
    };

    renderIngredients = () => {
        // Only display the first three ingredients
        return this.props.recipe.ingredients.map((ingredient, i, arr) => {
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
        });
    };
    removeDate = () => {
        const { date, recipe } = this.props;
        this.props.removeDateRecipe(date, recipe._id);
    };

    renderRemoveDateButton = () => {
        return this.props.removeDateBtn ? (
            <div
                onClick={this.removeDate}
                className="right"
                style={{ display: 'inline-block' }}>
                <i className="material-icons">remove_cicle_outline</i>
            </div>
        ) : (
            <div />
        );
    };

    renderRecipeAddButton = () => {
        return this.props.date && this.props.addToDay ? (
            <button
                onClick={this.handleRecipeAdd}
                className="right btn"
                style={{ display: 'inline-block' }}>
                <i className="material-icons ">add</i>
            </button>
        ) : (
            <div />
        );
    };

    render() {
        const { recipe } = this.props;

        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="collection-item avatar">
                <Link to={`/recipes/${recipe._id}`}>
                    {this.renderImage()}

                    <span className="black-text title">{recipe.title}</span>
                    <br />
                    <p
                        className="grey-text"
                        style={{
                            width: '35%',
                            display: 'inline-block',
                        }}>
                        {this.renderIngredients()}
                    </p>
                </Link>
                {this.renderRecipeAddButton()}
                {this.renderRemoveDateButton()}
            </div>
        );
    }
}

export default withRouter(
    connect(
        null,
        { addDateRecipe, removeDateRecipe },
    )(RecipeListItem),
);
