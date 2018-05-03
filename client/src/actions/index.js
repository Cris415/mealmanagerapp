import axios from 'axios';
import { FETCH_USER, CREATE_RECIPE } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current-user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const createRecipe = (values, callback) => async dispatch => {
    const res = await axios.post(`/api/recipe`, values);
    console.log(res);
    callback();
    dispatch({ type: CREATE_RECIPE, payload: res });
};
