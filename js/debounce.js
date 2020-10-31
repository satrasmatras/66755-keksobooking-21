'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 1000;

  window.debounce = (callback) => {
    let lastTimeout = null;

    return (...args) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(() => {
        callback(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
