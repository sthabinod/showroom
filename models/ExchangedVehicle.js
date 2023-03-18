
module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const ExchangedVehicle = sequelize.define("ExchangedVehicle", {
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
    
    
    return ExchangedVehicle;
};