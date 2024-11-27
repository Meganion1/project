# app/routes.py
from flask import jsonify, request
from app import app  # Import the app instance from __init__.py
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch API key from environment variables
SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY')
SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/findByIngredients'
SPOONACULAR_RECIPE_INFO_URL = 'https://api.spoonacular.com/recipes/{id}/information'

@app.route('/recipes', methods=['POST'])
def get_recipes():
    data = request.get_json()  # Get ingredients from the frontend request
    ingredients = data.get('ingredients', [])

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    # Get recipes using the Spoonacular API
    recipes = find_recipes_by_ingredients(ingredients)
    
    if recipes:
        return jsonify(recipes)
    else:
        return jsonify({"error": "No recipes found"}), 404

def find_recipes_by_ingredients(ingredients):
    """Fetch recipes from Spoonacular API based on provided ingredients."""
    # Format the ingredients into a comma-separated string
    ingredients_str = ','.join(ingredients)
    
    # Prepare the API request parameters
    params = {
        'ingredients': ingredients_str,
        'number': 5,  # Limit the number of recipes returned (adjust as needed)
        'apiKey': SPOONACULAR_API_KEY
    }
    
    # Send the request to the Spoonacular API
    response = requests.get(SPOONACULAR_API_URL, params=params)
    
    if response.status_code == 200:
        data = response.json()
        recipes = []

        for recipe in data:
            # For each recipe, fetch more details (including description)
            recipe_id = recipe.get('id')
            recipe_info = get_recipe_info(recipe_id)

            if recipe_info:
                recipes.append({
                    "title": recipe.get("title"),
                    "image": recipe.get("image"),
                    "id": recipe.get("id"),
                    "description": recipe_info.get("summary")  # Get the recipe description
                })
        return recipes
    else:
        # Log the error and return an empty list or an error message
        print(f"Error fetching recipes: {response.status_code} - {response.text}")
        return []

def get_recipe_info(recipe_id):
    """Fetch detailed information for a specific recipe."""
    url = SPOONACULAR_RECIPE_INFO_URL.format(id=recipe_id)
    params = {
        'apiKey': SPOONACULAR_API_KEY
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        # Return the detailed information (including description)
        return {
            "summary": data.get("summary", "No description available.")
        }
    else:
        print(f"Error fetching recipe details: {response.status_code} - {response.text}")
        return None
