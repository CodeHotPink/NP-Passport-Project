import urllib.request, json
from pprint import pprint
import key

def api_request(link):
	""" makes api request & returns list of dictionaries """
	api_response = urllib.request.urlopen(link).read()
	data = json.loads(api_response)
	data = data['data']
	return data

def create_parks_code_list(designation, list_of_dictionaries):
	""" Creates list of national park codes based off designation description to use in later api request. 
	Designation examples: "National Park", "Historical", "Trail", etc. """
	park_codes = []
	for park in list_of_dictionaries:
		if designation in park['designation']:
			park_codes.append(park['parkCode'])
		else:
			pass
	return park_codes

def create_park_field_condition(list_of_park_codes):
	""" Creates string to insert in api request for specific parks """
	park_field_condition = "parkCode="
	for code in list_of_park_codes:
		if code == list_of_park_codes[-1]:
			park_field_condition+=code
		else:
			park_field_condition+=(code+",")
	return park_field_condition
	

""" When needed will uncomment lines of codes below to obtain api. For right now not needed as I have saved json file into file to use. """

""" Cannot enter additional fields into api request yet because it will cause json.loads() to error. 
This is default information for all parks """
# req = f"https://developer.nps.gov/api/v1/parks?limit=600&api_key={key.NPS}"
# all_destinations = api_request(req)


""" Creating park codes based off designation words for api request """
# park_codes = create_parks_code_list("National Park",all_destinations)
# Creating conditional string to include in api request
# park_field_condition = create_park_field_condition(park_codes)


""" Now that api request will be smaller & will work with json.loads we will now include the additional fields needed for db """
# new_req = f"https://developer.nps.gov/api/v1/parks?{park_field_condition}&limit=600&fields=addresses,images,contacts&api_key={key.NPS}"
# national_parks_data = api_request(new_req)