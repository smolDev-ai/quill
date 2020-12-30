const db = require("../dbConfig");

module.exports = {
    getAllUsers,
    findById,
    add,
    updateUser,
    // deleteUser,
    createRole,
    // editRole,
    // deleteRole,

}

function getAllUsers() {
    return db("users").select("id", "username");
}

function findById(id) {
    return db("users").select("id", "username", "title", "email").where({ "id": id }).first()
}

function add(user) {
    const { role } = user;
    delete user.role
    return db("users").insert(user, "id").then(ids => {
        const [id] = ids;
        return findById(id).then(found => {
            return db("roles").where({"name": role}).first().then(role => {
                return db("roles_users").insert({ "user_id": found.id, "role_id": role.id }).then(FullUser => {
                    return db("users").where({ "users.id": found.id }).join("roles_users as ur", "users.id", "=", "ur.user_id").join("roles as r", "ur.role_id", "=", "r.id").select("users.id", "users.username", "users.title", "users.email", db.raw(`json_agg(r.name) as roles`)).groupBy("users.id", "users.username", "users.title", "users.email").first()
                })
            })
        })
    })
}

async function updateUser(id, changes) {
    const updates = await db("users").where({"id": id}).update(changes)
    return findById(updates)
}


function createRole(role) {
    return db("roles").insert(role, "id").then(ids => {
        const [id] = ids;
        return db("roles").select("name").where({"id": id}).first()
    })
}