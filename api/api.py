#!flask/bin/python
from flask import Flask
from flask import Response

import datetime, os, json

# Get uptime for service
startTime = datetime.datetime.now()
def getUptime():
	return str(datetime.datetime.now() - startTime)

# Count number of requests to status
statusRequestCt = 0
def getStatusCounter():
	global statusRequestCt
	statusRequestCt += 1
	return statusRequestCt

# Get the date/time of when the first request was made
# If file to read doesn't exist, create new file and update with initial data
initialDateTime = ''
isInitialStatusDate = False
dirPath = os.path.dirname(os.path.abspath(__file__))
def getInitialStatusReqDateTime():
	try:
		return readInitialStatusRequestDateTime()
	except:
		return initializeHistoryFile()


	# if not os.path.isFile(dirPath + '/history.json'):
	# 	print 'echo'
	# 	initializeHistoryFile()
	# readInitialStatusRequestDateTime()

def initializeHistoryFile():
	global initialDateTime			
	initialDateTime = datetime.datetime.now()
	with open(dirPath + '/history.json', 'w+') as output:
		json.dump({'initialDateTime': str(initialDateTime), 'totalEndPointRequests': 0}, output)
		return str(initialDateTime)

def readInitialStatusRequestDateTime():
	with open(dirPath + '/history.json') as file:
		data = json.load(file)
		print data['initialDateTime']
		return data['initialDateTime']


app = Flask(__name__)

@app.route('/status')
def status():

	data = {
		'serviceUptime': getUptime(),
		'serviceEndPointRequests': getStatusCounter(),
		'initialDateTime': getInitialStatusReqDateTime(),
		'totalEndPointRequests': 0
	}

	response = Response(json.dumps(data), status=200, mimetype='application/json')

	return response

app.run(host='0.0.0.0', port=4000)