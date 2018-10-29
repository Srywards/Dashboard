<template>
  <v-container flat color="transparent" grid-list-md text-xs-center>
    <v-layout row wrap justify-space>
      <v-flex v-for="i in box" :key="`${i}`" xs4>
        <v-toolbar color="black" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{ i.title }}</v-toolbar-title>
        </v-toolbar>
        <v-card><br>
          <v-card v-if="i.activemeteo">
            <v-text-field prepend-icon="search" name="City" label="City(Postal Code)" v-model="city"></v-text-field>
            <v-container fluid >
              <p v-if=false>{{ radios || 'null' }}</p>
              <v-radio-group v-model="radios">
                <v-radio label="Degree" value="Degree"></v-radio>
                <v-radio label="Fahrenheit" value="Fahrenheit"></v-radio>
              </v-radio-group>
            </v-container>
            <v-btn color="black" dark @click="getMeteo()">
              <v-icon dark>backup</v-icon>
            </v-btn>
            <div class="darken" id="app" v-cloak >
              <div v-if="meteoloading">
                <h1>Waiting for a location...</h1>
              </div>
              <div id="content" v-else>
                <h1><br>{{location}}</h1>
                <p>
                  <span class="temp">{{temp}}</span><br/>
                  Humidity: {{humidity}}% <br><br>Windspeed: {{windspeed}}<br><br/>
                  {{desc}}
                </p>
              </div>
            </div>
          </v-card>
          <v-card v-if="i.activeytb">
            <v-text-field prepend-icon="search" name="Video" label="Video" v-model="video"></v-text-field>
            <v-btn color="black" dark @click="getYoutube()">
              <v-icon dark>backup</v-icon>
            </v-btn>
            <div class="darken" id="app" v-cloak >
              <div v-if="ytbloading">
                <h1>Waiting for response...</h1>
              </div>
              <div v-else>
                <h1><br>{{titlevideo}}<br></h1>
                <p>
                  duration: {{duration}}<br>
                  views: {{views}}<br>
                  url: {{url}}
                </p>
              </div>
            </div>
          </v-card>
          <v-card v-if="i.activeexchange">
            <h1>Convert bitcoin in</h1>
            <v-flex>
              <v-overflow-btn v-model="toggle_one" :items="dropdown_edit" label="Editable Btn" editable item-value="text" ></v-overflow-btn>
            </v-flex>
            {{bitcoin}}<br>
            <v-btn flat icon color="black" dark @click="getExchange()">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const axios = require("axios");

export default {
  layout: 'basic',
  data() {
    return {
      radios: "Degree",
      city: "",
      meteoloading: true,
      lat: null,
      lon: null,
      location: null,
      temp: null,
      humidity: null,
      windspeed: null,
      video: null,
      titlevideo: null,
      duration: null,
      url: null,
      views: null,
      ytbloading: true,
      json: null,
      dropdown_edit: [],
      bitcoin: "",
      toggle_one: "",
      country_code: "",
      tmp_json: null,
      box: [
        {
          title: "Météo",
          activemeteo: true
        },
        {
          title: "Youtube",
          activeytb: true
        },
        {
          title: "Bitcoin",
          activeexchange: true
        }
      ]
    };
  },
  mounted: function() {
    this.getjson();
  },
  methods: {
    getMeteo() {
      axios
        .post("http://localhost:8080/Dashboard/meteo", {
          id: "meteo",
          temp: this.radios,
          city: this.city
        })
        .then(response => {
          console.log(response);
          this.location = response.data["0"].current.observationpoint;
          if (this.radios == "Degree")
            this.temp = response.data["0"].current.temperature + "°C";
          else this.temp = response.data["0"].current.temperature + "°F";
          this.humidity = response.data["0"].current.humidity;
          this.windspeed = response.data["0"].current.winddisplay;
          this.desc = response.data["0"].current.skytext;
          this.meteoloading = false;
          console.log(response.data);
        });
    },
    getYoutube() {
      axios
        .post("http://localhost:8080/Dashboard/youtube", {
          id: "youtube",
          video: this.video
        })
        .then(response => {
          console.log(response);
          this.titlevideo = response.data.title;
          this.duration = response.data.duration.timestamp;
          this.url = "https://www.youtube.com" + response.data.url;
          this.views = response.data.views;
          this.ytbloading = false;
          console.log(response.data);
        });
    },
    getjson() {
      axios
        .post("http://localhost:8080/Dashboard/json", {
          id: "json"
        })
        .then(response => {
          var arr = [];
          for (var prop in response.data) {
            arr.push(response.data[prop]["currency name"]);
          }
          this.dropdown_edit = arr;
          this.tmp_json = response.data;
        });
    },
    getExchange() {
      axios
        .post("http://localhost:8080/Dashboard/Exchange", {
          id: "Exchange",
          money: this.toggle_one
        })
        .then(response => {
          console.log(response);
          var i = 0;
          while (this.tmp_json[i]) {
            if (this.tmp_json[i]["currency name"] == this.toggle_one) break;
            i++;
          }
          var tmp_str = "1a. price (" + this.tmp_json[i]["currency code"] + ")"
          var arr = [];
          console.log(tmp_str);
          for (var prop in response.data) {
            arr.push(
              response.data[prop][tmp_str]);
          }
          this.bitcoin = "1 Bitcoin = " + arr[0] + " " + this.toggle_one;
        });
    }
  }
};
</script>
<style>
.darken {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(http://www.sompaisoscatalans.cat/simage/132/1328880/wallpaper-meteo.png);
}

body {
  background-size: contain;
  background: url(http://www.sompaisoscatalans.cat/simage/132/1328880/wallpaper-meteo.png);
}

#content {
  width: 100%;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  font-size: 2em;
}

h1 {
  font-size: 1em;
}
.temp {
  font-size: 3em;
}

body {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

[v-cloak] {
  display: none;
}
</style>
