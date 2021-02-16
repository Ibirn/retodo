//maybe we set these to booleans
const checkAuth = async (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect("/login");
};

const checkNotAuth = (request, response, next) => {
  if (request.isAuthenticated()) {
    return response.redirect("/login");
  }
  next();
};

module.exports = { checkAuth, checkNotAuth };
