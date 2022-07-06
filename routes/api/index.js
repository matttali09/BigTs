const router = require("express").Router();
const userRoutes = require("./users");
// const emailRoutes = require("./emailAPI");

// User route
router.use("/users", userRoutes);
// email route
// router.use("/emailAPI", emailRoutes);

module.exports = router;