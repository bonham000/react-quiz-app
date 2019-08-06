**~ Deprecated**

This project is no longer maintained. You can view a more update to date version [here](https://github.com/bonham000/app-time-lessons).

# A React Multiple Choice Quiz App

See it deployed here: https://pacific-retreat-29989.herokuapp.com/.

### Developing the Project

The `src/` folder contains two folders: `client/` and `server/`. The client is a React app and the server an Express server, which uses MongoDB as a data store.

### Deploying the Project

You will need to `cp sample.env .env` to your own `.env` file to store your environment variables, and fill in the values with your own tokens for MongoDB and GitHub.

To build the project code, run `npm run build`. This will build the client and server code to directory `dist/`.

From here, the app should be deployable to services like Heroku. Running `npm start` can be used to start the production app, using the entry file: `dist/server/index.js`.