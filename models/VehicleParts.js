// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const VehicleParts = sequelize.define("VehicleParts", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicle_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    VehicleParts.associate = (models) => {
        VehicleParts.hasMany(models.PartsOrder, {
            onDelete: "cascade",
        });
    };
    return VehicleParts;
};