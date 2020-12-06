module.exports = function (sequlize, DataTypes) {
  const Place = sequlize.define(
    'Place',
    {
      PlaceId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      PlaceName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      Idx: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      Lat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      Lng: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: 'Place',
      freezeTableName: false,
      timestamps: false,
      underscored: false,
    }
  )
  Place.associate = (models) => {
    Place.belongsTo(models.Course,{
      foreignKey: 'CourseId',
      onDelete: 'cascade'
    })
    // Place.hasMany(models.MeasuringLine)
    // Place.hasMany(models.Poi)
  }
  return Place
}
