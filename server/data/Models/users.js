const db = require("../dbConfig");

module.exports = {
    findById,
    add,
}

function findById(id) {
    return db("users").select("id", "username").where({ id })
}


function add(user) {
    return db("user").insert(user, "id").then(ids => {
        const [id] = ids;
        return findById(id);
    })
}