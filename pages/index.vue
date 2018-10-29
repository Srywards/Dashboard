<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/letter-d.png" alt="Datboard" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to Datboard</v-card-title>
        <v-card-text>
          <p>Datboard is designed to be the best Dashboard made by students of Epitech</p>
          <div class="text-xs-right">
            <em><small>&mdash; Clement Da-Purificacao & Flavien Lalloue</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" flat nuxt to="/login">Login</v-btn>
          <v-btn color="info" flat nuxt to="/signin">Sign in</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
