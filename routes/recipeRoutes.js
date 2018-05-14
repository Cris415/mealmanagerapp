const passport = require('passport');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('recipes');

module.exports = app => {
    app.get('/api/recipe', requireLogin, async (req, res) => {
        //  Get all of a user's recipes
        const recipes = await Recipe.find({ _user: req.user.id });
        res.send(recipes);
    });

    app.get('/api/recipe/:recipeId', requireLogin, async (req, res) => {
        // Get a specific recipe
        const recipe = await Recipe.findById(req.params.recipeId);
        res.send(recipe);
    });

    app.get('/api/recipe/:date', requireLogin, async (req, res) => {
        // TODO: Get recipes for a given day
    });

    app.delete('/api/recipe/:recipeId', requireLogin, async (req, res) => {
        const deletedRecipe = await Recipe.remove({ _id: req.params.recipeId });
        res.send(deletedRecipe);
    });

    app.post('/api/recipe', requireLogin, async (req, res) => {
        const {
            title,
            ingredients,
            time,
            steps,
            image,
            source,
            dates,
        } = req.body;

        const recipe = await new Recipe({
            title,
            ingredients: ingredients.split(',').map(item => item.trim()),
            time,
            steps: steps.split('\n'),
            image,
            source,
            _user: req.user.id,
            dates,
        }).save();

        res.send(recipe);
    });
};
