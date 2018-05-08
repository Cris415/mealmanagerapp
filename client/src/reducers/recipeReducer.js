import { FETCH_RECIPES, FETCH_RECIPE, DELETE_RECIPE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_RECIPE:
            // only add recipe if not there
            if (!state.filter(recipe => recipe._id === action.payload._id)[0]) {
                return [...state, action.payload];
            } else {
                return state;
            }
        case FETCH_RECIPES:
            return action.payload;
        case DELETE_RECIPE:
            // Find item to delete action.payload.data.id
            return state.filter(recipe => recipe._id !== action.payload.id);
        default:
            return state;
    }
}
