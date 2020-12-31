const db = require("../dbConfig");

module.exports = {
    getAllUsers,
    findUserById,
    findUserAndRoles,
    add,
    updateUser,
    // deleteUser,
    findRoleById,
    createRole,
    // editRole,
    // deleteRole,

}

function getAllUsers() {
    return db("users").select("id", "username");
}

function findUserById(id) {
    return db("users").select("id", "username", "title", "email").where({ "id": id }).first()
} 

function findUserAndRoles(user_id) {
    return db("users")
        .where({ "users.id": user_id })
        .join("roles_users as ur", "users.id", "=", "ur.user_id")
        .join("roles as r", "ur.role_id", "=", "r.id")
        .select("users.id", "users.username", "users.title", "users.email", db.raw(`array_agg(r.name) as roles`))
        .groupBy("users.id", "users.username", "users.title", "users.email")
        .first()
}

async function add(user) {
    const { roles } = user;
    delete user.roles
    let id;
    return db("users").insert(user, "id").then(ids => {
        id = ids[0];
        console.log("line 41", id)
        return findUserById(id).then(found => {
            if(roles.length > 1) {
                return Promise.all(roles.map(userRole => {
                    return db("roles").where({"name": userRole}).first().then(role => {
                        return db("roles_users").insert({ "user_id": found.id, "role_id": role.id })
                    })
                }))
            } else {
                return db("roles").where({"name": roles[0]}).first().then(role => {
                    return db("roles_users").insert({ "user_id": found.id, "role_id": role.id })
                })
            }
        }).then(res => {
            console.log(res)
            return findUserAndRoles(id)
        })
    })
}

async function updateUser(id, changes) {
    const updates = await db("users").where({"id": id}).update(changes)
    return findUserById(updates)
}

function findRoleById(id) {
    return db("roles").select("*").where({"id": id}).first()
}

function createRole(role) {
    return db("roles").insert(role, "id").then(ids => {
        const [id] = ids;
        return findRoleById(id)
    })
}