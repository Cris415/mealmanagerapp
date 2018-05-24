import React from 'react';
import { Link } from 'react-router-dom';
const RecipeListItem = props => {
    const { recipe } = props;
    const defaultImage = <i className="material-icons circle">image</i>;
    return (
        <Link className="collection-item avatar" to={`/recipes/${recipe._id}`}>
            {/* Display image or default */}
            {recipe.image ? (
                <img src={recipe.image} alt={recipe.title} className="circle" />
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
};

export default RecipeListItem;
