export default (sequelize, Sequelize) => {
    const Files = sequelize.define("files", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        extension: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mimeType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uploadDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'files'
    });

    return Files;
};