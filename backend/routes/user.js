    const express = require('express');
    const router = express.Router();

    const User = require('../models/User.model');

    //ROUTER TO GET ALL USERS IN THE DATABASE

    router.get('/' , (req , res) => {
     User.find()
      .then(users => res.json(users));
      .catch(err => res.status(400).json('Error :' + err));

    });

    //ROUTER TO CREATE A NEW USER AND SAVE TO THE DATABASE

    router.post('/add' , (req , res) => {

      const { username } = req.body;

      const newUser = new User({ username });

      newUser.save()
        .then(() => res.json('User Added'));
        .catch(err => res.status(400).json('Error :' + err));

    });

  module.exports = router;
