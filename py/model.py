""" Creating classes & DB for nationals park project """

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Parks():
	""" Information on each national park """
	
	__tablename__ = "parks"
	
	park_id = db.Column(db.Integer, 
						autoincrement=True,
						primary_key=True)
	park_name = db.Column(db.String(50))
	park_address = db.Column(db.String(50))
	park_state = db.Column(db.String(2))
	longitude = db.Column(db.Numeric(10, 8))
	latitude = db.Column(db.Numeric(10, 8))
	phone_num = db.Column(db.String(10))
	park_picture = db.Column(db.String(100))
	park_website = db.Column(db.String(100))

	def __repr__(self):
		""" Park display """
		return(f"Park ID: {self.park_id}\nPark Name: {self.park_name}\nPark State: {self.park_state}")


