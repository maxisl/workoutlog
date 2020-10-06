const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");

exports.user_create_user = (req, res, next) => {
    User.find({
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: "Mail already exists"
                });
            } else {
                /*use salt = 10 so the password can't be translated with a dictionary table*/
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created",
                                    email: result.email
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        /* user is an array with only one entry (see user signup route)*/
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            /* duration in which the token will expire*/
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_get_all = (req, res, next) => {
    User.find()
        .select("email")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        name: doc.email,
                        _id: doc._id,
                        /*request: {
                            type: "GET",
                            url: "http://localhost:3000/user/" + doc._id
                        }*/
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select("email")
        .exec()
        .then(doc => {
            User.remove({_id: req.params.userId})
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "User deleted successfully",
                        user: doc
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
}

