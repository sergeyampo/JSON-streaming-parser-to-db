const axios = require('axios').default;
const {streamArray} = require('stream-json/streamers/StreamArray');
const {parser} = require('stream-json/Parser');
const {pick} = require('stream-json/filters/Pick');
const {chain} = require('stream-chain');

/**
 * @description Function makes GET HTTP request and extract parsed JSON data of\ on demand to emit
 * 'coin_extracted' event in passed `emitter`.
 * @param url - url where we can extract information about the coin
 * @param emitter - EventEmitter object which listens 'coin_extracted' event and has all information about database connection.
 * @returns {Promise<void>}
 */
module.exports = async function extract_coins(url, emitter){
    return (axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    }).then((res) => new Promise(resolve => {
        const pipeline = chain([
            res.data,
            parser(),
            pick({filter: 'data'}),
            streamArray()
        ]);
        pipeline.on('data', async(data) => {
            await emitter.emit('coin_extracted', data.value);
        });
        pipeline.on('end', () => {
            console.log("All the coins were successfully passed!");
            resolve();
        });
    })))
};

