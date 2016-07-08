/**
 * Created by vuvot on 5/30/2016.
 * Order Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, orderService) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        orderService.getAllOrders().then(function (items) {
            res.status(200).json(items || []);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/:id", function (req, res) {
        var orderId = req.params.id;
        orderService.getOrderById(orderId).then(function (item) {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({message: "Order not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.post("/", function (req, res) {
        var newJsonOrder = req.body;
        orderService.addOrder(newJsonOrder).then(function (newOrder) {
            res.status(200).json(newOrder);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.put("/:id", function (req, res) {
        var orderId = req.params.id;
        var updateJsonOrder = req.body;
        orderService.editOrder(orderId, updateJsonOrder).then(function (updatedOrder) {
            res.status(200).json(updatedOrder);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.delete("/:id", function (req, res) {
        var orderId = req.params.id;
        orderService.deleteOrder(orderId).then(function (result) {
            res.status(200).json(result);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


