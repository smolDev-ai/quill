const router = require("express").Router();
const Users = require("../data/Models/users");

router.get('/', (req, res) => {
    Users.getAllUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => res.status(500).json(err))
})

module.exports = router;