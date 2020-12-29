const db = require("../dbConfig");

module.exports = {
    getAllUsers,
    add,
}

function getAllUsers() {
    return db("users").select("id", "username");
}


function add(user) {
    return db("user").insert(user, "id").then(ids => {
        const [id] = ids;
        return findById(id);
    })
}