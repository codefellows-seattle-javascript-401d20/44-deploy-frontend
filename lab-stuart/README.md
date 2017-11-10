#  OAuth - Lab 41 Stuart

## About:
An example OAuth implementation with a simple Account model backend and a 'Signup with Google' link frontend.

`npm start` from the backend (with mongodb running) to start the API.
`live-server` from the /frontend directory to load the index.html splash login page.

Google OAuth leverages a backend GET route at `/oauth/google` to exchange CODE for Token and set up an Account for login. 
