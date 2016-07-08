/**
 * Created by James on 7/5/2016.
 */
module.exports = function(sequelize, DataTypes){
    "use strict";
    var Location = sequelize.define("location",{
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: -180,
                max: 180
            }
        },
        accuracy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 0,
                max: 30
            }
        }
    });

    return Location;
};