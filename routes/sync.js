/**
 * Created by vuvot on 5/30/2016.
 * Order Routes : GET ALL ITEMS, GET ITEM BY ID, POST AS ADD NEW ITEM, PUT BY ID AS EDIT ITEM, DELETE ITEM BY ID
 */
module.exports = function (express) {
    "use strict";

    var router = express.Router();

    router.post("/", function (req, res) {
        var newJsonOrder = req.body;
        res.status(200).json(newJsonOrder);
    });

    return router;
};


