# app/__init__.py
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Import routes after app is initialized to avoid circular imports
from app.routes import *
