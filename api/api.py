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
# Read file contents to first run timestamp. If does not find file (created when date called), create a new file with timestamp
dirPath = os.path.dirname(os.path.abspath(__file__))
def getInitialStatusReqDateTime():
	try:
		return readInitialStatusRequestDateTime()
	except:
		return initializeHistoryFile()

# Create a new file to hold record incase of service failure || restart. It is initialized with the total endpoint count and current server time
def initializeHistoryFile():
	initialDateTime = datetime.datetime.now()
	with open(dirPath + '/history.json', 'w+') as output:
		json.dump({'initialDateTime': str(initialDateTime), 'totalEndPointRequests': 0}, output)
		return str(initialDateTime)

# initializeHistoryFile()
# Read data from history file stored with api
def readInitialStatusRequestDateTime():
	with open(dirPath + '/history.json') as file:
		data = json.load(file)
		return data['initialDateTime']

def updateTotalEndpoints():
	with open(dirPath + '/history.json', 'r+') as file:
		data = json.load(file)
		tmp = data['totalEndPointRequests']
		data['totalEndPointRequests'] = tmp + 1
		file.seek(0)
		json.dump(data, file)
		return data['totalEndPointRequests']

# updateTotalEndpoints()

app = Flask(__name__)

@app.route('/status')
def status():

	data = {
		'serviceUptime': getUptime(),
		'serviceEndPointRequests': getStatusCounter(),
		'initialDateTime': getInitialStatusReqDateTime(),
		'totalEndPointRequests': updateTotalEndpoints()
	}

	response = Response(json.dumps(data), status=200, mimetype='application/json')

	return response

app.run(host='0.0.0.0', port=4000)