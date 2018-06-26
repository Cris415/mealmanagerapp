import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchRecipesDate } from '../../actions';
import RecipeListItem from '../recipes/RecipeListItem';

class Day extends Component {
    componentDidMount() {
        this.props.fetchRecipesDate(this.props.day.format('MM D YYYY'));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.day.format() !== nextProps.day.format()) {
            this.props.fetchRecipesDate(nextProps.day.format('MM D YYYY'));
        }
    }

    renderRecipes = () => {
        const { recipes } = this.props;

        if (!recipes.length) {
            return;
        }
        return recipes.map(recipe => (
            <RecipeListItem
                key={recipe._id.toString() + this.props.day.format()}
                recipe={recipe}
                date={this.props.day.format('MM-D-YYYY')}
                removeDateBtn
            />
        ));
    };

    render() {
        const { day } = this.props;
        // Debugging heroku.. Does day.js recieve the recipes?
        if (this.props.recipes) {
            console.log(
                'Recipes in day.js day: ',
                this.props.day.format(),
                this.props.recipes,
            );
        }

        return (
            <div>
                <Link
                    className="right"
                    to={`/date/recipe/${day.format('MM-D-YYYY')}`}
                    style={{ display: 'inline-block' }}>
                    <i
                        className="material-icons medium "
                        style={{ color: 'grey' }}>
                        add_circle
                    </i>
                </Link>

                <h4 style={{ marginBottom: '20px' }}>{day.format('dddd D')}</h4>

                <div className="collection">{this.renderRecipes()}</div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }, ownProps) {
    // Finds recipes in state pertaining to the date

    // Debugging heroku
    console.log('mapStateToProps, before filtering for the day', recipes);
    if (ownProps.day) {
        console.log(
            'date we are matching',
            ownProps.day
                .set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                })
                .utc()
                .format(),
        );
    }
    if (recipes[0]) {
        console.log('date on recipe', moment(recipes[0].dates[0]).format());
        console.log('recipe date before formatting', recipes[0].dates[0]);
        console.log(
            'are two dates equal? ',
            moment(recipes[0].dates[0])
                .utc()
                .format() ===
                ownProps.day
                    .set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0,
                    })
                    .utc()
                    .format(),
        );
        // console.log('date on recipe', recipes[0].dates[0]);
    }

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
                            .format(),
                ).length,
        ),
    };
}

export default connect(
    mapStateToProps,
    { fetchRecipesDate },
)(Day);
