export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/superadmin/Superadmin.vue");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("../views/superadmin/Users.vue");
      },
    },
  ],
};
