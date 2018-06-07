import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesDate } from '../../actions';
import moment from 'moment';
import RecipeListItem from '../recipes/RecipeListItem';
import { Link } from 'react-router-dom';

class Day extends Component {
    componentDidMount() {
        this.props.fetchRecipesDate(this.props.day.format('MM D YYYY'));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.day.format() !== nextProps.day.format()) {
            this.props.fetchRecipesDate(nextProps.day.format('MM D YYYY'));
        }
    }

    renderRecipes = recipeArr => {
        if (!recipeArr.length) {
            return;
        }
        return recipeArr.map(recipe => (
            <RecipeListItem key={recipe._id} recipe={recipe} />
        ));
    };

    render() {
        const { recipes, day } = this.props;

        return (
            <div>
                <Link
                    className="right "
                    to={`/date/recipe/${day.format('MM-D-YYYY')}`}
                    style={{ display: 'inline-block' }}
                >
                    <i
                        className="material-icons medium "
                        style={{ color: 'grey' }}
                    >
                        add_circle
                    </i>
                </Link>
                <h4 style={{ marginBottom: '20px' }}>{day.format('dddd D')}</h4>

                <div className="collection">{this.renderRecipes(recipes)}</div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }, ownProps) {
    // Finds recipes in state pertaining to the date
    return {
        recipes: recipes.filter(
            recipe =>
                recipe.dates.filter(
                    date =>
                        moment(date).format() ===
                        ownProps.day
                            .set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                                millisecond: 0,
                            })
                            .format()
                ).length
        ),
    };
}

export default connect(
    mapStateToProps,
    { fetchRecipesDate }
)(Day);
