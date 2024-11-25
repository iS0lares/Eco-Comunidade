export default defineNuxtRouteMiddleware((to, from) => {
  const noAuthRouters = [
    "About",
    "Contact",
    "Home",
    "Map",
    "Volunteer",
    "Login",
  ];

  if (!noAuthRouters.includes(to.name)) {
    return abortNavigation();
  }
});
