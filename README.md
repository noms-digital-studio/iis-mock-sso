# iis-mock-sso
Simple node app to stand in for an oauth2 SSO server

# Configuration

Edit server.js if need to change

* port - defaults to 3001
* IIS web app port - defaults to 3000
* Specify user profile to return

Create user profile in /users.
If you wanted, you could create multiple profiles and modify the SSO view to allow selection of a user.


# Start Server

* npm install
* npm start


# Operation

This is a very basic standin for an oauth2 SSO server.

You must configure your app to use the following paths, assuming the default port of 3001:

* Authentication - http://localhost:3001/oauth/authorize
* Token - http://localhost:3001/oauth/token
* User profile - http://localhost:3001/api/user_details

The user profile includes links for signo out and profile management, which are:

* Profile - http://localhost:3001/profile
* Sign Out - http://localhost:3001/users/sign_out

When your app initiates authentication the first call will be to /oauth/authorize. This will cause
the 'sso' view to be rendered. On this page you can select whether or not to authorize the user.
Unauthorised users will receive a 401 response. For authorised users, your aplications redirect URL
will be called with a dummy authentication code. Your app should then call /oauth/token and optionally 
/api/user_details to retrieve the profile.
