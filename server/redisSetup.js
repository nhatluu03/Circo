// import redis from "redis";

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await new Promise((resolve, reject) => {
//     redisClient.once("connect", resolve);
//     redisClient.once("error", reject);
//   }).catch((error) => {
//     console.error(`Error connecting to Redis: ${error}`);
//     // Handle the error as needed
//   });
// })();

import redis from 'redis'

const client = redis.createClient({
  host: '127.0.0.1',  
  port: 6379,         
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});
client.connect()
export default client;


