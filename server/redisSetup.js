import redis from 'redis';

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await new Promise((resolve) => redisClient.once('connect', resolve));
})();

export default redisClient;

