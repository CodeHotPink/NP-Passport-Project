""" data models for project database """

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()

def connect_to_db(app, db_name):
	"""Connect to database."""

	app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///' + db_name
	app.config['SQLALCHEMY_ECHO'] = True
	db.app = app
	db.init_app(app)

class Park(db.Model):
	""" Information on each national park """
	
	__tablename__ = "parks"
	
	park_id = db.Column(db.Integer, 
						autoincrement=True,
						primary_key=True)
	park_name = db.Column(db.String(50),
						nullable=False)
	park_address = db.Column(db.String(50),
						nullable=False)
	park_state = db.Column(db.String(2),
						nullable=False)
	postal_code = db.Column(db.Integer(),
						nullable=False)
	longitude = db.Column(db.Numeric(10, 8),
						nullable=False)
	latitude = db.Column(db.Numeric(10, 8),
						nullable=False)
	phone_num = db.Column(db.String(10))
	park_photo = db.Column(db.String(100),
						nullable=False)
	park_website = db.Column(db.String(100))

	def __repr__(self):
		""" Park display """
		return(f"Park ID: {self.park_id}\nPark Name: {self.park_name}\nPark State: {self.park_state}")

class User(db.Model):
	""" User information """

	__tablename__ = "users"

	user_id = db.Column(db.Integer, 
						autoincrement=True,
						primary_key=True)
	first_name = db.Column(db.String(50),
						nullable=False)
	last_name = db.Column(db.String(50),
						nullable=False)
	gender = db.Column(db.String(2),
						nullable=False)
	birthday = db.Column(db.DateTime(),
						nullable=False)
	postal_code = db.Column(db.Integer())
	state = db.Column(db.String(2))
	email = db.Column(db.String(100),
						nullable=False,
						unique=True)
	password = db.Column(db.String(28),
						nullable=False)
	photo = db.Column(db.String(100))

	def __repr__(self):
		""" User display """
		return(f"Name: {self.first_name}\nState: {self.state}\nEmail: {self.email}")

class Visit(db.Model):
	""" Visit information to populate passport on website """

	__tablename__ = "visits"

	visit_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True)
	user_id = db.Column(db.Integer,
						db.ForeignKey("users.user_id"),
						nullable=False)
	park_id = db.Column(db.Integer,
						db.ForeignKey("parks.park_id"),
						nullable=False)
	visit_date = db.Column(db.DateTime(),
						nullable=False)

	user = db.relationship("User", backref="visits")
	park = db.relationship("Park", backref="visits")

	def __repr__(self):
		""" Visit display"""
		return(f"User {self.user_id} visited park {self.park_id} on {self.visit_date}.")

class Review(db.Model):
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
	review_date = db.Column(db.DateTime())

	park = db.relationship("Park", backref="reviews")
	user = db.relationship("User", backref="reviews")

	def __repr__(self):
		""" Review display """
		return(f"User {self.user_id} gave park {self.park_id} {self.num_of_stars}/5 stars on {self.review_date}.")

def add_table_info():
	""" adds dummy info to table to test """

	Park(park_name='Yosemite',
		park_address='1234 somehere in CA',
		park_state='CA',
		longitude=12345.1234,
		latitude=12345.1234,
		park_photo='/some/folder/park.png')
	Park(park_name='Yellowstone',
		park_address='4321 somehere in CA',
		park_state='CA',
		longitude=54321.1234,
		latitude=54321.1234,
		park_photo='/some/folder/park2.png')
	Park(park_name='Niagra Falls',
		park_address='1234 somehere in USA',
		park_state='VN',
		longitude=76543.4321,
		latitude=76543.4321,
		park_photo='/some/folder/park.png')



"""note to self, once I get seed data I need to db.session.add(looped over item) & db.session.commit()
also when querying use 'db.session.query(...) this is more flexible
& remember to chain queries & include fetching record (i.e. '.all()', '.first()'"""

