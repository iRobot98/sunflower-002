const mongoose = require("mongoose");

const { wait } = require("../utils");
const { dbName } = require("../../server.settings");

let connection = undefined;
mongoose.set("strictQuery", false);
async function connectToDatabase() {
    if (connection) {
        return connection;
    }
    let success = false;
    let attempts = 0;
    while (!success) {
        try {
            const user = "budgetapp-admin-001"; //;
            const password = "VdoVO1AuzTHC7ob2"; // ;

            const connectionString = `mongodb+srv://${user}:${password}@olivineschool000.jerpqjx.mongodb.net/${dbName}?retryWrites=true&w=majority`;
            console.log(`mongoDB connection string: ${connectionString}`);
            connection = await mongoose
                .connect(connectionString, {
                    serverSelectionTimeoutMS: 5000,
                    useNewUrlParser: true,
                })
                .then((dbconn) => {
                    console.log("Connected to database");
                    return dbconn;
                });
            return connection;
        } catch (e) {
            console.log(`connection attempts: ${attempts++}`);
            console.error(e);
            await wait(attempts);
            if (attempts > 4) {
                process.exit(1);
            }
        }
    }
}

module.exports = {
    connectToDatabase,
};
