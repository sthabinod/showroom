// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const PartsOrder = sequelize.define("PartsOrder", {
        partsOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return PartsOrder;
};