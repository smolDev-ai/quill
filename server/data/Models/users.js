const db = require("../dbConfig");

module.exports = {
    getAllUsers,
    findUserById,
    findBy,
    findUserAndRoles,
    add,
    updateUser,
    deleteUser,
    findRoleById,
    createRole,
    // editRole,
    // deleteRole,
    editUserRoles,
    banUser,
    getPermissions

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

function findBy(filter) {
  return db("users").where(filter).first()
}

function getAllUsers() {
    return db("users").join("roles_users as ur", "users.id", "=", "ur.user_id")
        .join("roles as r", "ur.role_id", "=", "r.id")
        .select("users.id", "users.username", "users.title", "users.email", db.raw(`array_agg(r.name) as roles`))
        .groupBy("users.id", "users.username", "users.title", "users.email")
}

function findUserById(id) {
    return db("users").select("id", "username", "title", "email").where({ "id": id }).first()
} 


async function add(user) {
    const { roles } = user;
    delete user.roles
    let id;
    try {
        const ids = await db("users").insert(user, "id")
        id = ids[0];
        const found = await findUserById(id)
        if(roles.length > 1) {
            await Promise.all(roles.map(async userRole => {
                const role = await db("roles").where({"name": userRole}).first()
                await db("roles_users").insert({ "user_id": found.id, "role_id": role.id })
            
            }))
        } else {
            const role = await db("roles").where({"name": roles[0].name}).first()
            await db("roles_users").insert({ "user_id": found.id, "role_id": role.id })
        }

        return findUserAndRoles(id);
    } catch(err) {
        console.log(err)
        return err;
    }

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

function deleteUser(id) {
    return db("users").where({ id }).first().delete()
}

function editUserRoles(id, changes) {
    let roleChanges = {
        ...changes.roles
    }
    console.log(roleChanges)
    return db("roles_users").where({ "user_id": id }).update(roleChanges)
}

async function banUser(id) {
    await db("roles_users").where({"user_id": id}).delete()
    let banned = await db("roles_users").insert({ "user_id": id, "role_id": 4 })

    if(banned) {
        let bannedUser = await db("users").where({ "id": id }).update({"title": "banned"})
        return findUserAndRoles(id)
    }


}

function getPermissions(roleName) {
    return db("roles").where({"name": roleName}).select("*").first()
}