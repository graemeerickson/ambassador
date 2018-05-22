
Note: README still under development.

# Ambassador
[Get started as a Neighborhood Ambassador or Prospective Homebuyer now!](http://ambassador-graeme.herokuapp.com/ "Get started as a Neighborhood Ambassador or Prospective Homebuyer now")

## Project Proposal
An app connecting prospective home-buyers with neighborhood ambassadors, built on React.js & the MERN stack.

## Objective & Project Details

Ambassador's purpose is to aid the home-buying process by connecting prospective buyers with ambassadors from the neighborhood they're interested in. By connecting with ambassadors, they can gain insights into what it's actually like to live in the neighborhood: whether it's learning more about the local school, or just getting the scoop on which internet service provider is best in the area.

A new user can sign up as either a prospective homebuyer or a neighborhood ambassador.

Neighborhood ambassadors are asked to provide their physical address and contact information, which is needed for prospective homebuyers to find ambassadors in their desired area and to reach out to them to connect.
Prospective homebuyers are asked to provide their desired home location, whether it's a specific address or just a city & state.

Once signed up & logged in, each user type sees their respective dashboard:

The neighborhood ambassador dashboard displays a map centered on the ambassador's home location, and also shows other nearby ambassadors.
The prospective homebuyer dashboard displayed a map centered on their desired location, along with neighborhood ambassadors in that area.

From a technical perspective, Ambassador is a decoupled React / MERN-stack web application. It uses React + HTML/CSS/Bootstrap on the front-end, Node & Express on the back-end, and MongoDB for its database.

__Data Model__

Ambassador's data model includes a User schema only:
* User: Object
  * firstName: String (e.g., 'Johnny')
  * lastName: String (e.g., 'Appleseed')
  * email: String (e.g., 'johnny@appleseed.com')
  * password: String
  * phoneNumber: String
  * targetAddress: String
  * locationCoordinates: [ Number ] (contains comma-separated longitude & latitude)
  * role: [ String ] (contains 'Prospective Homebuyer' and/or 'Neighborhood Ambassador')

__Third Party APIs__

Ambassador integrates with third party APIs for the following purposes:
Mapbox: To display an interactive map with markers & popovers
Google Maps: To obtain longitudinal / latitudinal coordinates associated with a physical address

__Routes - Frontend__

|Path|Component|Description
|--|--|--|
|/|Home|Display landing page if user is not logged in, otherwise display interactive map (MapWidget component) at user's custom location
|/login|Login|Render login screen & handle login functionality
|/profile|Profile|Render user profile screen, or if user is not logged in, prompt to sign up or login
|/ambassador-registration|AmbassadorRegistration|Render homebuyer signup screen & handle registration functionality
|/homebuyer-registration|HomebuyerRegistration|Render ambassador signup screen & handle registration functionality

__Routes - Backend__
|URL|Method|Purpose
|--|--|--|
|/auth/login|POST|Handle user login functionality and return JSON web token (JWT)
|/auth/signup|POST|Create user in database, then log them in
|/auth/me/from/token|POST|
|/user|GET|Get all users from database
|/user|POST|
|/user/:id|GET|Get specific user by ID from database
|/user/:id|PUT|Update prospective homebuyer user's target city, state, & location coordinates in the database
|/ambassadors|GET|Get all users from database whose role is 'Neighborhood Ambassador'

## Tools & Technologies
* HTML5, CSS
* React.js
* MongoDB
* Token-based user authentication using bcrypt
* Front-end npm modules: axios, dotenv, react, react-dom, react-mapbox-gl, react-router-dom, react-scripts
* Back-end npm modules: bcrypt, body-parser, cors, dotenv, express, express-jwt, jsonwebtoken, mongoose, morgan, nodemon, path, react-router-dom
* [Bootstrap 4](https://getbootstrap.com/ "Bootstrap")
* [FontAwesome](https://fontawesome.com/ "FontAwesome")
* [Roboto Google Font](https://fonts.google.com/specimen/Roboto "Roboto Google Font")
* Github
* Heroku
* Trello

## Screenshots

#### App landing page
<img width="495" alt="ambassador_screenshot_landingpage" src="https://user-images.githubusercontent.com/5596001/40393686-5540c2a8-5dd5-11e8-925b-7c0b0bfba275.png">

#### Signup as Prospective Homebuyer
<img width="495" alt="ambassador_screenshot_registration_homebuyer" src="https://user-images.githubusercontent.com/5596001/40393692-55b98986-5dd5-11e8-9788-d6e22e59bad8.png">

#### Signup as Neighborhood Ambassador
<img width="495" alt="ambassador_screenshot_registration_ambassador" src="https://user-images.githubusercontent.com/5596001/40393691-55a466fa-5dd5-11e8-9cea-9f5ca0e0b1bc.png">

#### Login
<img width="495" alt="ambassador_screenshot_login" src="https://user-images.githubusercontent.com/5596001/40393687-5560cb84-5dd5-11e8-9ec5-9e296c447975.png">

#### Dashboard - Prospective Homebuyer
<img width="495" alt="ambassador_screenshot_dashboard_homebuyer" src="https://user-images.githubusercontent.com/5596001/40393685-552e4d30-5dd5-11e8-9dde-f78dc8bd8bda.png">

#### Dashboard - Prospective Homebuyer (with Popup)
<img width="495" alt="ambassador_screenshot_dashboard_ambassador_withpopup" src="https://user-images.githubusercontent.com/5596001/40393684-5517909a-5dd5-11e8-9269-c7c0ceafd377.png">

#### Dashboard - Neighborhood Ambassador
<img width="495" alt="ambassador_screenshot_dashboard_ambassador" src="https://user-images.githubusercontent.com/5596001/40393683-55050a42-5dd5-11e8-98eb-039ae8025cc1.png">

#### Profile - Prospective Homebuyer
<img width="495" alt="ambassador_screenshot_profile_homebuyer" src="https://user-images.githubusercontent.com/5596001/40393690-558bf99e-5dd5-11e8-9add-3816717bb7f6.png">

#### Profile - Neighborhood Ambassador
<img width="495" alt="ambassador_screenshot_profile_ambassador" src="https://user-images.githubusercontent.com/5596001/40393689-55771d3a-5dd5-11e8-87a0-15107e479287.png">

## If I had more time...
I would implement the following additional features:
* Messaging between homebuyers and ambassadors.
* Add overview of ambassador rewards program, and ability to track behavior.
* Handle case where a user could be both an ambassador and a homebuyer.
