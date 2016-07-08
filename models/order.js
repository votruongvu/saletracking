/**
 * Created by James on 7/5/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";

    var Order = sequelize.define("order",{
        orderDate: {
            type: DataTypes.DATE,
            allowNull : false
        }
    });

    return Order;
}