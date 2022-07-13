const { db, DataTypes } = require('../utils/database.util');



// Create our first model (table)
const gamesInConsole = db.define('gamesInConsole', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	consoleId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    gameId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { gamesInConsole };