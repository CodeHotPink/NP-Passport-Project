from model import (Park, User, Visit, Review, connect_to_db, db)
from flask import (Flask, jsonify, redirect, request, session)
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

# pip3 isntall -u flask-cors
app = Flask(__name__)
cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})

app.secret_key = "Don't go without your passport!"

@app.after_request
def after(response):
  """Adds headers to all responses to satisfy CORS."""
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

@app.route('/')
def index():
	""" index.html for jsx """
	# html = render_template("np_passport/public/index.html")
	welcome = "Hi there" 
	return jsonify(welcome)

@app.route('/display_park_reviews/<path:subpath>', methods=['GET'])
@cross_origin()
def display_park_reviews(subpath):
	"""Given a park's ID, it will return all reviews for that park"""
	parkName = subpath
	data = request.get_json()
	print(f"this is the data coming from request: {data}")
	q = Review.query.filter(Review.park_id == 1).one()
	print(q)
	# stars = q.num_of_stars
	# print(stars)
	return jsonify(q)

@app.route('/log_in', methods=['POST'])
@cross_origin()
def display_park_reviews():
	"""Checks username & password for log in"""
	data = request.get_json()
	print(f"this is the data coming from request: {data}")
	q = User.query.filter(User.park_id == 1).one()
	print(q)
	# stars = q.num_of_stars
	# print(stars)
	return jsonify(q)

if __name__ == "__main__":
	# connect_to_db(app)
	app.debug = True
	connect_to_db(app, "np_project")
	app.run(port=5000, host='0.0.0.0')
