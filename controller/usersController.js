const User = require("../models/user");
const passport = require("passport")

// define the mongoose methods for the userController to get the information required for each specific part.
module.exports = {
    findAll: function (req, res) {
        User
            .find(req.query)
            .sort({ wins: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllbyScheduled: function (req, res) {
        User
            .find(req.query)
            .sort({ scheduled: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByName: function (req, res) {
        User
            .findOne({username: req.params.username})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // create function for users signing up.
    create: function (req, res, next) {
        // console.log('user signup');
        // console.log("req.body before signup" + JSON.stringify(req.body))
        User.register(new User({
            username: req.body.username,
            name: req.body.name,
            role: req.body.role
        }), req.body.password, (err, user) => {
            if (err) {
                // send back error message and log it
                res.send(err);
                console.log(err)
            } 
            else {
                passport.authenticate('local')(req, res, () => {
                    req.session.save((err) => {
                        if (err) {
                            return next(err);
                        }

                        res.status(200).send(req.body);
                    });
                });

            };
        });
    },

    signin: function (req, res, next) {
        // console.log("/signin controller req = " + JSON.stringify(req.body));
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(req.body);
        });
    },


    update: function (req, res) {
        User
            .findOneAndUpdate({username: req.params.username }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // not going to be used yet, but here for later
    remove: function (req, res) {
        User
            .findById({ username: req.params.username })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
}