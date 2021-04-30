
import numpy as np
import pymongo
from flask import Flask, jsonify, send_from_directory
import json


# Setup Mongo DB Connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.pyrates_cleaned_v2
collection = db.items_cleaned_v2
pyrate_data = db["items_cleaned_v2"].find()
#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_url_path='')


#################################################
# Flask Routes
#################################################

## >>  Bookmarking Spot:  Need to update routes, 

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/data<br/>"
        f"/api/v1.0/Pyrate_Map<br/>"
    )

## This is SQLAlchemy Code, we'll need to adapt it to work with our Mongo DB 

## Site your sources:  https://medium.com/swlh/inserting-and-reading-mongodb-documents-from-a-python-flask-api-4fa7be61e45

@app.route("/api/v1.0/data")
def get():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

@app.route("/api/v1.0/Pyrate_Map")
def root():
    return app.send_static_file('worldmap.html')

# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
