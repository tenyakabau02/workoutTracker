  const express = require('express');
  const app = express();
  const cors = require('cors');
  const mongoose = require('mongoose');

  //ROUTES
  const userRouter = require('./routes/user');
  const exerciseRouter = require('./routes/exercise');

  app.use('/users' , userRouter);
  app.use('/exercises' , exerciseRouter);


  app.use(cors());
  app.use(express.json({ extended : false}));


  //ESTABLISHING DATABASE CONNECTION
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser : true , useCreateIndex : true });

  const connection = mongoose.connection;
  connection.once('open' , () => {
    console.log('MongoDB database connection established successfully');
  });

  //PORT CONFIGURATION
  const port = process.env.PORT || 3000;
  app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
  });
