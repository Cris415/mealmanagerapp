import { FETCH_USER } from '../actions/types';

// null: we don't know if user is logged in
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // user model .. or false
        default:
            return state;
    }
}
