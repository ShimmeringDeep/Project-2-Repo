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
      defaultValue: DataTypes.NOW  // this line can give some problems
      // sequelize.fn("NOW") possible solution if line up gives problems
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 200]
    }
  });

  Event.associate = function (models) {
    Event.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Event;
};
