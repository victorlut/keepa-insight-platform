const { createClient } = require('redis');

module.exports = function createRedisClient() {
  let client;
  (async () => {
    client = createClient();
    await client.connect();

    client.on("connect", () => console.log("Connected!!!"));
    client.on("error", (error) => console.error(`Error : ${error}`));
  })();
  return client;
}