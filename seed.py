from model import connect_to_db, Park, User, Visit, Review
from get_api import api_request, create_parks_code_list, create_park_field_condition
import urllib.request, json
from pprint import pprint
import key
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()

# Cannot enter additional fields into api request yet because it will cause json.loads() to error. 
# This is default information for all parks
req = f"https://developer.nps.gov/api/v1/parks?limit=600&api_key={key.NPS}"
all_destinations = api_request(req)


# Creating park codes based off designation words for api request
park_codes = create_parks_code_list("National Park",all_destinations)
# Creating conditional string to include in api request
park_field_condition = create_park_field_condition(park_codes)


# Now that api request will be smaller & will work with json.loads we will now include the additional fields needed for db
new_req = f"https://developer.nps.gov/api/v1/parks?{park_field_condition}&limit=600&fields=addresses,images,contacts&api_key={key.NPS}"
national_parks_data = api_request(new_req)


""" Note to self: must start db load functions. Will need one for each class; Park, User, Visit, Review 
	Remember to db.add() & db.commit() """
def load_parks_json(json_file):
	""" Delete current db to eliminate duplicates & re-enter using json file """
	db.dropdb(parks)
	db.createdb(parks)
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
		db.add(national_park)
		db.commit(national_park)
	print("Parks table is now loaded")

def load_user(user_file_path):
	""" Delete current db to eliminate duplicates. Parse user_file for re-enter """

	# db.dropdb(users)
	# db.createdb(users)	

	# creates list of users separated by commas
	user_file = open(user_file_path).readlines()
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
		db.add(db_user)
		db.commit(db_user)
	print("Users table is now loaded")
