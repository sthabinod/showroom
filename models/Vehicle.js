// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Vehicle = sequelize.define("Vehicle", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        selling_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Vehicle.associate = (models) => {
        Vehicle.hasMany(models.VehicleOrder, {
            onDelete: "cascade",
        });
     
        Vehicle.hasOne(models.ExchangedVehicle, {
            onDelete: "cascade",
        });
    };

    return Vehicle;
};