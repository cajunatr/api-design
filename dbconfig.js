var sql = require('mssql/msnodesqlv8');
const { decrypt } = require('./credentialsUtils')
const dotenv = require('dotenv')

dotenv.config()

const encryptedUsername = process.env.ENCRYPTED_USERNAME;
const encryptedPassword = process.env.ENCRYPTED_PASSWORD;

const username = decrypt(encryptedUsername);
const password = decrypt(encryptedPassword);

const config = {
  server: "DTAZInternal1",
  database: "Junkdrawer",
  user: username,
  password: password,
  //driver: "msnodesqlv8",
  options:{
      trustedConnection:true,
  }
};

const getData = () => {
    return new Promise((resolve, reject) => {
      sql.connect(config, function(err) {
        if (err) {
          reject(err);
          return;
        }
        const request = new sql.Request();
        request.query("SELECT * FROM Junkdrawer.arives.ABEV_Consumption", function(err, result) {
          if (err) {
            reject(err);
            // return;
          }
  
          resolve(result.recordset);
  
          sql.close();
        });
      });
    });
  };
  
async function main() {
    try {
        const result = await getData();
        return (result);
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    config,
    getData,
    main
};