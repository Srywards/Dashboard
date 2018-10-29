function about(req, res) {
	let aboutjson = {
	    client: {
		host: req.connection.remoteAddress,
	    },
	    server: {
		current_time: new Date().getTime(),
		services: [
		    {
			name: 'meteo',
			widgets: [
			    {
				name: 'City',
				description: 'City temperature (C/F)',
				params: [
				    {
					name: 'city',
					type: 'string',
				    },
				    {
					name: 'temp',
					type: {"celcius": true, "fahrenheit": false},
				    },
				],
			    },
			],
		    },
		    {
			name: 'Bitcoin',
			widgets: [
			    {
				name: 'Convert Bitcoin',
				description: 'Value of a bitcoin by currency',
				params: [
				    {
					name: 'currency',
					type: [{}],
				    },
				],
			    },
			],
		    },
		    {
			name: 'YouTube',
			widgets: [
			    {
				name: 'Video',
				description: "Display title, duration, views and url",
				params: [
				    {
					name: 'Video',
					type: 'string',
				    },
				],
			    },
			],
		    },
		],
	    },
	}
	res.json(aboutjson)
    }

    module.exports = about