# datboard

> Epitech project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

Docker :

# build an image from the Dockerfile
$ docker-compose build

# launch the app in the container
$ docker-compose up

```
The service server will run by exposing port 8080.
The service server will respond to the request http://localhost:8080/about.json

**Current cards:**

- Weather

- Youtube

- Bitcoin

## Requirement

- [Node](https://nodejs.org/en/) >= 8
- [Nuxt.js](https://github.com/nuxt/nuxt.js)>= 2.2
- [Vuetify.js](https://vuetifyjs.com/)>= 1.3

For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

"services": {
        "/ytVideo": {
            "get": {
                "operationId": "GET_ytVideo",
                "summary": "ytVideo",
                "tags": [
                    "API"
                ],
             	   "description": "Retrieve a Youtube video",
		   "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
		   "responses": {
                    "200": {
                        "description": ""
                    	},
	                }
            }
        },
        "/Bitcoin": {
            "get": {
                "operationId": "GET_Bitcoin",
                "summary": "bitcoin",
                "tags": [
                    "API"
                ],
                "description": "",
		"parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "array"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    	},
                }
            }
        },
        "/weather": {
            "get": {
                "operationId": "GET_weather",
                "summary": "weather",
                "tags": [
                    "API"
                ],
                "description": "Retrieve meteo of a city.",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "choices"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    },
                }
            }
        },
}

## License


This project is the propriety of EPITECH.
