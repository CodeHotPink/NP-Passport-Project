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
	park_photo = db.Column(db.String(100))
	park_website = db.Column(db.String(100))

	def __repr__(self):
		""" Park display """
		return(f"Park ID: {self.park_id}\nPark Name: {self.park_name}\nPark State: {self.park_state}")

class Users():
	""" User information """

	__tablename__ = "users"

	user_id = db.Column(db.Integer, 
						autoincrement=True,
						primary_key=True)
	first_name = db.Column(db.String(50))
	last_name = db.Column(db.String(50))
	gender = db.Column(db.String(3))
	birthday = db.Column(db.TimeDate)
	city = db.Column(db.String(50))
	state = db.Column(db.String(2))
	email = db.Column(db.String(100))
	password = db.Column(db.String(28))
	photo = db.Column(db.String(100))

	def __repr__(self):
		""" User display """
		return(f"Name: {self.first_name}\nState: {self.state}\nEmail: {self.email}")

class Visits():
	""" Visit information to populate passport on website """

	__tablename__ = "visits"

	visit_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True)
	user_id = db.Column(db.Integer,
						db.ForeignKey("users.user_id"))
	park_id = db.Column(db.Integer,
						db.ForeignKey("parks.park_id"))
	visit_date = db.Column(db.TimeDate)

class Reviews():
	""" Review information """

	__tablename__ = "reviews"

	review_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True)
	park_id = db.Column(db.Integer,
						db.ForeignKey("parks.park_id"))
	user_id = db.Column(db.Integer,
						db.ForeignKey("users.user_id"))
	num_of_stars = db.Column(db.Integer)
	text_review = db.Column(db.String(5000))
	review_date = db.Column(db.TimeDate)

	