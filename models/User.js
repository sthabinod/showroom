// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCompany: {
            type: DataTypes.BOOLEAN,
            defaultValue: undefined,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.VehicleOrder, {
            onDelete: "cascade",
        });
    
        User.hasMany(models.PartsOrder, {
            onDelete: "cascade",
        });

     
        User.hasOne(models.Customer, {
            onDelete: "cascade",
        });
    };
    return User;
};