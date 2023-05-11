exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // check if the user already exists
    User.findOne({ username: username }).then((user) => {
      if (user) {
        // returns json user already exists
        res.json({ error: "User already exists" });
      } else {
        // create a new user
        const newUser = new User({
          username: username,
          password: password,
        });
        newUser.save().then((user) => {
          req.session.username = user.username;
        });
        res.json({ success: true });
      }
    });
  } else {
    res.json({ error: "Missing username or password" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.username = username;
  }
  res.json({ success: true });
};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
};
