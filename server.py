from model import (Park, User, Visit, Review, connect_to_db, db)
from flask import (Flask, jsonify, redirect, request, session)
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import key
import datetime
import pdb

# pip3 isntall -u flask-cors
app = Flask(__name__)
cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})

app.secret_key = "Don't go without your passport!"

def review_list_to_json(review_list):
		"""Converting review list obtained from query into json object."""
		json_reviews = {"reviews":[]}
		for individual_review in review_list:
			user = User.query.filter(User.user_id == individual_review.user_id).first()
			first_name = user.first_name
			last_name = user.last_name
			user = f"{first_name} {last_name}"
			park = Park.query.filter(Park.park_id == individual_review.park_id).first()
			park = park.park_name
			date = individual_review.review_date
			date = datetime.datetime.strftime(date,'%m-%d-%Y')
			review = {"parkId":park,
						"userId":user,
						"numOfStars":individual_review.num_of_stars,
						"textReview":individual_review.text_review,
						"reviewDate":date}
			json_reviews["reviews"].append(review)
		return json_reviews

def visit_list_to_json(visit_list):
		"""Converting visit list obtained from query into json object."""
		json_visits = {"visits":[]}
		for individual_visit in visit_list:
			user = User.query.filter(User.user_id == individual_visit.user_id).first()
			first_name = user.first_name
			last_name = user.last_name
			user = f"{first_name} {last_name}"
			park = Park.query.filter(Park.park_id == individual_visit.park_id).first()
			park_pic = park.park_photo
			park = park.park_name
			date = individual_visit.visit_date
			date = datetime.datetime.strftime(date, '%m-%d-%Y')
			visit = {"parkId":park,
						"parkPic":park_pic,
						"userId":user,
						"firstName":first_name,
						"lastName":last_name,
						"visitDate":date}
			json_visits["visits"].append(visit)
		return json_visits

def park_info_to_json(park_info):
	"""Converting park info obtained from query into json object."""
	park_name = park_info.park_name
	park_description = park_info.park_description
	park_weather = park_info.park_weather
	park_address = park_info.park_address
	park_state = park_info.park_state
	postal_code = park_info.postal_code
	latitude = park_info.latitude
	longitude = park_info.longitude
	phone_num = park_info.phone_num
	park_photo = park_info.park_photo
	park_website = park_info.park_website
	park_info = {"parkName":park_name,
			"parkDescription":park_description,
			"parkWeather":park_weather,
			"parkAddress":park_address,
			"parkState":park_state,
			"postalCode":postal_code,
			"latitude":latitude,
			"longitude":longitude,
			"phoneNum":phone_num,
			"parkPhoto":park_photo,
			"website":park_website}
	return park_info

@app.after_request
def after(response):
  """Adds headers to all responses to satisfy CORS."""
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

@app.route('/')
def index():
	""" index.html for jsx """
	welcome = "Hi there" 
	return jsonify(welcome)

@app.route('/display_park_reviews', methods=['POST'])
@cross_origin()
def display_park_reviews():
	"""Given a park's name from site, it will return all reviews for that park"""
	data = request.get_json()
	full_name = data["park"]
	park = Park.query.filter(Park.park_name == full_name).first()
	park_id = park.park_id
	list_of_reviews = Review.query.join(Review.park).filter(Park.park_id == park_id).all()
	reviews = review_list_to_json(list_of_reviews)
	return jsonify(reviews)

@app.route('/display_park_visits', methods=['POST'])
@cross_origin()
def display_park_visits():
	"""Given a park's name from site, it will return all visits made by users for that park"""
	data = request.get_json()
	full_name = data["park"]
	park = Park.query.filter(Park.park_name == full_name).first()
	park_id = park.park_id
	list_of_visits = Visit.query.join(Visit.park).filter(Park.park_id == park_id).all()
	visits = visit_list_to_json(list_of_visits)
	print('the visits to json has been completed')
	return jsonify(visits)

