const CoinsDB = require('./coins_table_create').CoinsDB;

/**
 *
 * @param dbcfg - configuration object for the database connection
 * @returns {Promise<void>}
 */
module.exports = async function coins_db_configure(dbcfg){
    const db = new CoinsDB(dbcfg);
    try{
        await db.connect(dbcfg);
        await db.create_table();

        return db;
    }
    catch(e){
        console.error(e);
    }
};