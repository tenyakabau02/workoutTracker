  const express = require('express');
  const router = express.Router();

  const Exercise = require('../models.Exercise.model');

  //ROUTER TO GET ALL EXERCISES IN THE DATABASE
  router.get('/' , (req , res) => {
    Exercise.find()
    .then(exercises => res.json(exercises));
    .catch(err => res.status(400).json('Error :' + err));

  });

   //ROUTER TO CREATE A NEW EXERCISE  AND SAVE TO THE DATABASE

  router.post('/add' , (req , res) => {
     const username = req.body.username;
     const description = req.body.description;
     const duration = Number(req.body.duration);
     const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date
    });

       newExercise.save()
         .then(() => res.json('Exercise Added'));
         .catch(err => res.status(400).json('Error :' + err));
  });

  //ROUTER TO GET AN EXERCISE WITH THE SPECIFIC ID FROM THE DATABASE

  router.get('/:id' , (req , res) => {
    const { id } = req.params;
    Exercise.findById(id)
      .then(exercise => res.json(exercise));
      .catch(err => res.status(400).json('Error :' + err));
  });

  //ROUTER TO UPADATE AN EXERCISE WITH THE SPECIFIC ID

  router.post('/update/:id' , (req , res) => {
    const { id } = req.params;
    Exercise.findById(id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise Updated'));
        .catch(err => res.status(400).json('Error :' + err));

      });

        .catch(err => res.status(400).json('Error :' + err));

  });

  // ROUTER TO DELETE AN EXISTING EXERCISE WITH A SPECIFIC ID

  router.delete('/:id' , (req , res) => {
    const { id } = req.params;
    Exercise.findByIdAndDelete(id)
    .then(() => res.json('Exercise Deleted'));
    .catch(err => res.status(400).json('Error :' + err));

  });

module.exports = router;
