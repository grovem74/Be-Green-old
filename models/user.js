module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,15]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,     
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,     
      },
      email: {
        type: DataTypes.STRING  
      }
    });

    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Favorites, {
          onDelete: "cascade"
        });
      };
    return User;
  };
  