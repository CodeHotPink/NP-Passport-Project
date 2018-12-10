import urllib.request, json
import key

# Cannot enter fields into api yet because it will cause json.loads() to error. 
# This is default information for all parks
req = f"https://developer.nps.gov/api/v1/parks?limit=600&api_key={key.NPS}"

# Execute request and parse response
response = urllib.request.urlopen(req).read()
data = json.loads(response)

# Creating list of national park park codes to use in later api request
park_codes = []
for park in data["data"]:
	# Slicing to character 13 due to some designations being "National Park & Preserve". They will be included along with strictly national parks
	if park['designation'][0:13] == "National Park":
		park_codes.append(park['parkCode'])
	else:
		pass

# Creating conditional string to include in api request
park_field_condition = "parkCode="
for code in park_codes:
	if code == park_codes[-1]:
		park_field_condition+=code
	else:
		park_field_condition+=(code+",")

# Now that api request will be smaller & will work with json.loads I am now including the additional fields needed for db
new_req = f"https://developer.nps.gov/api/v1/parks?{park_field_condition}&limit=600&fields=addresses,images,contacts&api_key={key.NPS}"

new_response = urllib.request.urlopen(new_req).read()
national_parks_data = json.loads(new_response)
"""note to self: new_data is now ONLY national parks in json dictionary. Now I have to uncomment below so I can start storing it into my db """


# Original below


# import urllib.request, json
# import key
# from pprint import pprint



# endpoint = "https://developer.nps.gov/api/v1/parks?limit=600&fields=addresses,images,contacts"
# HEADERS = {f"Authorization":"INSERT-{key.NPS}"}
# req = urllib.request.Request(endpoint,headers=HEADERS)

# # Execute request and parse response
# response = urllib.request.urlopen(req).read()
# data = json.loads(response.decode('utf-8'))


# # file = open("park_info.json").read()

# # file_info = json.loads(file.decode('utf-8'))
# # print(file_info)
# # print("after prettyprint")
# # pprint(file_info)
# list_of_object = data['data']
# print(len(list_of_object))
# # for i in list_of_object:
# # 	pprint(f"this is one instance: {i}")
# # for index, park in enumerate(list_of_object):
# # 	if list_of_object[index]['designation'] == "National Park":
# # 		park_name = list_of_object[index]['fullName']
# # 		print(park_name)
# # 		park_description = list_of_object[index]['description']
# # 		print(park_description)
# # 		park_weather = list_of_object[index]['weatherInfo']
# # 		print(park_weather)
# # 		park_address = list_of_object[index]['addresses'][1]['line1']
# # 		print(park_address)
# # 		park_state = list_of_object[index]['addresses'][1]['stateCode']
# # 		print(park_state)
# # 		postal_code = list_of_object[index]['addresses'][1]['postalCode']
# # 		print(postal_code)
# # 		lat_long = list_of_object[index]['latLong']
# # 		lat_long = lat_long.split(",")
# # 		latitude = lat_long[0][4:]
# # 		print(latitude)
# # 		longitude = lat_long[1][6:]
# # 		print(longitude)
# # 		phone_num = list_of_object[index]['contacts']['phoneNumbers'][0]['phoneNumber']
# 		print(phone_num)
# 		park_photo = list_of_object[index]['images'][0]['url']
# 		print(park_photo)
# 		park_website = list_of_object[index]['url']
# 		print(park_website)
# 	else:
# 		print(f"skip, this is a {designation}")

# """note to self, list_of_object is a list of the place's information. I need to turn it into a dictionary."""