/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function (models, Q) {
    "use strict";

    var customerService = {};

    customerService.getAllCustomers = function () {
        var deferred = Q.defer();
        models.customer.findAll(

        ).then(function (customers) {
            //process the data which is fetch from db
            deferred.resolve(customers);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };

    customerService.getCustomerByName = function (partialName) {
        var deferred = Q.defer();
        models.customer.findAll({
          where: {
              name: {
                  $like: partialName + "%"
              }
          }
        }).then(function (customer) {
            //process the data which is fetch from db
            deferred.resolve(customer);
        }, function (err) {
            deferred.reject({message: err.message});
        });
        return deferred.promise;
    };
    
    return customerService;
};