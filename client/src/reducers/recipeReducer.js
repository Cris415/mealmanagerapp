import {
    FETCH_RECIPES,
    FETCH_RECIPE,
    DELETE_RECIPE,
    FETCH_DATE_RECIPE,
    UPDATE_RECIPE,
} from '../actions/types';

export default function(state = [], action) {
    console.log('logging action and state', action, state);
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
        return state.filter(recipe => recipe._id !== action.payload);

    case FETCH_DATE_RECIPE:
        // Combine all fetched recipes and then remove the duplicates
        // action.payload is place on front,  duplicates found in state will be removed

        // Debuggin heroku
        console.log(
            'state in reducer once fetched',
            [...action.payload, ...state].filter(
                (item, index, self) =>
                    self.findIndex(t => t._id === item._id) === index,
            ),
        );

        return [...action.payload, ...state].filter(
            (item, index, self) =>
                self.findIndex(t => t._id === item._id) === index,
        );
    case UPDATE_RECIPE:
        // Add updated recipe, if recipe already in state, replace

        // Debuggin heroku, need to know the state
        console.log('state in reducer', [
            ...state.filter(recipe => recipe._id !== action.payload._id),
            action.payload,
        ]);

        if (state.filter(recipe => recipe._id === action.payload._id)[0]) {
            return [
                ...state.filter(
                    recipe => recipe._id !== action.payload._id,
                ),
                action.payload,
            ];
        } else {
            return [...state, action.payload];
        }

    default:
        return state;
    }
}
