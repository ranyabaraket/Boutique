const router = require("express").Router();

const { userRegister, userLogin,userAuth, authen } = require("../../utilis/auth");
const User = require("../../models/user");
// Users Registeration Route
router.post("/register-user",async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});


// Profile Route
router.get("/profile", authen, (req, res) => {
  User.findById(req.userid)
    .select("-password")
    .then((user) => res.json(user));
});



module.exports = router;
