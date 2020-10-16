'use strict';

(() => {
  const {setFormInactive, setFormActive} = window.form;
  const {setMapActive, setMapInactive} = window.map;
  const {ads} = window.data;

  const setPageActive = () => {
    setMapActive(ads);
    setFormActive();
  };

  const setPageInactive = () => {
    setMapInactive(() => {
      setPageActive();
    });
    setFormInactive();
  };

  window.page = {
    setPageInactive,
    setPageActive
  };
})();
