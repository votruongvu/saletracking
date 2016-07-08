/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";

    var Customer = sequelize.define("customer",{
        code: {
            type: DataTypes.STRING,
            allowNull : false
        },
        name: {
            type: DataTypes.STRING,
            allowNull : false
        }
    });

    return Customer;
};