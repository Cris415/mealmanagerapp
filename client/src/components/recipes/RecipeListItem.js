import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { addDateRecipe } from '../../actions';
import { connect } from 'react-redux';

class RecipeListItem extends Component {
    state = { redirect: false };
    handleRecipeAdd = () => {
        this.props.addDateRecipe(this.props.date, this.props.recipe._id, () => {
            this.props.history.push('/dashboard');
        });
    };
    render() {
        const { recipe, date } = this.props;
        const defaultImage = <i className="material-icons circle">image</i>;
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="collection-item avatar">
                <Link to={`/recipes/${recipe._id}`}>
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
                    <br />
                    <p
                        className="grey-text"
                        style={{
                            width: '35%',
                            display: 'inline-block',
                            // textOverflow: 'ellipsis',
                            // overflow: 'hidden',
                            // whiteSpace: 'nowrap',
                        }}
                    >
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
                {date ? (
                    <button
                        onClick={this.handleRecipeAdd}
                        className="right btn "
                        style={{ display: 'inline-block' }}
                    >
                        <i className="material-icons ">add</i>
                    </button>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default withRouter(connect(null, { addDateRecipe })(RecipeListItem));
