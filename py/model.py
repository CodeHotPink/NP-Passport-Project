""" data models for project database """
""" questions for queue:
how to I set up classes in react that will use the db
how do I use react with flask & db? 
with the homepage route that I will define do I just render a jsx template?
is there somewhere in jsx where I import db? Or how does it connect to the server?
"""

from flask_sqlalchemy import SQLAlchemy

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

class User(db.Model):
	""" User information """

	__tablename__ = "users"

	user_id = db.Column(db.Integer, 
						autoincrement=True,
						primary_key=True)
	first_name = db.Column(db.String(50))
	last_name = db.Column(db.String(50))
	gender = db.Column(db.String(3))
	birthday = db.Column(db.DateTime())
	city = db.Column(db.String(50))
	state = db.Column(db.String(2))
	email = db.Column(db.String(100))
	password = db.Column(db.String(28))
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
						db.ForeignKey("users.user_id"))
	park_id = db.Column(db.Integer,
						db.ForeignKey("parks.park_id"))
	visit_date = db.Column(db.DateTime())

	user = db.relationship("User", backref="visits")
	park = db.relationship("Park", backref="parks")

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

	park = db.relationship("Park", backref="parks")
	user = db.relationship("User", backref="visits")

	def __repr__(self):
		""" Review display """
		return(f"User {self.user_id} gave park {self.park_id} {self.num_of_stars}/5 stars on {self.review_date}.")


"""note to self, once I get seed data I need to db.session.add(looped over item) & db.session.commit()
also when querying use 'db.session.query(...) this is more flexible
& remember to chain queries & include fetching record (i.e. '.all()', '.first()'"""