"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      freespace: DataTypes.INTEGER,
      start_hour: DataTypes.TIME,
      end_hour: DataTypes.TIME,
      location: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      image: DataTypes.STRING,
      comments: DataTypes.ARRAY(DataTypes.JSON),
      createdBy: DataTypes.STRING,
    },

    {}
  );
  Trip.associate = function (models) {
    // associations can be defined here
    Trip.belongsTo(models.User);
  };
  return Trip;
};
