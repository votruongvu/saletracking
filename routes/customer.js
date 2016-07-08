/**
 * Created by vuvot on 5/30/2016.
 * Customer Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express, customerService) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        customerService.getAllCustomers().then(function (customers) {
            res.status(200).json(customers || []);
        }, function (err) {
            res.status(500).json(err);
        });
    });

    router.get("/:name", function (req, res) {
        var customerName = req.params.name;
        customerService.getCustomerByName(customerName).then(function (customer) {
            if (customer) {
                res.status(200).json(customer || []);
            } else {
                res.status(404).json({message: "Customer not found"});
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });

    return router;
};


