const passport = require('passport');
const mongoose = require('mongoose');

const Recipe = mongoose.model('recipes');

module.exports = app => {
    app.post('/api/recipe', async (req, res) => {
        const {
            title,
            ingredients,
            time,
            steps,
            image,
            source,
            dates,
        } = req.body;

        // TODO: Break ingredients into array

        // TODO: Break steps into array by \n steps.split('\n')

        const recipe = await new Recipe({
            title,
            ingredients: recipients.split(','),
            time,
            steps,
            image,
            source,
            _user: req.user.id,
            dates,
        }).save();
        console.log(recipe);
        res.send(recipe);
    });
};
