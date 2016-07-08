/**
 * Created by vuvot on 5/30/2016.
 * User Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, userService) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        userService.getAllUsers().then(function (users) {
            res.status(200).json(users || []);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/:id", function (req, res) {
        var userId = req.params.id;
        userService.getUserById(userId).then(function (user) {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/", function (req, res) {
        var newJsonUSer = req.body;
        userService.addUser(newJsonUSer).then(function (newUser) {
            res.status(200).json(newUser);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/addusertogroup/:userid/:groupid", function (req, res) {
        var userId = req.params.userid;
        var groupId = req.params.groupid;
        userService.addUserToGroup(userId, groupId).then(function (result) {
            res.status(200).json(result);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/removeusertogroup/:userid/:groupid", function (req, res) {
        var userId = req.params.userid;
        var groupId = req.params.groupid;
        userService.removeUserToGroup(userId, groupId).then(function (result) {
            res.status(200).json(result);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.put("/:id", function (req, res) {
        var userId = req.params.id;
        var updateJsonUser = req.body;
        userService.editUser(userId, updateJsonUser).then(function (updatedUser) {
            res.status(200).json(updatedUser);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.delete("/:id", function (req, res) {
        var userId = req.params.id;
        userService.deleteUser(userId).then(function (result) {
            res.status(200).json(result);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


