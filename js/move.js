'use strict';

(() => {
  const initialize = (element, parentElement, limits, mouseMoveCallback) => {
    const utils = window.utils;

    const {MIN_Y, MAX_Y} = limits;

    const onMouseDown = (event) => {
      if (!utils.isMainClick(event)) {
        return;
      }

      const shift = {
        x: event.clientX - element.getBoundingClientRect().left,
        y: event.clientY - element.getBoundingClientRect().top
      };

      const moveElementAt = (pageX, pageY) => {
        const nextX = pageX - shift.x - parentElement.offsetLeft;
        const nextY = pageY - shift.y;

        const currentElementWidth = parseInt(element.clientWidth, 10);
        const currentParentElementWidth = parseInt(parentElement.clientWidth, 10);

        const minX = -currentElementWidth / 2;
        const maxX = currentParentElementWidth - currentElementWidth / 2;

        if (minX <= nextX && nextX <= maxX) {
          element.style.left = `${nextX}px`;
        }
        if (MIN_Y <= nextY && nextY <= MAX_Y) {
          element.style.top = `${nextY}px`;
        }
      };

      moveElementAt(event.pageX, event.pageY);

      const onMouseMove = (mouseMoveEvent) => {
        moveElementAt(mouseMoveEvent.pageX, mouseMoveEvent.pageY);

        mouseMoveCallback();
      };

      const onMouseUp = () => {
        event.preventDefault();

        mouseMoveCallback();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    };

    element.addEventListener(`mousedown`, onMouseDown);
  };

  window.move = {
    initialize
  };
})();
