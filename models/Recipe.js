const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    title: String,
    ingredients: [String],
    time: Number,
    steps: [String],
    image: String,
    source: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dates: [Date],
});

mongoose.model('recipes', recipeSchema);
