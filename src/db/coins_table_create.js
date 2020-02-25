const {Client} = require('pg');

class CoinsDB{
 constructor(config){
     this.db = new Client(config);
 }

 async connect(){
     this.db.connect();
 }

 async create_table(){
     await this.db.query('CREATE TABLE IF NOT EXISTS coins (symbol text, reserve float(18), supply float(18), price float(18), crr smallint)').
       catch(err => {
         console.log(err);
       });
 }

 async add_coin(symbol, reserve, supply, price, crr){
     try {
         await this.db.query('INSERT INTO coins (symbol, reserve, supply, price, crr) VALUES ($1, $2, $3, $4, $5)', [symbol, reserve, supply, price, crr]);
     }
     catch(err){
           console.log(err);
     }
 }

 async close(){
     await this.db.end();
 }

}

module.exports.CoinsDB = CoinsDB;