const { createClient } = require('redis');

module.exports = function createRedisClient() {
  let client;
  (async () => {
    client = createClient({
      host: '94.130.132.231'
    });
    await client.connect();

    client.on("connect", () => console.log("Connected!!!"));
    client.on("error", (error) => console.error(`Error : ${error}`));
  })();
  return client;
}