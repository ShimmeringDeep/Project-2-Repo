module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 120]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 120]
        }
      },
      handle: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 200]
      }
    });
  
    User.associate = function (models) {
      User.hasMany(models.Comment, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };