/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var userLocationService = {};

    userLocationService.getUserLocationByUserId = function (userId) {
        var deferred = Q.defer();
        models.userlocation.findAll({
            where: {
                userId: {
                    $eq: userId
                }
            }
        }).then(function (userlocations) {
            //process the data which is fetch from db
            deferred.resolve(userlocations);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    userLocationService.addUserLocation = function(newUserLocation){
        var deferred = Q.defer();
        var canAdd = true;
        if(canAdd){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.userlocation.create(newUserLocation, {transaction: t});
            }).then(function (result) {
                deferred.resolve(result);
            }).catch(function (err) {
                deferred.reject(err.message);
            });
        }else{
            deferred.reject({message : "All fields are required and in json format when uploading. Please make sure post data in application/json format"});
        }
        return deferred.promise;
    };

    return userLocationService;
};