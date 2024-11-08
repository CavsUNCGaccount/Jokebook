const db = require('../db'); // Assume there's a db module for SQLite connection

class Joke {
    static async getCategories() { 
        const query = 'SELECT * FROM categories';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getJokesByCategory(category, limit) {
        // Wrap the category lookup and jokes query in promises
        return new Promise(async (resolve, reject) => {
            try {
                // Get the category ID
                const categoryQuery = 'SELECT id FROM categories WHERE name = ?';
                db.get(categoryQuery, [category], (err, categoryResult) => {
                    if (err) {
                        return reject(new Error('Error finding category: ' + err.message));
                    }
                    if (!categoryResult) {
                        return reject(new Error('Category not found'));
                    }
    
                    // If category found, get jokes for that category
                    const jokesQuery = 'SELECT * FROM jokes WHERE category_id = ? LIMIT ?';
                    db.all(jokesQuery, [categoryResult.id, limit || -1], (err, rows) => {
                        if (err) {
                            return reject(new Error('Error fetching jokes: ' + err.message));
                        }
                        resolve(rows);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }    

    static async addJoke(category, setup, delivery) {
        return new Promise((resolve, reject) => {
            // First, get the category ID based on the provided category name
            const categoryQuery = 'SELECT id FROM categories WHERE name = ?';
            db.get(categoryQuery, [category], (err, categoryResult) => {
                if (err) {
                    return reject(new Error('Error finding category: ' + err.message));
                }
                if (!categoryResult) {
                    return reject(new Error('Category not found'));
                }
    
                // Insert the joke into the jokes table
                const insertQuery = 'INSERT INTO jokes (setup, delivery, category_id) VALUES (?, ?, ?)';
                db.run(insertQuery, [setup, delivery, categoryResult.id], function(err) {
                    if (err) {
                        return reject(new Error('Error adding joke: ' + err.message));
                    }
                    resolve({ id: this.lastID, setup, delivery, category_id: categoryResult.id });
                });
            });
        });
    }

    static async getRandomJoke() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1';
            db.get(query, (err, row) => {
                if (err) {
                    return reject(new Error('Error fetching random joke: ' + err.message));
                }
                resolve(row);
            });
        });
    }    
}

module.exports = Joke;

