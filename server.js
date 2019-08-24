// Dependencies
// =========================================================
const express = require("express");
const path = require("path");
const friends = require("./app/data/friends.js")

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// API and HTML routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);





// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());








// Routes
// =============================================================

// Displays all friends
app.get("/api/friends", function(request, response) {
  return response.json(friends);
});



// Create New friends - takes in JSON input
app.post("/api/friends", function(request, response) {
  // request.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newFriend = request.body;

  // Using a RegEx Pattern to remove spaces from newfriend
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  friends.push(newFriend);

  response.json(newFriend);
});

// Starts the server to begin listening
// =============================================================


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
