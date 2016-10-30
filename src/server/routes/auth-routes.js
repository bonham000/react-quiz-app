import express from 'express'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import secret from '../jwt-config'
import assert from 'assert'
import dotenv from 'dotenv'
import Validator from 'validator'
import validateUser from '../shared/validateUser'

dotenv.config();
const url = process.env.MONGO_HOST;

import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

const app = module.exports = express.Router();

function createToken(username) {
  return jwt.sign({user: username}, secret, { expiresIn: 60 * 60 });
}

// Insert a new user registration into the database
function addNewUser(userProfile) {
  console.log('Submitting new user to the database:', userProfile);
  // Add data to database
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err)

    db.collection('users').insertOne(userProfile);

    db.close();
  });

};

// Register new user
app.post('/register', function(req, res) {

  const user = req.body;
  console.log('New registration received on server:', user);

  const validation = validateUser(user)

  // Check if the user submitted all the fields correctly
  if (validation.isValid) {

      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);

        // Check to see if any user already exists with this username
        db.collection('users').findOne({ username: user.username }).then( (response) => {

          if (response === null) {
            
            // hash password for storage
            const passwordDigest = bcrypt.hashSync(user.password, 10);

            const profile = {
              username: user.username,
              email: user.email,
              password: passwordDigest,
              userData: {}
            }

            addNewUser(profile);

            res.status(201).send({
              username: user.username,
              id_token: createToken(user.username)
            });

          }
          else { res.status(400).send('This username already exists') }

        });

        db.close();

      })

  }
  // if user submission was invalid return errors to the client
  else {
    console.log('Invalid Registration:', validation.errors);
    res.status(400).send('Registration was in valid:', validation.errors);
  }

});

// Handle user login
app.post('/sessions/create', function(req, res) {

  const { username, password } = req.body;

  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);

    const Users = db.collection('users');
    
    Users.findOne( { username: username }).then( (data) => {
      
      // user does not exist in database
      if (data === null) {
        console.log('User does not exist');
        res.status(401).send('User does not exist');
      }
      // if user exists check if password is valid
      else if (bcrypt.compareSync(password, data.password)) {
        res.status(201).send({
          id_token: createToken(data.username),
          user: data.username
        });
      }
      // user exists but password was invalid
      else {res.status(401).send('Invalid login attempt')}

    });

  })

});