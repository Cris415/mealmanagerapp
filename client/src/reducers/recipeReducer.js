import {
    FETCH_RECIPES,
    FETCH_RECIPE,
    DELETE_RECIPE,
    FETCH_DATE_RECIPE,
    ADD_DATE_RECIPE,
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
            // action.payload is place on front,  duplicates found in state will be removed
            return [...action.payload, ...state].filter(
                (item, index, self) =>
                    self.findIndex(t => t._id === item._id) === index
            );
        case ADD_DATE_RECIPE:
            // Add the recipe with new date.
            // If state contains the recipe in the payload
            if (state.filter(recipe => recipe._id === action.payload._id)[0]) {
                // return state minus the recipe equivalent to the one found in the payload, and include the payload recipe
                return [
                    ...state.filter(recipe => recipe._id !== action.payload.id),
                    action.payload,
                ];
            } else {
                return [...state, action.payload];
            }

        default:
            return state;
    }
}
