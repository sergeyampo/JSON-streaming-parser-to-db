const Decimal = require('decimal.js-light');

/**
 * @description Function returns passed decimal arguments as Decimal.js objects
 * @param args
 * @returns {Array}
 */
function make_decimal(...args){
    let dec_args = [];
    for(let a of args)
        dec_args.push(new Decimal(a));

    return dec_args;
}

/**
 *
 * @param reserve
 * @param supply
 * @param CRR
 * @returns {Promise<number>} the price of the coin with passed parameters
 */
module.exports = async function get_coin_price(reserve, supply, CRR){
    [reserve, supply, CRR] = make_decimal(reserve, supply, CRR);

    CRR = CRR.dividedBy(100);
    const one = new Decimal(1);
    try {
        //If the coin is broken or it just BIP returning zero-price
        if(supply.comparedTo(0) === 0 || CRR.comparedTo(0) === 0)
            return 0;

        const price = reserve.mul(one.sub(one.sub(one.dividedBy(supply)).pow(one.dividedBy(CRR))));
        return price.toNumber();
    }
    catch(e){
        console.log(e);
    }
};