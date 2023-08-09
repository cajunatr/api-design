const odbc = require('odbc');
const { decrypt } = require('./credentialsUtils')
const dotenv = require('dotenv')

dotenv.config()

const encryptedUsername = process.env.ENCRYPTED_USERNAME;
const encryptedPassword = process.env.ENCRYPTED_PASSWORD;

const username = decrypt(encryptedUsername);
const password = decrypt(encryptedPassword);

const connectionString = `
        Driver={ODBC Driver 17 for SQL Server};
        Server=DTAZInternal1;
        Database=Junkdrawer;
        Uid=${username};
        Pwd=${password};
        Encrypt=yes;
        TrustServerCertificate=yes;
    `;

const main = () => {
  return new Promise((resolve, reject) => {
    odbc.connect(connectionString, (error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      const sqlQuery = 'SELECT * FROM Junkdrawer.arives.ABEV_Consumption';

      connection.query(sqlQuery, (queryError, result) => {
        if (queryError) {
          reject(queryError);
        } else {
          resolve(result.map(row => Object.assign({}, row))); // Extract only data rows
        }

        connection.close((closeError) => {
          if (closeError) {
            console.error('Error closing connection:', closeError);
          }
        });
      });
    });
  });
};


module.exports = {
    main
};