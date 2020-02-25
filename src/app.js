process.env.NODE_CONFIG_DIR = './config';
const extract_coins = require('./extract_coins.js');
const CoinsEmitter = require('./coins_emitter').Coins;
const configure_emitter = require('./coins_emitter');
const config = require('config');
const coins_db_configure = require('./db/db_configure');

/**
 *
 * @description Function uses configuration file to connect to the postgres database
 * getting all the information about the coins from Minter blockchain, calculating price of each coin
 * and pushing all the data to the database. Everything works in a stream mode so you don't have to worry
 * about JSON size and can use this approximation for every tasks.
 */
const main = async() => {
      const dbcfg = config.get('db.coins');
      const db = await coins_db_configure(dbcfg);
      console.log('Connected to database and created coins table!');
   try {
      let coins_emitter = new CoinsEmitter(db);
      coins_emitter = configure_emitter(coins_emitter);
      await extract_coins('https://explorer-api.minter.network/api/v1/coins', coins_emitter);
   }
   catch(e){
      console.error(e);
   }
};

main();