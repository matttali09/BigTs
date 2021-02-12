const router = require("express").Router();
const usersController = require("../../controller/usersController");
const passport = require("passport");

// Matches with "/api/users" this is for all users in database by descending wins or highscores
router.route("/")
    .get(usersController.findAll)
router.route("/scheduled")
    .get(usersController.findAllbyScheduled)


// Matches with "/api/users/current" check route for current user 
router.get('/current', (req, res, next) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

// Matches with "/api/users/signup" send info, check database for valid unique user, send back userinfo to react app.js
router.post('/signup', (usersController.create));


// Matches with "api/users/signin" signin route
router.post('/signin', passport.authenticate('local'), (usersController.signin));

// matches with "api/users/logout" used for current user only in session
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
});

// Matches with "/api/users/:username"
router.route("/:username")
    .get(usersController.findByName)
    .put(usersController.update)
    .delete(usersController.remove);

module.exports = router;