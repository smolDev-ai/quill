const router = require("express").Router();
const Users = require("../../data/Models/users");

router.get('/', (req, res) => {
    Users.getAllUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.post('/roles', (req, res) => {
    const role = {
        ...req.body
    }
    Users.createRole(role).then(newRole => {
        res.status(200).json(`Role ${newRole.name} successfully created.`)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err) })
})

module.exports = router;