import express from 'express'
import assert from 'assert'
import path from 'path'
import fallback from 'express-history-api-fallback'
import devConfig from './config/setup/dev'
import prodConfig from './config/setup/prod'
import { NODE_ENV, PORT } from './config/env'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'
dotenv.config({silent: true});

const url = process.env.MONGO_HOST;
const secretString = process.env.SECRET_STRING;

import apiRoutes from './routes/api-routes'
import passportRoutes from './routes/passport'

const app = express();

if (NODE_ENV === 'development') { devConfig(app) } else { prodConfig(app) }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// test connection to database
mongoose.Promise = global.Promise;
mongoose.connect(url, () => { console.log('connected through mongoose') });

app.use(express.static('dist/client'));

app.use(cookieParser(secretString));
app.use(session({
  secret: secretString,
  resave: true,
  secure: false,
  saveUninitialized: true
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });

// connect authentication and api routes
app.use(passportRoutes);
app.use(apiRoutes);

app.use(fallback(path.join(__dirname, '../../dist/client/index.html')));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`The Express Server is Listening at port ${PORT} in ${NODE_ENV} mode`);
});

export default app;
