import client from "../redisSetup.js";

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    client.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      client.set(key, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}
export default  getOrSetCache ;
