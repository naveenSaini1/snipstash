/**
 * Sets an item in localStorage.
 * @param {string} key - The key for the item.
 * @param {any} value - The value to store.
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Item '${key}' set in localStorage.`);
  } catch (error) {
    console.error(`Error setting item '${key}' in localStorage:`, error);
  }
};

/**
 * Gets an item from localStorage.
 * @param {string} key - The key for the item.
 * @returns {any | null} - The stored value, or null if not found.
 */
export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Error getting item '${key}' from localStorage:`, error);
    return null;
  }
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key for the item.
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    console.log(`Item '${key}' removed from localStorage.`);
  } catch (error) {
    console.error(`Error removing item '${key}' from localStorage:`, error);
  }
}; 