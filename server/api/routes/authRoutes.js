const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");
const authenticate = require("../middleware/authenticate")
const users = require("../../data/Models/users");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  users
    .add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({...saved, token});
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
});

router.put('/update/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const changes = {
        ...req.body
    }
    users.updateUser(id, changes).then(updates => {
        res.status(200).json(updates)
    }).catch(err => res.status(400).json(err))
})

module.exports = router;