/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var userService = {};

    userService.getAllUsers = function () {
        var deferred = Q.defer();
        models.user.findAll(
            {include: [{model: models.group, as: "groups"}]}
        ).then(function (users) {
            //process the data which is fetch from db
            deferred.resolve(users);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    userService.getUserById = function (id) {
        var deferred = Q.defer();
        models.user.findById(id,{
            include: [{model: models.group, as: "groups"}]
        }).then(function (user) {
            //process the data which is fetch from db
            deferred.resolve(user);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    userService.addUser = function(newUser){
        var deferred = Q.defer();
        var canAdd = true;
        if(canAdd){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.user.create(newUser, {transaction: t});
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

    userService.editUser = function (id, updateUser) {
        var deferred = Q.defer();
        var canEdit =  true;
        if(canEdit){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.user.findById(id).then(function (user) {
                    if (user) {
                        return user.update(updateUser, {transaction: t});
                    }
                    return deferred.reject({message: "User you want to update does not exists"});
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

    userService.deleteUser = function (id) {
        var deferred = Q.defer();
        models.sequelize.transaction(function (t) {
            // chain all your queries here. make sure you return them.
            return models.user.findById(id).then(function (user) {
                if (user) {
                    return user.destroy({transaction: t});
                }
                return deferred.reject({message: "User you want to delete does not exists"});
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

    userService.addUserToGroup = function(userId, groupId){
        var deferred = Q.defer();
        models.sequelize.transaction(function (t) {
            // chain all your queries here. make sure you return them.
            return models.user.findById(userId).then(function (user) {
                if (user) {
                    return models.group.findById(groupId).then(function (group) {
                        if (group) {
                            return user.addGroup(group,{transaction: t});
                        }
                        return deferred.reject({message: "Group you want to add user does not exists"});
                    });
                }
                return deferred.reject({message: "User you want to add into group does not exists"});
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
    }

    userService.removeUserToGroup = function(userId, groupId){
        var deferred = Q.defer();
        models.sequelize.transaction(function (t) {
            // chain all your queries here. make sure you return them.
            return models.user.findById(userId).then(function (user) {
                if (user) {
                    return models.group.findById(groupId).then(function (group) {
                        if (group) {
                            return user.removeGroup(group,{transaction: t});
                        }
                        return deferred.reject({message: "Group you want to remove user does not exists"});
                    });
                }
                return deferred.reject({message: "User you want to remove into group does not exists"});
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
    }

    return userService;
};