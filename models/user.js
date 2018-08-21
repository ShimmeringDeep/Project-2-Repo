module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
      oauthID: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 120]
        }
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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