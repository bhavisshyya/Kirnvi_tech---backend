const { createUserProfile, getUserInfo } = require("../controller/UserProfile");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/", createUserProfile);
router.get("/info", verifyToken, getUserInfo);

module.exports = router;
