<template>
         <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h1>Login</h1>
            </v-card-title>
            <v-form>
            <v-text-field prepend-icon="person" name="Username" label="Username" v-model="username"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="getLogin()">Login</v-btn>
            </v-card-actions>
            <v-app id="inspire">
            <v-alert
            v-model="alert"
            dismissible
            type="error"
            >
            The user or the password is wrong, please retry
            </v-alert>
            <v-alert
            v-model="logged"
            dismissible
            type="success"
            >
            You are succesfully connected
            </v-alert>
            </v-app>
            </v-form>
          </v-card>
        </v-container>
</template>
<script>
const axios = require("axios");

export default {
  data() {
    return {
      username: "",
      password: "",
      alert: false,
      logged: false
    };
  },
  methods: {
    getLogin() {
      axios
        .post("http://localhost:8080/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          if (response.data == "Connected") {
            this.logged = true;
            this.$nuxt.$router.replace("/dashboard");
          }
          if (response.data == "Wrong") this.alert = true;
        });
    }
  }
};
</script>

