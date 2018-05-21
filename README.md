
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

Ambassador's data model includes a User schema:
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
Mapbox: Interactive map with markers & popovers
Google Maps: Provide longitude / latitude coordinates from a physical address

## Tools & Technologies
* HTML, CSS
* React.js
* MongoDB
* Token-based user authentication using bcrypt
* Front-end npm modules: axios, dotenv, react, react-dom, react-mapbox-gl, react-router-dom, react-scripts
* Back-end npm modules: bcrypt, body-parser, cors, dotenv, express, express-jwt, jsonwebtoken, mongoose, morgan, nodemon, path, react-router-dom
* [Bootstrap 4](https://getbootstrap.com/ "Bootstrap"): nav, grid, buttons, button groups, popovers, modals
* [FontAwesome](https://fontawesome.com/ "FontAwesome")
* [Roboto Google Font](https://fonts.google.com/specimen/Roboto "Roboto Google Font")
* Github
* Heroku
* Trello

## If I had more time...
I would implement the following additional features:
* Messaging between homebuyers and ambassadors.
* Add overview of ambassador rewards program, and ability to track behavior.
* Handle use case where a user could be both an ambassador and a homebuyer.
