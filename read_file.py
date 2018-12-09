import json
from pprint import pprint

file = open("sample.json").read()
print(file)

file_info = json.loads(file)
print(file_info)
print("after prettyprint")
pprint(file_info)
list_of_object = file_info['data']
for i in list_of_object:
	print(f"this is one instance: {i}")

"""note to self, list_of_object is a list of the place's information. I need to turn it into a dictionary.