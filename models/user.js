/**
 * Created by vuvot on 7/6/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";

    var User = sequelize.define("user",{
        name: {
            type: DataTypes.STRING,
            allowNull : false
        }
    });

    return User;
}