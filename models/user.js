var bcrypt = require("bcrypt-nodejs")

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [1, 200]
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    }
  }, {
    classMethods: {
      validPassword: function (password, passwd, done, user) {
        bcrypt.compare(password, passwd, function (err, isMatch) {
          console.log("fail")
          if (err) console.log(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          };
        })
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  User.beforeCreate(function (user, options) {
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (_, salt) {
      return salt;
    });
    console.log("please please please :" + user.password);
    user.password = bcrypt.hashSync(user.password, salt);
    console.log("please please please :" + user.password);
  });

  return User;
};