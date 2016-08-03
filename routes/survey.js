/**
 * Created by vuvot on 5/30/2016.
 * Root index for Item APIs page
 */
module.exports = function (express) {
    "use strict";

    var router = express.Router();
    var fs = require('fs-extra');       //File System - for file manipulation
    var path = require("path");

    router.post("/imageupload", function (req, res, next) {
        var fstream;
        var files = 0, finished = false;
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            ++files;
            //Path where image will be uploaded
            fstream = fs.createWriteStream(path.join(__dirname, "..","uploads",filename));
            fstream.on('finish', function() {
                if (--files === 0 && finished) {
                    res.writeHead(200, {'Connection': 'close'});
                    res.end("");
                }
            });
            file.pipe(fstream);
        });
        req.busboy.on('finish', function() {
            finished = true;
        });
        return req.pipe(req.busboy);
    });

    return router;
};
