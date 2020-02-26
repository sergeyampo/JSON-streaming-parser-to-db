# JSON-streaming-parser-to-db
This is a simple example of using EventEmitters, Streams, json-stream, axios and minter.network for extracting parsing and calculating data on demand and pushing it to the database.
### Installation:
```sh
git clone https://github.com/sergeyampo/JSON-streaming-parser-to-db/
cd JSON-streaming* && npm i pg stream-json stream-chain axios decimal.js-light config --save-dev
npm start
```

### Configuration:
You should configure json file in a `./config/db.json` for correct database connection. For example, it's local PostgreSQL database for me.

### What happens:
![Diagram](https://github.com/sergeyampo/JSON-streaming-parser-to-db/blob/master/stream-parsing-diagram.png?raw=true)
