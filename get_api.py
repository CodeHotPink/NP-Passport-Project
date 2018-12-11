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
	
