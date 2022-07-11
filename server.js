const { app } = require('./app');


const { db } = require('./utils/database.util')


db.sync()
    .then( () => console.log( 'db sync'))
    .catch( err => console.log(err));
db.authenticate()
    .then( () => console.log( 'db authenticate' ))

app.listen(4000, () => {
    console.log( 'express app running 4000!!');
});