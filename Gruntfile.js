/**
 * Created by vuvot on 6/7/2016.
 */
module.exports = function (grunt) {
  "use strict";

  var fs = require("fs");
  var path = require("path");

  grunt.loadNpmTasks("grunt-contrib-jshint");

  var SwaggerParser = require("swagger-parser");

  grunt.initConfig({
    jshint: {
      files: ["app.js", "bin/www.js", "routes/*.js", "models/*.js", "services/*.js", "test/*.js", "Gruntfile.js"],
      options: {
        jshintrc: true
      }
    }
  });

  grunt.registerTask("buildSwaggerJson", "Build Swagger Json", function () {
    var done = this.async();
    var swaggerFileName = path.join(__dirname, "swagger", "index.json");
    var outputFilename =path.join( __dirname,"swaggerui","swagger.json");

    SwaggerParser.validate(swaggerFileName, {
      $refs: {
        internal : false
      }
    })
      .then(function (api) {
        grunt.log.write("API name: %s, Version: %s", api.info.title, api.info.version);
        fs.writeFile(outputFilename, JSON.stringify(api, null, 4), function(err) {
          if(err) {
            grunt.log.write.error(err);
            done(false);
          } else {
            grunt.log.write("JSON saved to " + outputFilename);
            done();
          }
        });
      })
      .catch(function (err) {
        grunt.log.write.error(err);
        done(false);
      });
  });

  grunt.registerTask("default", ["jshint", "buildSwaggerJson"]);

};
