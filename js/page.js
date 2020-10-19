'use strict';

(() => {
  const {setFormInactive, setFormActive} = window.form;
  const {setMapInactive, setMapActive} = window.map;
  const {setFilterInactive, setFilterActive} = window.filter;
  const {ads} = window.data;

  const setPageActive = () => {
    setMapActive(ads);
    setFilterActive();
    setFormActive();
  };

  const setPageInactive = () => {
    setMapInactive(setPageActive);
    setFilterInactive();
    setFormInactive();
  };

  window.page = {
    setPageInactive,
    setPageActive
  };
})();
