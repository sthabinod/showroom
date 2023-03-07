// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const ExchangedTransaction = sequelize.define("ExchangedTransaction", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    });

    ExchangedTransaction.associate = (models) => {
        ExchangedTransaction.hasOne(models.ExchangedVehicle, {
            onDelete: "cascade",
        });
    };

    return ExchangedTransaction;
};