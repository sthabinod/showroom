// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const MaintenanceRequest = sequelize.define("MaintenanceRequest", {
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isBooked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        paymentStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    });

    return MaintenanceRequest;
};