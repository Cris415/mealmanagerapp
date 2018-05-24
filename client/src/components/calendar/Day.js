import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesDate } from '../../actions';
import moment from 'moment';
import RecipeListItem from '../recipes/RecipeListItem';

class Day extends Component {
    componentDidMount() {
        console.log('fetching ', this.props.day.format('MM D YYYY'));
        this.props.fetchRecipesDate(this.props.day.format('MM D YYYY'));
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.day.format() !== nextProps.day.format()) {
            console.log('fetching ', nextProps.day.format('MM D YYYY'));
            this.props.fetchRecipesDate(nextProps.day.format('MM D YYYY'));
        }
    }

    renderRecipes = recipeArr => {
        if (!recipeArr.length) {
            return;
        }
        return recipeArr.map(recipe => (
            <RecipeListItem key={recipe._id} recipe={recipe} />
            // <h5 key={recipe._id}>{recipe.title}</h5>
        ));
    };
    render() {
        const { recipes, day } = this.props;
        return (
            <div>
                <h4 style={{ marginBottom: '50px' }}>{day.format('dddd D')}</h4>
                <div className="collection">{this.renderRecipes(recipes)}</div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }, ownProps) {
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

export default connect(mapStateToProps, { fetchRecipesDate })(Day);
