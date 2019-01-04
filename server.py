from model import (Park, User, Visit, Review, connect_to_db, db)
from flask import (Flask, render_template, session)
from flask_cors import CORS
# pip3 isntall -u flask-cors
app = Flask(__name__, template_folder="np_passport/public")
CORS(app)

app.secret_key = "Don't go without your passport!"

@app.route("/")
def index():
	""" index.html for jsx """
	html = render_template("np_passport/public/index.html")
	return(html)

if __name__ == "__main__":
	# connect_to_db(app)
	app.run()
