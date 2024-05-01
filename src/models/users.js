module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define(
      "Users",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
         fullname: {
            type: DataTypes.STRING
         },
         username: {
            type: DataTypes.STRING,
         },
         password: {
            type: DataTypes.STRING,
         },
         role_id: {
            type: DataTypes.INTEGER,
            allowNull: true
         },
         is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
         },
         created_at: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: "users",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );

   Users.associate = function (models) {
      Users.belongsTo(models.Roles, {
         foreignKey: 'role_id',
         as: 'role'
      })
   }

   return Users;
};