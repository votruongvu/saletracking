/**
 * Created by James on 7/5/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var orderService = {};

    orderService.getAllOrders = function () {
        var deferred = Q.defer();
        models.order.findAll(
            {include: [{model: models.item, as: "items", include:[{model : models.itemdict},{model: models.itemprice}]}, {model: models.location, as: "location"}, {model: models.user, as: "user"}, {model: models.customer, as: "customer"}]}
        ).then(function (orders) {
            //process the data which is fetch from db
            deferred.resolve(orders);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    orderService.getOrderById = function (id) {
        var deferred = Q.defer();
        models.order.findById(id,{
            include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}]
        }).then(function (order) {
            //process the data which is fetch from db
            deferred.resolve(order);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    orderService.getOrderByDateRange = function (startDate, fromDate) {
        var deferred = Q.defer();
        models.order.findAll({
            where: {
                orderDate: {
                    $between: [startDate, fromDate]
                }
            }
        },{
            include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}]
        }).then(function (order) {
            //process the data which is fetch from db
            deferred.resolve(order);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    orderService.addOrder = function (newOrder) {
        var deferred = Q.defer();
        var canAdd = true;
        if(canAdd){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.order.create({
                    orderDate: newOrder.orderDate,
                    userId:  newOrder.userId,
                    customerId: newOrder.customerId,
                    items: newOrder.items,
                    location: newOrder.location
                }, {include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}], transaction: t});
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

    orderService.editOrder = function (id, updateOrder) {
        var deferred = Q.defer();
        var canEdit =  true;
        if(canEdit){
            models.sequelize.transaction(function (t) {
                // chain all your queries here. make sure you return them.
                return models.order.findById(id,{include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}]}).then(function (order) {
                    if (order) {
                        return Q.all([
                            order.location.update(updateOrder.location,{transaction: t}),
                            order.items.forEach(function (item) {
                                //finding in updated list items, if not exsists (return undefined) means need to delete, if having means edit
                                //Sequenlize will auto decice which item need to modifed, it will not run query if json data does not changed
                                var updatedItem = updateOrder.items.find(function(updatedItem){
                                    if(!updatedItem.id){
                                        return false;
                                    }
                                    return item.id === updatedItem.id;
                                });
                                if(updatedItem){
                                    return item.update(updatedItem,{transaction: t});
                                }else{
                                    return item.destroy({transaction: t});
                                }
                            }),
                            //finding in updated list item, if not in exsiting list item from db means new item
                            updateOrder.items.forEach(function(updatedItem){
                                if(!updatedItem.id){
                                    return models.item.create(updatedItem,{transaction : t});
                                }
                            }),
                            order.update({orderDate: updateOrder.orderDate, customerId: updateOrder.customerId}, {transaction: t})
                        ]);
                    }
                    return deferred.reject({message: "Order you want to update does not exists"});
                });
            }).then(function () {
                return models.order.findById(id,{include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}]}).then(function (order) {
                    deferred.resolve(order);
                });
            }).catch(function (err) {
                deferred.reject(err.message);
            });
        }else{
            deferred.reject({message : "Needed at least one fields and in json format when uploading. Please make sure post data in application/json format"});
        }

        return deferred.promise;
    };

    orderService.deleteOrder = function (id) {
        var deferred = Q.defer();
        models.sequelize.transaction(function (t) {
            // chain all your queries here. make sure you return them.
            return models.order.findById(id, {include: [{model: models.item, as: "items"}, {model: models.location, as: "location"}]}).then(function (order) {
                if (order) {
                    return Q.all([
                        order.location.destroy({transaction: t}),
                        order.items.forEach(function (item) {
                            return item.destroy({transaction: t});
                        }),
                        order.destroy({transaction: t})
                    ]);
                }else{
                    return deferred.reject({message: "Order you want to delete does not exists"});
                }
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

    return orderService;
};