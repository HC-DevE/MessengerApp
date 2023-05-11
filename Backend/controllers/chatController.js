exports.getRoom = async (req, res) => {
  const { username, room } = req.query;
  if (!username || !room) {
    return res.status(400).json({ error: "Missing username or room" });
  }
  res.json({ username, room, messages });
};

exports.postRoom = async (req, res) => {
  const { username, room } = req.body;
    res.json({ username, room, messages });
};
