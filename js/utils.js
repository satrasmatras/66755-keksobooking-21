'use strict';

const ESC = `Escape`;
const ENTER = `Enter`;
const MAIN_CLICK = 0;

const isEscapeKey = (event) => event.key === ESC;
const isEnterKey = (event) => event.key === ENTER;
const isMainClick = (event) => event.button === MAIN_CLICK;

window.utils = {
  isEscapeKey,
  isEnterKey,
  isMainClick
};
