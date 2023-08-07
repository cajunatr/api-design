const config = require("./dbconfig");
const sql = require("mssql");


const getJsonResult = () => {
    return new Promise((resolve, reject) => {
      sql.connect(config, function(err) {
        if (err) {
          reject(err);
          return;
        }
  
        const request = new sql.Request();
  
        request.query("SELECT * FROM Junkdrawer.arives.ABEV_Consumption WHERE StateAbbreviation = 'LA'", function(err, result) {
          if (err) {
            reject(err);
            return;
          }
  
          resolve(result.recordset);
  
          sql.close();
        });
      });
    });
  };
  
async function main() {
    try {
        const result = await getJsonResult();
        console.log(result);
    } catch (error) {
        console.error(error)
    }
}




main();

// module.exports = {
//     getJsonResult: getJsonResult
//   };
// const getJsonResult = () => {
//     return new Promise((resolve, reject) => {
//       sql.connect(config, function(err) {
//         if (err) {
//           reject(err);
//           return;
//         }
  
//         const request = new sql.Request();
  
//         request.query("SELECT * FROM Junkdrawer.arives.ABEV_Consumption", function(err, result) {
//           if (err) {
//             reject(err);
//             return;
//           }
  
//           resolve(result.recordset);
  
//           sql.close();
//         });
//       });
//     });
//   };
// add function in here to see if get json will work more better 
// module.exports = getJsonResult;

