/**
 * Updated by vuvot on 5/30/2016.
 */
module.exports = function () {
    "use strict";

    var db = {};

    var fs = require("fs");
    var path = require("path");
    var Sequelize = require("sequelize");
    var env = process.env.NODE_ENV || "development";
    var config = require(path.join(__dirname, "..", "config", "config.json"))[env];

    // connect to database using config which is defined in config.json for specified env
    var sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    // read all js file which define sequelize model in models folder and import into db object
    fs.readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    db["itemdict"].hasMany(db["itemprice"]);

    db["item"].belongsTo(db["itemdict"]);
    db["item"].belongsTo(db["itemprice"]);

    db["group"].belongsToMany(db["user"], {through: "usergroup"});
    db["user"].belongsToMany(db["group"], {through: "usergroup"});

    db["order"].hasOne(db["location"],{as: "location"});
    db["order"].hasMany(db["item"], {as: "items"});
    db["order"].belongsTo(db["user"]);
    db["order"].belongsTo(db["customer"]);





    //assign to db as property for later use
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
