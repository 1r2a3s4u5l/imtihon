export default {
  path: "/:catchAll(.*)",
  name: "Not Found",
  component: () => {
    return import("../components/pages/404.vue");
  },
};
