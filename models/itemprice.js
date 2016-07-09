/**
 * Created by vuvot on 7/8/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";

    var ItemPrice = sequelize.define("itemprice",{
        price: {
            type: DataTypes.FLOAT,
            allowNull : false
        },
        date: {
            type: DataTypes.DATE,
            allowNull : false
        }
    });

    return ItemPrice;
};