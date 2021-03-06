const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

/* create a new user*/
router.post("/signup", UserController.user_create_user);

router.post("/login", UserController.user_login);

/* get all users*/
router.get("/", UserController.user_get_all);

router.delete("/:userId", checkAuth, UserController.user_delete_user);

module.exports = router;