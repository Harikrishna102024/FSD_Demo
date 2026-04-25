import redisClient from '../config/redis.catch.config';

export const getCache = async (cacheKey: string, callBack: Function, ttl: number) => {

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("Cache HIT");
    return JSON.parse(cachedData);
  }

  const result = await callBack();

  await redisClient.setEx(cacheKey, ttl, JSON.stringify(result));

  return result;
}

export const clearCache = async () => {
  try {
    const keys: any = await redisClient.keys("users:*");
    if (keys) {
      for (const key of keys) {
        const check = await redisClient.del(key);
        console.log(`Cache cleared: ${key} - ${check}`);
      }
    }
  } catch (error) {
    console.log('Cache clear error', error);
  }
};