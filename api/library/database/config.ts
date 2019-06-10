export const DatabaseConfig = {
    MONGODB_CONNECTION: "mongodb://127.0.0.1/avnstarter",
    OPTIONS: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        poolSize: 8,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
    }
};
