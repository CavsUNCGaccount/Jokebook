const Joke = require('../models/joke');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Joke.getCategories();
        console.log('Categories:', categories); // Debugging line
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.getJokesByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const limit = req.query.limit;
        const jokes = await Joke.getJokesByCategory(category, limit);
        res.json(jokes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.addJoke = async (req, res) => {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const result = await Joke.addJoke(category, setup, delivery);
        res.json({ message: "Joke added successfully", category: category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};