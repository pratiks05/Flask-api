#This file initializes your Flask application and sets up the core configuration:

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy,send_from_directory
import os

app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db" #Configures SQLAlchemy to use a SQLite database named "friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #disables a feature of SQLAlchemy that tracks modifications to objects and emits signals. This is not needed in most cases and can be disabled to save memory.

db=SQLAlchemy(app) #initiase the database connection

frontend_folder=os.path.join(os.path.getcwd(),"..","frontend")
dist_folder=os.path.join(frontend_folder,"dist")



@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename="index.html"
    return send_from_directory(dist_folder,filename)


import routes #importing the routes module after initializing the app and db to avoid circular imports. The routes module will define the API endpoints for the application.
#Creating tables for our database models
with app.app_context():
    db.create_all() #create all database tables defined by the models in the app




if(__name__=="__main__"):
    app.run(debug=True)
