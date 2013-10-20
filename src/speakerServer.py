import os
from bottle import route, run


class Speaker:
	def __init__(name, party, sex):
		this.name = name
		this.party = part
		this.sex = sex
		this.replies = 0
		this.intros = 0
		this.speeches = 0
		this.pointOfOrder = 0

class Organization:
	def __init__(name):
		this.name = name
		this.meetings = {}

@route('/')
def taler_add():
	return "Hello world"

run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
