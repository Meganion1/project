import React, { useState } from "react";
import styles from "./Ingredients.module.css";
import axios from "axios"; // Import axios for making API requests

function Ingredients() {
  const ingredients = [
    { id: 1517, name: "Apples" },
    { id: 1518, name: "Avocado" },
    { id: 1519, name: "Baking Powder" },
    { id: 1520, name: "Bread" },
    { id: 1521, name: "Cheese" },
    { id: 1522, name: "Chicken Breast" },
    { id: 1523, name: "Eggs" },
    { id: 1524, name: "Flour" },
    { id: 1525, name: "Fruit" },
    { id: 1526, name: "Lemons" },
    { id: 1527, name: "Milk" },
    { id: 1528, name: "Onions" },
    { id: 1529, name: "Potatoes" },
    { id: 1530, name: "Tomato" },
    { id: 1531, name: "Rice" },
    { id: 1532, name: "Ramen" },
    { id: 1533, name: "Mushroom" },
    { id: 1534, name: "Oil" },
    { id: 1535, name: "Cake Mix" },
    { id: 1536, name: "Pasta Noodles" },
  ];

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]); // Store fetched recipes
  const [error, setError] = useState(null); // To handle errors
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const [expandedRecipe, setExpandedRecipe] = useState(null); // State to manage expanded description

  // Function to strip HTML tags from the recipe description
  const stripHtmlTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  // Handle ingredient selection
  const handleIngredientSelect = (ingredient) => {
    const isSelected = selectedIngredients.some(
      (selected) => selected.id === ingredient.id
    );

    if (isSelected) {
      setSelectedIngredients(
        selectedIngredients.filter((selected) => selected.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Handle find recipes click
  const handleFindRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient.");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear any previous error

    try {
      // Send selected ingredients to the backend for recipe search
      const response = await axios.post("http://127.0.0.1:5001/recipes", {
        ingredients: selectedIngredients.map((ingredient) => ingredient.name), // Only send the ingredient names
      });

      // Apply stripHtmlTags to clean the recipe descriptions
      const cleanedRecipes = response.data.map((recipe) => ({
        ...recipe,
        description: stripHtmlTags(recipe.description), // Clean the description
      }));

      setRecipes(cleanedRecipes); // Update state with the cleaned recipes
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching recipes. Please try again.");
      setIsLoading(false);
    }
  };

  // Function to toggle recipe description visibility
  const toggleDescription = (index) => {
    setExpandedRecipe(expandedRecipe === index ? null : index); // Toggle expanded state
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`col-md-3 ${styles.customColumn} ${styles.first}`}>
          <div className={styles.left_wrapper0}>
            <div className={styles.i_tile}>
              <span className={styles.text}>WHAT DO YOU HAVE?</span>
              <div className={styles.k_container}>
                <p className={styles.k_button}>Available Ingredients</p>
              </div>
            </div>
            <div className={styles.left_wrapper}>
              <div
                className={styles.tile_wrapper_tiles}
                style={{ position: "relative", overflow: "hidden" }}
              >
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className={styles.i_list}>
                    <span className={styles.check_box}>
                      <input
                        type="checkbox"
                        checked={selectedIngredients.some(
                          (selected) => selected.id === ingredient.id
                        )}
                        onChange={() => handleIngredientSelect(ingredient)}
                        className={styles.ingredient_check}
                      />
                      <span className={styles.ingredient_checkbox}></span>
                      <span className={styles.ingredient_checkbox_label}>
                        {ingredient.name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`col-md-3 ${styles.customColumn} ${styles.second}`}>
          <div className={styles.checked_ingredients}>
            <p className={styles.checked_ingredients_title}>Your Ingredients</p>
            {selectedIngredients.length === 0 ? (
              <div className={styles.Empty}>
                <p>You don't have any selected ingredients.</p>
              </div>
            ) : (
              <div className={styles.List}>
                {selectedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className={styles.list_item}>
                    {ingredient.name}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.selectedNames}>
              {selectedIngredients.length > 0 && (
                <>
                  <h4>Selected Ingredient Names:</h4>
                  <p>
                    {selectedIngredients
                      .map((ingredient) => ingredient.name)
                      .join(", ")}
                  </p>
                </>
              )}
            </div>
            <div className={styles.button_submit}>
              <button className={styles.button} onClick={handleFindRecipes}>
                Find Recipes
              </button>
            </div>
          </div>
        </div>

        <div className={`col-md-3 ${styles.customColumn} ${styles.third}`}>
          <div className={styles.card}>
            <h1 className={styles.title}>Food Recipe Detection</h1>
            {/* Add your image upload logic here */}
          </div>
        </div>
      </div>

      {/* Display Recipes */}
      <div className={styles.recipeResults}>
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : recipes.length > 0 ? (
          <div>
            <h3>Recipe Suggestions</h3>
            {recipes.map((recipe, index) => (
              <div key={index} className={styles.recipe}>
                <h4>{recipe.title}</h4>

                {/* Flex container for image and description */}
                <div className={styles.recipeContent}>
                  {/* Recipe Image */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={styles.recipeImage}
                  />

                  {/* Recipe Description */}
                  <p className={styles.recipeDescription}>
                    {expandedRecipe === index
                      ? recipe.description
                      : recipe.description.substring(0, 70) + '...'}
                  </p>
                </div>

                {/* Read More Button */}
                {recipe.description.length > 70 && (
                  <button
                    className={styles.readMoreButton}
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedRecipe === index ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found for the selected ingredients.</p>
        )}
      </div>
    </div>
  );
}

export default Ingredients;
