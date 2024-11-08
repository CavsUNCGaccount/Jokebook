document.addEventListener("DOMContentLoaded", () => {
    
    const randomJokeDiv = document.getElementById("random-joke");

    const loadCategoriesButton = document.getElementById("load-categories");
    const categoryListDiv = document.getElementById("category-list");

    const searchCategoryButton = document.getElementById("search-category");
    const categorySearchInput = document.getElementById("category-search");
    const searchResultsDiv = document.getElementById("search-results");

    const addJokeForm = document.getElementById("add-joke-form");
    const addJokeResultDiv = document.getElementById("add-joke-result");

    searchCategoryButton.addEventListener("click", searchJokesByCategory);
    
    loadRandomJoke();
    loadCategoriesButton.addEventListener("click", loadCategories);
    
    addJokeForm.addEventListener("submit", addNewJoke);

    function displayJokes(jokes) {
        categoryListDiv.innerHTML = "";
    
        jokes.forEach(joke => {
            const jokeElement = document.createElement("div");
            jokeElement.classList.add("joke");
            jokeElement.innerHTML = `
                <p><strong>Setup:</strong> ${joke.setup}</p>
                <p><strong>Delivery:</strong> ${joke.delivery}</p>
                <hr>
            `;
            categoryListDiv.appendChild(jokeElement);
        });
    } 
    
    // Fetch a random joke
    function loadRandomJoke() {
        fetch("http://localhost:3000/jokebook/joke/random")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(joke => {
                displayRandomJoke(joke);
            })
            .catch(error => {
                console.error("Error fetching random joke:", error);
            });
    }

    // Display the random joke in the randomJokeDiv
    function displayRandomJoke(joke) {
        randomJokeDiv.innerHTML = `
            <p><strong>Setup:</strong> ${joke.setup}</p>
            <p><strong>Delivery:</strong> ${joke.delivery}</p>
        `;
    }

    // Fetch all categories
    function loadCategories() {
        fetch("http://localhost:3000/jokebook/categories")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(categories => {
                displayCategories(categories);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    // Display the categories in the categoryListDiv
    function displayCategories(categories) {
        categoryListDiv.innerHTML = "";
        categories.forEach(category => {
            const categoryElement = document.createElement("button");
            categoryElement.textContent = category.name;
            categoryElement.addEventListener("click", () => {
                loadJokesByCategory(category.name);
            });
            categoryListDiv.appendChild(categoryElement);
        });
    }

    // Fetch and display jokes by category
    function loadJokesByCategory(categoryName) {
        fetch(`http://localhost:3000/jokebook/joke/${categoryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(jokes => {
                displayJokes(jokes);
            })
            .catch(error => {
                console.error("Error fetching jokes by category:", error);
            });
    }

    // Search for jokes by category name
    function searchJokesByCategory() {
        const categoryName = categorySearchInput.value.trim();
        if (!categoryName) {
            alert("Please enter a category name.");
            return;
        }
        fetch(`http://localhost:3000/jokebook/joke/${categoryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(jokes => {
                displaySearchResults(jokes);
            })
            .catch(error => {
                console.error("Error fetching jokes by category:", error);
            });
    }

    // Display search results in the searchResultsDiv
    function displaySearchResults(jokes) {
        searchResultsDiv.innerHTML = "";
        if (jokes.length === 0) {
            searchResultsDiv.innerHTML = "<p>No jokes found for this category.</p>";
            return;
        }
        jokes.forEach(joke => {
            const jokeElement = document.createElement("div");
            jokeElement.innerHTML = `
                <p><strong>Setup:</strong> ${joke.setup}</p>
                <p><strong>Delivery:</strong> ${joke.delivery}</p>
                <hr>
            `;
            searchResultsDiv.appendChild(jokeElement);
        });
    }

    // Add a new joke
    function addNewJoke(event) {
        event.preventDefault();

        const newCategory = document.getElementById("new-category").value.trim();
        const newSetup = document.getElementById("new-setup").value.trim();
        const newDelivery = document.getElementById("new-delivery").value.trim();

        if (!newCategory || !newSetup || !newDelivery) {
            alert("Please fill in all fields.");
            return;
        }

        const newJoke = {
            category: newCategory,
            setup: newSetup,
            delivery: newDelivery
        };

        fetch("http://localhost:3000/jokebook/joke/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJoke)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(result => {
                if (result.category) {
                    addJokeResultDiv.innerHTML = `<p>New joke added successfully in category: ${result.category}</p>`;
                    // Reload jokes for the added category to show the new joke
                    loadJokesByCategory(result.category);
                } else {
                    addJokeResultDiv.innerHTML = `<p>Failed to add joke. Please try again.</p>`;
                }
            })
            .catch(error => {
                console.error("Error adding new joke:", error);
            });
    }

});
