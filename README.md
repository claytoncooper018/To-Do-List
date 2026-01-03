# To-Do List App 📝
A simple web app to keep track of tasks, built with Flask and Python.

# Features
Add, view, and delete tasks

Simple and clean interface

Ready to deploy on Render or locally

# Requirements

Python

Flask (listed in requirements.txt)

# Setup
Clone the repo

git clone https://github.com/claytoncooper018/To-Do-List.git

cd To-Do-List


Install dependencies

pip install -r requirements.txt


Run locally

export FLASK_APP=app.py   # or your main file name
export FLASK_ENV=development
flask run


# Build Command:

pip install -r requirements.txt


# Start Command:
gunicorn app:app --bind 0.0.0.0:$PORT

Replace app:app with yourfilename:yourflaskinstance if different.
