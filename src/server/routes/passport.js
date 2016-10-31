import express from 'express'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import TwitterStrategy from 'passport-twitter'
import jwt from 'jsonwebtoken'
import secret from '../jwt-config'

import User from '../models/users'

const app = module.exports = express.Router();

function createToken(username) { return jwt.sign({user: username}, secret, { expiresIn: 60 * 60 }) }

// define GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // search for user in database base on id = GitHub email address as unique identification
    User.findOne({ id: profile.emails[0].value }, function(err, user) {
      // handle error
      if (err) { return done(err) }
      // if there is no user with this email, create a new one
      if (!user) {
        user = new User({
            id: profile.emails[0].value,
            displayName: profile.displayName,
            username: profile.username,
            password: '',
            githubId: profile.id,
            twitterId: '',
            userData: []
        });
        user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
        });
      // if user already has an account with this email, add their github ID  
      } else if (profile.emails[0].value === user.id) {
        user.githubId = profile.id
        user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
        });
      // user has logged in before, return user and proceed
      } else {
          console.log('user,', user);
          return done(err, user);
      }
    });
   }
));

// request for GitHub authentication
app.get('/auth/github', passport.authenticate('github'));

// GitHub callback
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to for client to continue auth process
		res.redirect('/account');
});

// define Twitter strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // search database based on twitter profile ID because twitter API does not provide email
    User.findOne({ twitterId: profile.id }, function(err, user) {
      //handle error
      if (err) { return done(err) }
      // if user has not logged in through twitter before, create a new user        
      if (!user) {
        user = new User({
            id: '',
            displayName: profile.displayName,
            username: profile.username,
            password: '',
            githubId: '',
            twitterId: profile.id,
            userData: []
        });
        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
      // if user has logged in through twitter before, let them proceed 
      } else {
          console.log('user,', user);
          return done(err, user);
      }
    });
   }
));

// request for Twitter authentication
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter callback
app.get('/auth/twitter/callback/', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to for client to continue auth process
    res.redirect('/account');
});

// client verifies auth flow from passport redirect are receives jwt token in response or redirects to login page otherwise
app.post('/verify', function(req, res){
  // if user is authenticated send them a jwt token
  if (req.isAuthenticated()) {
     res.status(201).send({
      id_token: createToken(req.user.username),
      user: req.user.username
  });
  // if session is not authenticated redirect to login
  } else { res.redirect('/login') }
 });

// handle logout in passport
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
