//jshint esversion:6
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const path = require("path");
const { router: chatRouter, initSocketIO } = require("./chat");
const server = require("http").createServer(app);
initSocketIO(server);

const authController = require("./controllers/authController");

//authMiddleware if need to secure a route from guests
const requireLogin = require("./middleware/authMiddleware");
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  express.static(path.join(__dirname, "../Frontend/MessengerApp/index.html"))
);

// Use the session middleware to store user login information
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

//Home Blog Site route
app.get("/", function (req, res) {
  const user = req.session.username;
  // check if the user object exists before accessing its properties
  if (user) {
    const username = user;
  } else {
    // handle the case when the user object is undefined or has no username property
    res.redirect("/login");
  }
});

//auth routes
app.post("/login", authController.login);

// Add a route to handle user logout
app.get("/logout", authController.logout);

//user registration routes
app.post("/register", authController.register);

//chat routes -socket.io-
app.use("/chat", chatRouter);

// Handle all other paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/MessengerApp/index.html"));
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("404: Page not found");
});

server.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
