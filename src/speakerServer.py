from bottle import route, run

import pickle
import redis, os


redistogo_url = os.getenv('REDISTOGO_URL', None) 
if redistogo_url == None: 
	redis_url = '127.0.0.1:6379' 
else: 
	redis_url = redistogo_url 
	redis_url = redis_url.split('redis://redistogo:')[1] 
	redis_url = redis_url.split('/')[0] 
	REDIS_PWD, REDIS_HOST = redis_url.split('@', 1) 
	redis_url = "%s?password=%s" % (REDIS_HOST, REDIS_PWD) 

session_opts = { 'session.type': 'redis', 'session.url': redis_url, 'session.data_dir': './cache/', 'session.key': 'appname', 'session.auto': True, }

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
def taler_add()

run(host='localhost', port=8080, debug=True)