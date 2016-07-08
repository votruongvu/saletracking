/**
 * Created by vuvot on 5/30/2016.
 * Root index for Item APIs page
 */
module.exports = function (express) {
    "use strict";

    var router = express.Router();

    router.get("/", function (req, res) {
        res.render("index", {title: "Purchase Item APIs"});
    });

    return router;
};
