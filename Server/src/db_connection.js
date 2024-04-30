require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
	process.env;
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{ logging: false, native: false },
);
// const sequelize = new Sequelize(DB_DEPLOY, { logging: false, native: false });

UserModel(sequelize);
FavoriteModel(sequelize);

const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, { through: "User_Favorite" });
Favorite.belongsToMany(User, { through: "User_Favorite" });

module.exports = {
	User,
	Favorite,
	conn: sequelize,
};
