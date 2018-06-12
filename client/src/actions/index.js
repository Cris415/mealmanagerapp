import axios from 'axios';
import {
    FETCH_USER,
    CREATE_RECIPE,
    FETCH_RECIPES,
    FETCH_RECIPE,
    DELETE_RECIPE,
    FETCH_DATE_RECIPE,
    ADD_DATE_RECIPE,
} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current-user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const createRecipe = (values, callback) => async dispatch => {
    const res = await axios.post('/api/recipe', values);
    callback();
    dispatch({ type: CREATE_RECIPE, payload: res.data });
};

export const fetchRecipes = () => async dispatch => {
    const res = await axios.get('/api/recipe');
    dispatch({ type: FETCH_RECIPES, payload: res.data });
};

export const fetchRecipe = id => async dispatch => {
    const res = await axios.get(`/api/recipe/${id}`);
    dispatch({ type: FETCH_RECIPE, payload: res.data });
};

export const deleteRecipe = (id, callback) => async dispatch => {
    await axios.delete(`/api/recipe/${id}`);
    callback();
    dispatch({ type: DELETE_RECIPE, payload: id });
};

export const fetchRecipesDate = date => async dispatch => {
    const res = await axios.get(`/api/recipe/date/${date}`);
    dispatch({ type: FETCH_DATE_RECIPE, payload: res.data });
};

export const addDateRecipe = (date, id, callback) => async dispatch => {
    const res = await axios.put(`/api/recipe/date/${id}/${date}`);
    callback();
    dispatch({ type: ADD_DATE_RECIPE, payload: res.data });
};
