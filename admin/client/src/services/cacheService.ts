import { isJsonString } from '../utils/helper';

class CacheServiceClass {
  adminURLCacheKey = 'adminURLCache';

  //Getters

  getAdminURLCache() {
    return CacheServiceClass.getSessionCacheByKey(this.adminURLCacheKey);
  }

  static getSessionCacheByKey(key: string) {
    const item = sessionStorage.getItem(key);
    return isJsonString(item) ? JSON.parse(item as string) : null;
  }

  //Setters

  setAdminURLCache(value: string) {
    return CacheServiceClass.setSessionCacheByKey(this.adminURLCacheKey, value);
  }

  removeAdminURLCache() {
    return CacheServiceClass.removeSessionCacheByKey(this.adminURLCacheKey);
  }

  static setSessionCacheByKey(key: string, value: string) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static removeSessionCacheByKey(key: string) {
    sessionStorage.removeItem(key);
  }
}

export const CacheService = new CacheServiceClass();
