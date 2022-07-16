const mongoose = require('mongoose');
const sql = require("mssql");

const dbSettings = {
    user: "Sistemas",
    password: "S1st3ma5+2022,.*",
    server: "190.85.51.38",
    /* server: "192.168.1.91", */
    port: 1433,
    connectionTimeout: 30000,
    instance: "MSSQLSERVER",
    database: "AUTOMARCOL",
    pool: {
      max: 20,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        console.log('Base de datos MongoDB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

const getSQLConection = async () => {
    try {
  
      try {
        const pool = await sql.connect(dbSettings);
        console.log('Base de datos MongoDB online');
        return pool;
        
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
  
      console.log(error);
      return null;
    }
  };
  



module.exports = {
    dbConnection,
    getSQLConection
}
