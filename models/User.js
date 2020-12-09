module.exports = function (sequlize, DataTypes) {
  var User = sequlize.define(
    'User',
    {
      UserId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      UserName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      accountId: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      accountPassword: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      tableName: 'User',
      freezeTableName: false,
      timestamps: false,
      underscored: false,
    }
  )
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'CreaterId',
      onDelete: 'cascade'
    })
    // User.hasMany(models.MeasuringLine)
    // User.hasMany(models.Poi)
  }
  return User;
}
