const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");
const authenticate = require("../middleware/authenticate")
const users = require("../../data/Models/users");

router.post("/register", (req, res) => {
  let user = req.body;
  console.log(user)
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  users.findBy({ username }).then(user => {
    users.findUserAndRoles(user.id).then(loggingInUser => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(loggingInUser);
        res.status(200).json({
          id: user.id,
          message: `Welcome back ${user.username}!`,
          token
        });
        } else {
           res.status(401).json({ message: "Invalid Credentials." })
        }
    })  
  })
})

router.put('/update/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const changes = {
        ...req.body
    }
    users.updateUser(id, changes).then(updates => {
        res.status(200).json(updates)
    }).catch(err => res.status(400).json(err))
})

router.delete('/delete/:id', authenticate, (req, res) => {
  const { id } = req.params
  const { roles, username } = req.jwtToken
  if(roles.includes('admin') || username == users.findUserById(id).username) {
    users.deleteUser(id).then(deleted => {
      res.status(204).json("user deleted!")
    }).catch(err => res.status(400).json(err))
  } else {
    res.status(200).json("You cannot delete this account.")
  }
})

router.put('/ban/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { roles } = req.jwtToken;
  const banningUser = await users.getPermissions(roles[0])
  const userBeingBanned = await users.findUserAndRoles(id)
  const bannedUserPerms = await users.getPermissions(userBeingBanned.roles[0])

  if(banningUser.canBanUser && bannedUserPerms.isBannable) {
        users.banUser(id).then(banned => {
          res.status(200).json(banned)
        })
      } else {
        res.status(403).json("You do not have permission to perform this action.")
      }
})


module.exports = router;