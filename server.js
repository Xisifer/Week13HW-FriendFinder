// Dependencies
// =========================================================
const express = require("express");
const path = require("path");
const friends = require("./app/data/friends.js")


// For serving of static CSS
app.use(express.static(__dirname + "/app/css"));

// API and HTML routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars friends (DATA)
// =============================================================
var friendlist = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(request, response) {
    response.sendFile(path.join(__dirname, "add.html"));
});

// Displays all friends
app.get("/api/friends", function(request, response) {
  return response.json(friends);
});

// Displays a single friend, or returns false
app.get("/api/friends/:friend", function(request, response) {
  var chosen = request.params.friend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return response.json(friends[i]);
    }
  }

  return response.json(false);
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
