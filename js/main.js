'use strict';

(() => {
  const {setPageInactive} = window.page;
  const {updateAddressInput} = window.map;

  setPageInactive();
  updateAddressInput();
})();
