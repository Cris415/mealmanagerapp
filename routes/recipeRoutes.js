const passport = require('passport');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('recipes');

module.exports = app => {
  app.get('/api/recipe', requireLogin, async (req, res) => {
    const recipes = await Recipe.find({ _user: req.user.id });
    res.send(recipes);
  });

  app.get('/api/recipe/:recipeId', requireLogin, async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.send(recipe);
  });

  app.delete('/api/recipe/:recipeId', requireLogin, async (req, res) => {
    const deletedRecipe = await Recipe.remove({ _id: req.params.recipeId });
    res.send(deletedRecipe);
  });

  app.post('/api/recipe', requireLogin, async (req, res) => {
    const { title, ingredients, time, steps, image, source, dates } = req.body;

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
  app.put('/api/recipe/date/:recipeId/:date', async (req, res) => {
    // Add a date to a recipe
    let query = { _user: req.user.id, _id: req.params.recipeId };
    let date = new Date(req.params.date);
    const updatedRecipe = await Recipe.findOneAndUpdate(
      query,
      {
        $push: { dates: date },
      },
      { new: true },
    );
    res.send(updatedRecipe);
  });

  app.get('/api/recipe/date/:date', async (req, res) => {
    let date = new Date(req.params.date);
    const recipes = await Recipe.find({ dates: date, _user: req.user.id });
    res.send(recipes);
  });

  app.delete('/api/recipe/date/:recipeId/:date', async (req, res) => {
    //Find the recipe that belongs to the date
    let query = { _user: req.user.id, _id: req.params.recipeId };
    let date = new Date(req.params.date);
    //Find the date on the array
    //Inside pullAll is where deleting stuff goes
    // const updatedRecipe = await Recipe.update(query, { $pullAll: {dates: [date]} })
    const updatedRecipe = await Recipe.findOneAndUpdate(
      query,
      { $pullAll: { dates: [date] } },
      { new: true },
    );

    res.send(updatedRecipe);
  });
};
