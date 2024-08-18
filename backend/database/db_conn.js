const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        console.log(`Database is connected at port 3000 with host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;