module.exports = function (sequlize, DataTypes) {
  const Course = sequlize.define(
    'Course',
    {
      CourseId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      CourseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'Course',
      freezeTableName: false,
      timestamps: false,
      underscored: false,
    }
  )
  Course.associate = (models) => {
    Course.hasMany(models.Place,{
      foreignKey: 'CourseId',
      onDelete: 'cascade'
    })
    Course.belongsTo(models.User,{
      foreignKey: 'CreaterId',
      onDelete: 'cascade'
    })
    // Course.hasMany(models.Poi)
  }
  return Course
}
