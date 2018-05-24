import {
    FETCH_RECIPES,
    FETCH_RECIPE,
    DELETE_RECIPE,
    FETCH_DATE_RECIPE,
} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_RECIPE:
            // Only add recipe if not there
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

        case FETCH_DATE_RECIPE:
            // Combine all fetched recipes and then remove the duplicates
            let newState = [...state, ...action.payload];

            return newState.filter(
                (item, index, self) =>
                    self.findIndex(t => t._id === item._id) === index
            );

        default:
            return state;
    }
}
