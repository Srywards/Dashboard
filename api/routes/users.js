const { Router } = require('express')
const mongoose = require('mongoose')

const router = Router()

const User = mongoose.model('User');
router.post('/signin', function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save();
  console.log(user);
})

router.post('/login', function (req, res) {
  console.log(req.body);
  User.findOne({ username: req.body.username }).then((users) => {
      if (!users) res.send("Wrong");
      console.log(users);
      if (req.body.password === users.password) {
        res.send("Connected");
      }
      else res.send("Wrong");
    });
  });

module.exports = router