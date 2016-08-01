module.exports = function () {
    "use strict";

    var express = require("express");
    var app = express();
    var serveStatic = require("serve-static");
    var path = require("path");
    var logger = require("morgan");
    var cookieParser = require("cookie-parser");
    var bodyParser = require("body-parser");
    var Q = require("q");

    var routes = require(path.join(__dirname, ".", "routes", "index"))(express);

    var models = require(path.join(__dirname, ".", "models"))();
    app.models = models;

    var orderService = require(path.join(__dirname, ".","services","order"))(models, Q);
    var userService = require(path.join(__dirname, ".","services","user"))(models, Q);
    var userLocationService = require(path.join(__dirname, ".","services","userlocation"))(models, Q);
    var groupService = require(path.join(__dirname, ".","services","group"))(models, Q);
    var customerService = require(path.join(__dirname, ".","services","customer"))(models, Q);
    var itemDictService = require(path.join(__dirname, ".","services","itemdict"))(models, Q);

    var orderRoute = require(path.join(__dirname, ".", "routes","order"))(express, orderService);
    var userRoute = require(path.join(__dirname, ".", "routes","user"))(express, userService);
    var userLocationRoute = require(path.join(__dirname, ".", "routes","userlocation"))(express, userLocationService);
    var groupRoute = require(path.join(__dirname, ".", "routes","group"))(express, groupService);
    var customerRoute = require(path.join(__dirname, ".", "routes","customer"))(express, customerService);
    var itemDictRoute = require(path.join(__dirname, ".", "routes","itemdict"))(express, itemDictService);

    var env = process.env.NODE_ENV || "development";
    var config = require(path.join(__dirname, "config", "config.json"))[env];

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "jade");

    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    // init routes
    app.use("/", serveStatic(path.join(__dirname, "public"), {"index": ["index.html"]}));
    app.use("/api-docs-ui", serveStatic(path.join(__dirname, "swaggerui"), {"index": ["index.html"]}));

    app.use("/", routes);
    app.use(config.apiUrl  + "/order", orderRoute);
    app.use(config.apiUrl  + "/user", userRoute);
    app.use(config.apiUrl  + "/userlocation", userLocationRoute)
    app.use(config.apiUrl  + "/group", groupRoute);
    app.use(config.apiUrl  + "/customer", customerRoute);
    app.use(config.apiUrl  + "/itemdict", itemDictRoute);

    return app;
};

