/**
 * Created by vuvot on 5/30/2016.
 * Item Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, itemDictService) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        itemDictService.getAllItems().then(function (items) {
            res.status(200).json(items || []);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/:name", function (req, res) {
        var itemName = req.params.name;
        itemDictService.getItemByName(itemName).then(function (item) {
            if (item) {
                res.status(200).json(item || []);
            } else {
                res.status(404).json({message: "Item not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/price/:id", function (req, res) {
        var itemId = req.params.id;
        itemDictService.getLastItemPriceById(itemId).then(function (itemPrice) {
            if (itemPrice) {
                res.status(200).json(itemPrice || []);
            } else {
                res.status(404).json({message: "Item not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


