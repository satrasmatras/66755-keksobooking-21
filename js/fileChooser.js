'use strict';

const initialize = (fileChooserElement, fileTypes, renderCallback) => {
  const fileTypeIsCorrect = (fileName) => {
    return fileTypes.some((fileType) => fileName.endsWith(fileType));
  };

  fileChooserElement.addEventListener(`change`, () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    if (fileTypeIsCorrect(fileName)) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        renderCallback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });
};

window.fileChooser = {
  initialize
};
