from model import connect_to_db, Park, User, Visit, Review, app, db
from get_api import api_request, create_parks_code_list, create_park_field_condition, json_file_request
import urllib.request, json
from pprint import pprint
import key
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# db = SQLAlchemy()

""" Note to self: must start db load functions. Will need one for each class; Park, User, Visit, Review 
	Remember to db.add() & db.commit() """
def load_parks_json():
	""" Delete current db to eliminate duplicates & re-enter using json file """
	Park.query.delete()
	json_file = json_file_request("seed_data/national_parks_list.json")
	for index, park in enumerate(json_file):
		print(f"this is {index}, this is {park}")
		park_name = json_file[index]['fullName']
		park_description = json_file[index]['description']
		park_weather = json_file[index]['weatherInfo']
		addresses = json_file[index]['addresses']
		for address in addresses:
			if address['type'] == "Physical":
				park_address = address['line1']
				park_state = address['stateCode']
				postal_code = address['postalCode']
				postal_code = str(postal_code)[0:5]
		lat_long = json_file[index]['latLong']
		lat_long = lat_long.split(",")
		latitude = lat_long[0][4:]
		longitude = lat_long[1][6:]
		phone_num = json_file[index]['contacts']['phoneNumbers'][0]['phoneNumber']
		park_photo = json_file[index]['images'][0]['url']
		park_website = json_file[index]['url']
		national_park = Park(park_name=park_name, 
							park_description=park_description, 
							park_weather=park_weather, 
							park_address=park_address,
							park_state=park_state,
							postal_code=postal_code,
							latitude=latitude,
							longitude=longitude,
							phone_num=phone_num,
							park_photo=park_photo,
							park_website=park_website)
		db.session.add(national_park)
	db.session.commit()
	print("Parks table is now loaded")

def load_user():
	""" Delete current db to eliminate duplicates. Parse user_file for re-enter """

	User.query.delete()

	user_file = json_file_request("seed_data/user_data.json")
	for index, user in enumerate(user_file):
		first_name = user_file[index]['first_name']
		last_name = user_file[index]['last_name']
		gender = user_file[index]['gender']
		birthday = user_file[index]['birthday']
		postal_code = user_file[index]['postal_code']
		state = user_file[index]['state']
		email = user_file[index]['email']
		password = user_file[index]['password']
		photo = user_file[index]['photo']
		db_user = User(first_name=first_name,
			last_name=last_name,
			gender=gender,
			birthday=birthday,
			postal_code=postal_code,
			state=state,
			email=email,
			password=password,
			photo=photo)
		db.session.add(db_user)
	db.session.commit()
	print("Users table is now loaded")

def load_visit():
	""" Delete current db to eliminate duplicates. Parse visit_file for re-enter """

	Visit.query.delete()

	visit_file = json_file_request("seed_data/visit_data.json")
	for index, visit in enumerate(visit_file):
		user_id = visit_file[index]['user_id']
		park_id = visit_file[index]['park_id']
		visit_date = visit_file[index]['visit_date']
		db_visit = Visit(user_id=user_id,
			park_id=park_id,
			visit_date=visit_date)
		db.session.add(db_visit)
	db.session.commit()
	print("Visits table is now loaded")

def load_review():
	""" Delete current db to eliminate duplicates. Parse review_file for re-enter """

	Review.query.delete()

	review_file = json_file_request("seed_data/review_data.json")
	for index, review in enumerate(review_file):
		park_id = review_file[index]['park_id']
		user_id = review_file[index]['user_id']
		num_of_stars = review_file[index]['num_of_stars']
		text_review = review_file[index]['text_review']
		review_date = review_file[index]['review_date']
		db_review = Review(park_id=park_id,
			user_id=user_id,
			num_of_stars=num_of_stars,
			text_review=text_review,
			review_date=review_date)
		db.session.add(db_review)
	db.session.commit()
	print("Reviews table is now loaded")
	

connect_to_db(app, "np_project")
db.create_all()
# load_parks_json()
load_user()
load_visit()
load_review()
