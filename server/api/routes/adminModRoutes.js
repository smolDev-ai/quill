const router = require("express").Router();
const users = require("../../data/Models/users");
const authenticate = require("../middleware/authenticate")


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

router.post('/roles', authenticate, async (req, res) => {
    const { roles } = req.jwtToken;
    let requestUser = await users.getPermissions(roles[0])
    
    const role = {
        ...req.body
    }
    if(requestUser.createRole) {
        users.createRole(role).then(newRole => {
            res.status(200).json({message: `Role ${newRole.name} successfully created.`, Role: newRole })
        }).catch(err => {
            console.log(err)
            res.status(500).json(err) })
    } else {
        res.status(403).json("You do not have permission to perform this action.")
    }
})

module.exports = router;