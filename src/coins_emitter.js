const EventEmitter = require('events');
const get_coin_price = require("./formulas/basic_minter");


class Coins extends EventEmitter{
    _db;
    constructor(db){
        super();
        this._db = db;
    }

    async add_coin(...args){
        await this._db.add_coin(...args);
    }
}

/**
 *
 * @param coins_emitter - {EventEmitter} object Coins - containing database connection object.
 * @returns {EventEmitter} object with connected listeners.
 */
module.exports = function configure_emitter(coins_emitter){
    coins_emitter.on('coin_extracted', async (coin_info) => {
        coin_info["price"] = await get_coin_price(coin_info.reserveBalance, coin_info.volume, coin_info.crr);
        coins_emitter.emit('coin_push_db', coin_info);
    });
    coins_emitter.on('coin_push_db', async (coin_info) => {
        coins_emitter.add_coin(coin_info.symbol, coin_info.reserveBalance, coin_info.volume, coin_info.price, coin_info.crr);
    });

    return coins_emitter;
};

module.exports.Coins = Coins;