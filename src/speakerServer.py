import os
import json
from bottle import route, run, request
from store import redis


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

@route('/<speakerId>', method="GET")
def get_speaker(speakerId):
	return redis.get(speakerId)

@route('/<speakerId>', method="POST")
def post_speaker(speakerId):
	data = request.body.readline()
	entity = json.loads(data)
	redis.set(speakerId, entity)


@route('/<speakerId>', method="PUT")
def update_speaker(speakerId):
	data = request.body.readline()
	entity = json.loads(data)
	existingObject = redis.get(speakerId)
	existingObject.update(entity)
	redis.set(speakerId, existingObject)





run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
