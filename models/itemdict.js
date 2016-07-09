/**
 * Created by vuvot on 7/8/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";

    var ItemDict = sequelize.define("itemdict",{
        code: {
            type: DataTypes.STRING,
            allowNull : false
        },
        name: {
            type: DataTypes.STRING,
            allowNull : false
        }
    });

    return ItemDict;
};