@app.route('/user_log_in', methods=['POST'])
@cross_origin()
def user_log_in():
	"""Checks email & password for log in"""
	data = request.get_json()
	email = User.query.filter(User.email == data["email"])
	password = User.query.filter(User.password == data["password"])
	if email.count() == 0:
		return jsonify({"message": "User is not in system, please check email or register"})
	else:
		if password.count() == 0:
			return jsonify({"message": "Password is incorrect, please check password"})
		else:
			return jsonify({"message": "Successfully logged in"})

@app.route('/register_user', methods=['POST'])
@cross_origin()
def register_user():
	"""Register user"""
	data = request.get_json()
	print(data)
	states = {'Alaska': 'AK', 
			'Alabama': 'AL', 
			'Arkansas': 'AR', 
			'Arizona': 'AZ', 
			'California': 'CA', 
			'Colorado': 'CO', 
			'Connecticut': 'CT', 
			'District of Columbia': 'DC', 
			'Delaware': 'DE', 
			'Florida': 'FL', 
			'Georgia': 'GA', 
			'Hawaii': 'HI', 
			'Iowa': 'IA', 
			'Idaho': 'ID', 
			'Illinois': 'IL', 
			'Indiana': 'IN', 
			'Kansas': 'KS', 
			'Kentucky': 'KY', 
			'Louisiana': 'LA', 
			'Massachusetts': 'MA', 
			'Maryland': 'MD', 
			'Maine': 'ME', 
			'Michigan': 'MI', 
			'Minnesota': 'MN', 
			'Missouri': 'MO', 
			'Mississippi': 'MS', 
			'Montana': 'MT', 
			'North Carolina': 'NC', 
			'North Dakota': 'ND', 
			'Nebraska': 'NE', 
			'New Hampshire': 'NH', 
			'New Jersey': 'NJ', 
			'New Mexico': 'NM', 
			'Nevada': 'NV', 
			'New York': 'NY', 
			'Ohio': 'OH', 
			'Oklahoma': 'OK', 
			'Oregon': 'OR', 
			'Pennsylvania': 'PA', 
			'Rhode Island': 'RI', 
			'South Carolina': 'SC', 
			'South Dakota': 'SD', 
			'Tennessee': 'TN', 
			'Texas': 'TX', 
			'Utah': 'UT', 
			'Virginia': 'VA', 
			'Vermont': 'VT', 
			'Washington': 'WA', 
			'Wisconsin': 'WI', 
			'West Virginia': 'WV', 
			'Wyoming': 'WY'}
	first = data["first"]
	last = data["last"]
	gender = data["gender"]
	birthday = data["birthday"]
	postal = data["postal"]
	user_state = states[data["userState"]]
	email = data["email"]
	password = data["password"]
	query_email = User.query.filter(User.email == email)
	if query_email.count() > 0:
		message = f"{email} is already registered."
		return jsonify({"message": message,
						"newRegistration": "false"})
	else:
		db_user = User(first_name=first,
					last_name=last,
					gender=gender,
					birthday=birthday,
					postal_code=postal,
					state=user_state,
					email=email,
					password=password)
		db.session.add(db_user)
		db.session.commit()
		message = f"{db_user.first_name} {db_user.last_name} has been successfully registered"
		return jsonify({"message": message,
						"newRegistration": "true"})

@app.route('/display_user_visits', methods=['POST'])
@cross_origin()
def display_user_visits():
	"""Returning all visits a user has"""
	data = request.get_json()
	email = data["email"]
	user_id = User.query.filter(User.email == email).first()
	user_id = user_id.user_id
	user = User.query.filter(User.user_id == user_id).first()
	list_of_visits = Visit.query.filter(Visit.user_id == user_id).all()
	if list_of_visits:
		visits = visit_list_to_json(list_of_visits)
		return jsonify(visits)
	else:
		return jsonify({"userId":"You"})

