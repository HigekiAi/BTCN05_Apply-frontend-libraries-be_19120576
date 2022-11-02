const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const app = express();
const port = 3600;

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", async (req, res) => {
  const users = await User.find();
  if (users.length > 0) res.send(users);
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ username: username });
    if (user) {
      res.send({ result: "" });
    } else {
      let newuser = new User(req.body);
      let result = await newuser.save();
      res.send(result);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
