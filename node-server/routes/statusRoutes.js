const apiHost = process.env.API_HOST,
	  apiPort = process.env.API_PORT,
	  apiURL = apiHost + ':' + apiPort;

let router = require('express').Router(),
	request = require('request');

router.get('/', (req, res) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	request('http://' + apiURL + '/status', (err, response, data) => {
		if(err) {
			throw new Error("Connection to api failed. Confirm that it is running.")
		} else {
			res.send(data)	
		}
	})
})

module.exports = router;