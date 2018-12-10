import urllib.request, json
from pprint import pprint
import key

def api_request(link):
	""" makes api request & returns list of dictionaries """
	api_response = urllib.request.urlopen(link).read()
	data = json.loads(api_response)
	data = data['data']
	return data

def create_national_parks_code_list(list_of_dictionaries):
	""" Creates list of national park codes to use in later api request """
	park_codes = []
	for park in list_of_dictionaries:
		# Slicing to character 13 due to some destinations being "National Park & Preserve". They will be included along with strictly national parks destinations
		if park['designation'][0:13] == "National Park":
			park_codes.append(park['parkCode'])
		else:
			pass
	return park_codes
	
# Cannot enter fields into api yet because it will cause json.loads() to error. 
# This is default information for all parks
req = f"https://developer.nps.gov/api/v1/parks?limit=600&api_key={key.NPS}"
all_destinations = api_request(req)

park_codes = create_national_parks_code_list(all_destinations)

# Creating conditional string to include in api request
park_field_condition = "parkCode="
for code in park_codes:
	if code == park_codes[-1]:
		park_field_condition+=code
	else:
		park_field_condition+=(code+",")

# Now that api request will be smaller & will work with json.loads I am now including the additional fields needed for db
new_req = f"https://developer.nps.gov/api/v1/parks?{park_field_condition}&limit=600&fields=addresses,images,contacts&api_key={key.NPS}"

national_parks_data = api_request(new_req)

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
