/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var itemDictService = {};

    itemDictService.getAllItems = function () {
        var deferred = Q.defer();
        models.itemdict.findAll(

        ).then(function (items) {
            //process the data which is fetch from db
            deferred.resolve(items);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    itemDictService.getItemByName = function (partialName) {
        var deferred = Q.defer();
        models.itemdict.findAll({
          where: {
              name: {
                  $like: partialName + "%"
              }
          }
        }).then(function (item) {
            //process the data which is fetch from db
            deferred.resolve(item);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };
    
    return itemDictService;
};