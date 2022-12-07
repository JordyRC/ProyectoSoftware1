const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
           // useCreateIndex:true,
           // useFindAndModify:true
        })

        console.log('Database online (:');

    } catch (error) {
        console.log(error);
        throw new Error ('Error at starting the db');
    }

}

module.exports = {
    dbConnection
}