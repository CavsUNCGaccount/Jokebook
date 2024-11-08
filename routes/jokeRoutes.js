const express = require('express');
const jokeController = require('../controllers/jokeController');
const Joke = require('../models/joke');

const router = express.Router();

// GET endpoint for a random joke
router.get('/joke/random', async (_, res) => {
    try {
        const randomJoke = await Joke.getRandomJoke();
        res.json(randomJoke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint for categories
// http://localhost:3000/jokebook/categories
router.get('/categories', jokeController.getCategories);

// GET endpoint for jokes in a category
// http://localhost:3000/jokebook/joke/funnyJoke
// http://localhost:3000/jokebook/joke/lameJoke
router.get('/joke/:category', jokeController.getJokesByCategory);

// Endpoints for joke limit (change number to change the limit)
// http://localhost:3000/jokebook/joke/funnyJoke?limit=2
// http://localhost:3000/jokebook/joke/lameJoke?limit=2

// POST endpoint for adding a new joke
// http://localhost:3000/jokebook/joke/new
router.post('/joke/new', jokeController.addJoke);

module.exports = router;
