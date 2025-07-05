/**
 * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/util/cache.js
 */
const SKIP_TIME = 5000;

class Cache {
  private map: Map<any, any>;
  /**
   * Initialize this cache instance.
   */
  constructor() {
    this.map = new Map();
  }

  /**
   * Get the cached value of the given key.
   * @param {any} key The key to get.
   * @returns {any} The cached value or null.
   */
  get(key) {
    const entry = this.map.get(key);
    const now = Date.now();

    if (entry) {
      if (entry.expire > now) {
        entry.expire = now + SKIP_TIME;
        return entry.value;
      }
      this.map.delete(key);
    }
    return null;
  }

  /**
   * Set the value of the given key.
   * @param {any} key The key to set.
   * @param {any} value The value to set.
   * @returns {void}
   */
  set(key, value) {
    const entry = this.map.get(key);
    const expire = Date.now() + SKIP_TIME;

    if (entry) {
      entry.value = value;
      entry.expire = expire;
    } else {
      this.map.set(key, { value, expire });
    }
  }
}

export default Cache;
