import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,

//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectModule: require('mysql2'),
//   }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
});

export default sequelize;
