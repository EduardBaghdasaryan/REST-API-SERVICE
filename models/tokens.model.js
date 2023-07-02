export default (sequelize, Sequelize) => {
    const Tokens = sequelize.define("Tokens", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tokens'
    });

    return Tokens;
};