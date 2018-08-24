module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 120]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        eventfulID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Event.associate = function (models) {
        Event.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Event;
};