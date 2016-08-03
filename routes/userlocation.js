/**
 * Created by vuvot on 5/30/2016.
 * User Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, userLocationService) {
    "use strict";

    var router = express.Router();

    router.get("/:id", function (req, res) {
        var userId = req.params.id;
        userLocationService.getUserLocationByUserId(userId).then(function (userlocations) {
            if (userlocations) {
                res.status(200).json(userlocations);
            } else {
                res.status(404).json({message: "User not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/", function (req, res) {
        var newJsonUserLocation = req.body;
        userLocationService.addUserLocation(newJsonUserLocation).then(function (newUserLocation) {
            res.status(200).json(newUserLocation);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/bulk/", function (req, res) {
        var newJsonUserLocations = req.body;
        userLocationService.addUserLocations(newJsonUserLocations).then(function () {
            res.status(200).json([]);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


