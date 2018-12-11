from model import connect_to_db, Park, User, Visit, Review
from get_api import api_request, create_parks_code_list, create_park_field_condition
import urllib.request, json
from pprint import pprint
import key


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

# Park class upload, need to make into function
for index, park in enumerate(national_parks_data):
	park_name = national_parks_data[index]['fullName']
	print(park_name)
	park_description = national_parks_data[index]['description']
	print(park_description)
	park_weather = national_parks_data[index]['weatherInfo']
	print(park_weather)
	park_address = national_parks_data[index]['addresses'][1]['line1']
	print(park_address)
	park_state = national_parks_data[index]['addresses'][1]['stateCode']
	print(park_state)
	postal_code = national_parks_data[index]['addresses'][1]['postalCode']
	print(postal_code)
	lat_long = national_parks_data[index]['latLong']
	lat_long = lat_long.split(",")
	latitude = lat_long[0][4:]
	print(latitude)
	longitude = lat_long[1][6:]
	print(longitude)
	phone_num = national_parks_data[index]['contacts']['phoneNumbers'][0]['phoneNumber']
	print(phone_num)
	park_photo = national_parks_data[index]['images'][0]['url']
	print(park_photo)
	park_website = national_parks_data[index]['url']
	print(park_website)
	print("\n\n\n\n")
