// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Customer = sequelize.define("Customer", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registered_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profile_image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
    });

    return Customer;
};