@app.route('/individual_park_info', methods=['POST'])
@cross_origin()
def individual_park_info():
	""" Returning individual park info for park page view """
	data = request.get_json()
	park_name = data["park"]
	park = Park.query.filter(Park.park_name == park_name).first()
	park_info = park_info_to_json(park)
	park_info['google'] = key.GOOGLE
	return jsonify(park_info)

@app.route('/all_park_names', methods=['POST'])
@cross_origin()
def all_park_names():
	""" Returns all park names for add visit form """
	parks = Park.query.all()
	parks_json = {"parks": []}
	for park in parks:
		parks_json["parks"].append(park.park_name)
	return jsonify(parks_json)

def is_visit_duplicate(user_id,park_id_from_form,visit_date):
	visits = Visit.query.filter(Visit.user_id == user_id).all()
	for visit in visits:
		park = visit.park_id
		date_of_visit = visit.visit_date
		date_of_visit = datetime.datetime.strftime(date_of_visit,'%Y-%m-%d')
		if park == park_id_from_form and date_of_visit == visit_date:
			return True
		else:
			return False

@app.route('/add_user_visit', methods=['POST'])
@cross_origin()
def add_user_visit():
	""" Returning individual park info for park page view """
	data = request.get_json()
	email = data["email"]
	user_id = User.query.filter(User.email == email).first()
	user_id = user_id.user_id
	park_name = data["visitParkName"]
	park_id = Park.query.filter(Park.park_name == park_name)
	if park_id.count() > 0:
		park_id = Park.query.filter(Park.park_name == park_name).first()
		park_id = park_id.park_id
		visit_date = data["visitDateChange"]
		visit_duplicate = is_visit_duplicate(user_id,park_id,visit_date)
		if visit_duplicate:
			message = "This visit is already entered."
			print(message)
			return jsonify({"message": message})
		else:
			user_visit = Visit(user_id=user_id,
							park_id=park_id,
							visit_date=visit_date)
			db.session.add(user_visit)
			db.session.commit()
			visit_date = f"{visit_date[5:7]}-{visit_date[8:10]}-{visit_date[0:4]}"
			message = f"Your visit to {park_name} on {visit_date} has been entered successfully."
			print(message)
			return jsonify({"message": message,
							"close": True})
	else:
		message = "Enter valid park name"
		return jsonify({"message": message})

@app.route('/add_user_review', methods=['POST'])
@cross_origin()
def add_user_review():
	""" Returning individual park info for park page view """
	data = request.get_json()
	num_of_stars = data["numStarsChange"]
	num_of_stars = int(num_of_stars)
	text_review = data["reviewText"]
	email = data["email"]
	user_id = User.query.filter(User.email == email).first()
	user_id = user_id.user_id
	park_name = data["reviewParkName"]
	park_id = Park.query.filter(Park.park_name == park_name)
	if park_id.count() > 0:
		park_id = Park.query.filter(Park.park_name == park_name).first()
		park_id = park_id.park_id
		review_date = datetime.date.today()
		review_duplicate = is_review_duplicate(user_id,park_id,review_date)
		if review_duplicate:
			message = "This review is already entered."
			print(message)
			return jsonify({"message": message})
		else:
			user_review = Review(park_id=park_id,
							user_id=user_id,
							num_of_stars=num_of_stars,
							text_review=text_review,
							review_date=review_date)
			db.session.add(user_review)
			db.session.commit()
			review_date = f"{review_date[5:7]}-{review_date[8:10]}-{review_date[0:4]}"
			message = f"Your review to {park_name} on {review_date} has been entered successfully."
			print(message)
			return jsonify({"message": message,
							"close": True})
	else:
		message = "Enter valid park name"
		return jsonify({"message": message})		

if __name__ == "__main__":
	# connect_to_db(app)
	app.debug = True
	connect_to_db(app, "np_project")
	app.run(port=5000, host='0.0.0.0')
