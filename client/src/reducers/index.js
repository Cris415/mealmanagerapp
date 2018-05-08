import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import recipeReducer from './recipeReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    recipes: recipeReducer,
});
