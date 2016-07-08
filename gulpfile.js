var gulp = require("gulp");
var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var DeepMerge = require("deep-merge");
var nodemon = require("nodemon");

var deepmerge = DeepMerge(function(target, source, key) {
    if(target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
});

// generic

var defaultConfig = {
    module:{
        loaders:
            [{
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }]
    }
};

if(process.env.NODE_ENV !== "production") {
    //defaultConfig.devtool = "#eval-source-map";
    defaultConfig.debug = true;
}

function config(overrides) {
    return deepmerge(defaultConfig, overrides || {});
}

// frontend

var frontendConfig = config({
    entry: path.join(__dirname,"clientsrc","App.js"),
    output: {
        path: path.join(__dirname, "public", "js"),
        filename: "app.js"
    }
});

// backend

var nodeModules = {};
fs.readdirSync("node_modules")
    .filter(function(x) {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = "commonjs " + mod;
    });

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log("Error", err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}

gulp.task("frontend-build", function(done) {
    webpack(frontendConfig).run(onBuild(done));
});

gulp.task("frontend-watch", function() {
    webpack(frontendConfig).watch(100, onBuild());
});

gulp.task("build", ["frontend-build"]);
gulp.task("watch", ["frontend-watch"]);
