<template>
         <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h1>Sign in</h1>
            </v-card-title>
            <v-form>
            <v-text-field prepend-icon="person" name="username" label="Username" v-model="username"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
	          <v-text-field prepend-icon="lock" name="Confirm Password" label="Confirm Password" type="password" v-model="confirmpassword"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="getSignin()">Sign in</v-btn>
            </v-card-actions>
            <v-app id="inspire">
            <v-alert
            v-model="alert"
            dismissible
            type="error"
            >
            Password doesn't match
            </v-alert>
            <v-alert
            v-model="signed"
            dismissible
            type="success"
            >
            You sign-up succesfully
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
      confirmpassword: "",
      alert: false,
      signed: false
    };
  },
  methods: {
    getSignin() {
      if (
        this.password != "" &&
        this.confirmpassword != "" &&
        this.password == this.confirmpassword
      ) {
        axios
          .post("http://localhost:8080/signin", {
            username: this.username,
            password: this.password
          })
          .catch(err => console.log(err));
          this.signed = true;
      } else {
        this.alert = true;
        this.password = "";
        this.confirmpassword = "";

      }
    }
  }
};
</script>

