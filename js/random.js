'use strict';

(()=> {
  const getRandomNumberInRange = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  const getRandomItemFromArray = (array) => {
    return array[getRandomNumberInRange(0, array.length - 1)];
  };

  const getRandomItemsFromArray = (array) => {
    return array.filter(() => getRandomNumberInRange(0, 1));
  };

  window.random = {
    getRandomNumberInRange,
    getRandomItemFromArray,
    getRandomItemsFromArray
  };
})();
