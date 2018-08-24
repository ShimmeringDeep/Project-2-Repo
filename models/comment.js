module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW  
        },
        user_comment: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 300]
        },
        isGoing: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Comment.belongsTo(models.Event, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
};