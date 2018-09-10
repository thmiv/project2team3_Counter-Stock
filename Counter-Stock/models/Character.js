module.exports = function(sequelize, DataTypes) {
  // makes a basic characters table in game database
  var Character = sequelize.define("Character", {
    username: {type: DataTypes.STRING,
              allowNull: false,

          },
    stockChoice: {type: DataTypes.STRING,
              allowNull: false,
              
          },
  //   Can't add another column for some reason
  //   stockPrice: {type: DataTypes.STRING,
  //     allowNull: false,
      
  // },
  });
  return Character;
};

