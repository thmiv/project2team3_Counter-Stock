module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    username: {type: DataTypes.STRING,
              allowNull: false,

          },
    stockChoice: {type: DataTypes.STRING,
              allowNull: false,
              
          },
  //   stockPrice: {type: DataTypes.STRING,
  //     allowNull: false,
      
  // },
  });
  return Character;
};

