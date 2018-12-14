from model import connect_to_db, Park, User, Visit, Review
from get_api import api_request, create_parks_code_list, create_park_field_condition
import urllib.request, json
from pprint import pprint
import key
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()

""" Note to self: must start db load functions. Will need one for each class; Park, User, Visit, Review 
	Remember to db.add() & db.commit() """
def load_parks_json():
	""" Delete current db to eliminate duplicates & re-enter using json file """
	Park.query.delete()
	json_file = "seed_data/national_parks_list.json"
	for index, park in enumerate(json_file):
		park_name = json_file[index]['fullName']
		park_description = json_file[index]['description']
		park_weather = json_file[index]['weatherInfo']
		park_address = json_file[index]['addresses'][1]['line1']
		park_state = json_file[index]['addresses'][1]['stateCode']
		postal_code = json_file[index]['addresses'][1]['postalCode']
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

	db.dropdb(users)
	db.createdb(users)	

	user_file = open("seed_data/user_data.csv").readlines()
	for user in user_file:
		user = user.rsplit("\n")
		user = user[0].split(",")
		first_name = user[0]
		last_name = user[1]
		gender = user[2]
		birthday = user[3]
		postal_code = user[4]
		state = user[5]
		email = user[6]
		password = user[7]
		photo = user[8]
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

	visit_file = open("seed_data/visit_data.csv").readlines()
	for visit in visit_file:
		visit = visit.rsplit("\n")
		visit = visit[0].split(",")
		user_id = visit[0]
		park_id = visit[1]
		visit_date = visit[2]
		db_visit = Visit(user_id=user_id,
			park_id=park_id,
			visit_date=visit_date)
		db.session.add(db_visit)
	db.session.commit()
	print("Visits table is now loaded")


def load_review():
	""" Delete current db to eliminate duplicates. Parse review_file for re-enter """

	Review.query.delete()

	review_file = open("seed_data/review_data.csv").readlines()
	for review in review_file:
		review = review.rsplit("\n")
		review = review[0].split(",")
		park_id = review[0]
		user_id = review[1]
		num_of_stars = review[2]
		text_review = review[3]
		review_date = review[4]
		db_review = review(park_id=park_id,
			user_id=user_id,
			num_of_stars=num_of_stars,
			text_review=text_review,
			review_date=review_date,)
		db.session.add(db_review)
	db.session.commit()
	print("Reviews table is now loaded")