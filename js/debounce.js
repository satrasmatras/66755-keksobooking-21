'use strict';

const DEBOUNCE_INTERVAL = 500;

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
