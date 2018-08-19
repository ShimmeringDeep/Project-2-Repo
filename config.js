module.exports = {
    db : {
        database : "intheband",
        username : "root",
        password :"root",
        logging: false,
        host: "localhost",
        dialect: "mysql"
    },
    memcached: {
    servers : [ "127.0.0.1:11211" ],
        options : {
            keyCompression : true,
            poolSize : 5,
            reconnect : 3500,
            retry: 3500
        }
    }
 };