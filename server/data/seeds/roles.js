
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, name: "admin", makePosts: true, makeThreads: true, makeCategories: true, makeForums: true, makeSubForums: true, makeRoles: true, deleteSubForums: true, deletePosts: true, deleteThreads: true, deleteForums: true, deleteCategories: true, editRoles: true, deleteRoles: true, editUserRoles: true, canBanUser: true, canWarnUser: true, canReport: true, isBannable: false},
        {id: 2, name: "mod", makePosts: true, makeThreads: true, makeCategories: false, makeForums: true, makeSubForums: true, makeRoles: false, deleteSubForums: true, deletePosts: true, deleteThreads: true, deleteForums: true, deleteCategories: false, editRoles: false, deleteRoles: false, editUserRoles: true, canBanUser: true, canWarnUser: true, canReport: true, isBannable: true},
        {id: 3, name: "member", makePosts: true, makeThreads: true, makeCategories: false, makeForums: false, makeSubForums: false, makeRoles: false, deleteSubForums: false, deletePosts: false, deleteThreads: false, deleteForums: false, deleteCategories: false, editRoles: false, deleteRoles: false, editUserRoles: false, canBanUser: false, canWarnUser: false, canReport: true, isBannable: true},
        {id: 4, name: "banned", makePosts: false, makeThreads: false, makeCategories: false, makeForums: false, makeSubForums: false, makeRoles: false, deleteSubForums: false, deletePosts: false, deleteThreads: false, deleteForums: false, deleteCategories: false, editRoles: false, deleteRoles: false, editUserRoles: false, canBanUser: false, canWarnUser: false, canReport: false, isBannable: true}
      ]);
    });
};
