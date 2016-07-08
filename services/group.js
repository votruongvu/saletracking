/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var groupService = {};

    groupService.getAllGroups = function () {
        var deferred = Q.defer();
        models.group.findAll(
            {include: [{model: models.user, as: "users"}]}
        ).then(function (groups) {
            //process the data which is fetch from db
            deferred.resolve(groups);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    groupService.getGroupById = function (id) {
        var deferred = Q.defer();
        models.group.findById(id,{
            include: [{model: models.user, as: "users"}]
        }).then(function (group) {
            //process the data which is fetch from db
            deferred.resolve(group);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    groupService.addGroup = function(newGroup){
        var deferred = Q.defer();
        var canAdd = true;
        if(canAdd){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.group.create(newGroup, {transaction: t});
            }).then(function (result) {
                deferred.resolve(result);
            }).catch(function (err) {
                deferred.reject(err.message);
            });
        }else{
            deferred.reject({message : "All fields are required and in json format when uploading. Please make sure post data in application/json format"});
        }
        return deferred.promise;
    }

    groupService.editGroup = function (id, updateGroup) {
        var deferred = Q.defer();
        var canEdit =  true;
        if(canEdit){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.group.findById(id).then(function (group) {
                    if (group) {
                        return group.update(updateGroup, {transaction: t});
                    }
                    return deferred.reject({message: "Group you want to update does not exists"});
                });
            }).then(function (result) {
                deferred.resolve(result);
            }).catch(function (err) {
                deferred.reject(err.message);
            });
        }else{
            deferred.reject({message : "Needed at least one fields and in json format when uploading. Please make sure post data in application/json format"});
        }

        return deferred.promise;
    };

    groupService.deleteGroup = function (id) {
        var deferred = Q.defer();
        models.sequelize.transaction(function (t) {
            // chain all your queries here. make sure you return them.
            return models.group.findById(id).then(function (group) {
                if (group) {
                    return group.destroy({transaction: t});
                }
                return deferred.reject({message: "Group you want to delete does not exists"});
            });
        }).then(function () {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            deferred.resolve({});
        }).catch(function (err) {
            // err is whatever rejected the promise chain returned to the transaction callback
            deferred.reject(err.message);
        });
        return deferred.promise;
    };

    return groupService;
};