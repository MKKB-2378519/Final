/**
 * URL Parameter Utility
 * Provides methods for working with URL query parameters
 */

const UrlParams = {
    /**
     * Get all parameters as an object
     * @returns {Object} Key-value pairs of all parameters
     */
    getAll: function() {
      const params = new URLSearchParams(window.location.search);
      const result = {};
      
      for (const [key, value] of params.entries()) {
        // Convert numeric values
        result[key] = isNaN(Number(value)) ? value : Number(value);
        
        // Convert boolean strings
        if (value.toLowerCase() === 'true') result[key] = true;
        if (value.toLowerCase() === 'false') result[key] = false;
      }
      
      return result;
    },
  
    /**
     * Get a specific parameter value
     * @param {string} key - Parameter name
     * @param {*} defaultValue - Value to return if not found
     * @returns {*|null} Parameter value or defaultValue
     */
    get: function(key, defaultValue = null) {
      const params = new URLSearchParams(window.location.search);
      if (!params.has(key)) return defaultValue;
      
      const value = params.get(key);
      
      // Handle numeric values
      if (!isNaN(Number(value))) return Number(value);
      
      // Handle boolean strings
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
      
      return value;
    },
  
    /**
     * Set or update a parameter
     * @param {string} key - Parameter name
     * @param {*} value - Value to set
     */
    set: function(key, value) {
      const params = new URLSearchParams(window.location.search);
      params.set(key, String(value));
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    },
  
    /**
     * Remove a parameter
     * @param {string} key - Parameter name to remove
     */
    remove: function(key) {
      const params = new URLSearchParams(window.location.search);
      params.delete(key);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    },
  
    /**
     * Check if a parameter exists
     * @param {string} key - Parameter name to check
     * @returns {boolean}
     */
    has: function(key) {
      return new URLSearchParams(window.location.search).has(key);
    }
  };
  
  // Usage examples:
  // const courseId = UrlParams.get('courseId');
  // UrlParams.set('filter', 'popular');
  
  export default UrlParams;