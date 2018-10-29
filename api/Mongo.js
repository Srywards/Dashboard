const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/BDD_MongoDB', {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
})
  .then(() => console.log('Sucessfully connected to DB'))
  .then(() => clearCollections())
  .catch((err) => {
    console.log(err);
  });

function clearCollections() {
  for (var collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].deleteOne(function () { });
  }
}

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

mongoose.model("User", UserSchema)

module.exports = Schema