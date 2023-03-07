// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const VehicleOrder = sequelize.define("VehicleOrder", {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isBooked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    return VehicleOrder;
};