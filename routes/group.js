/**
 * Created by vuvot on 5/30/2016.
 * Group Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, groupService) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        groupService.getAllGroups().then(function (groups) {
            res.status(200).json(groups || []);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/:id", function (req, res) {
        var groupId = req.params.id;
        groupService.getGroupById(groupId).then(function (group) {
            if (group) {
                res.status(200).json(group);
            } else {
                res.status(404).json({message: "Group not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/", function (req, res) {
        var newJsonGroup = req.body;
        groupService.addGroup(newJsonGroup).then(function (newGroup) {
            res.status(200).json(newGroup);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.put("/:id", function (req, res) {
        var groupId = req.params.id;
        var updateJsonGroup = req.body;
        groupService.editGroup(groupId, updateJsonGroup).then(function (updatedGroup) {
            res.status(200).json(updatedGroup);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.delete("/:id", function (req, res) {
        var groupId = req.params.id;
        groupService.deleteGroup(groupId).then(function (result) {
            res.status(200).json(result);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


