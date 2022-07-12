const { app } = require('./app');

//Models

const { User } = require('./models/user.model');
const { Game } = require('./models/game.model')
const { Console } = require('./models/console.model')
const { gamesInConsole } = require('./models/gamesInConsole.model')
const { Review } = require('./models/review.model')

//Utils
const { db } = require('./utils/database.util')

//Establish model's relations

// 1 User <-----> M reviews
User.hasMany(Review, {foreignKey:'userId'});
Review.belongsTo(User);

//1 Game <-----> M games in console

Game.hasMany(gamesInConsole,{foreignKey:'gameId'});
gamesInConsole.belongsTo(Game);

// 1 Games <------> M review 

Game.hasMany(Review, {foreignKey: 'gameId'})
Review.belongsTo(Game);


db.sync()
    .then( () => console.log( 'db sync'))
    .catch( err => console.log(err));
db.authenticate()
    .then( () => console.log( 'db authenticate' ))

app.listen(4000, () => {
    console.log( 'express app running 4000!!');
});