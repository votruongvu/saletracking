/**
 * Created by vuvot on 5/30/2016.
 */
module.exports = function (sequelize, DataTypes) {
    "use strict";

    var Item = sequelize.define("item", {
        quantity: {type: DataTypes.INTEGER,allowNull: false, validate: {min: 0}},
        description: {type: DataTypes.TEXT}
    });

    return Item;
};
