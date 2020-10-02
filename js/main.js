'use strict';

const OFFERS_COUNT = 8;

const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const TYPES_TRANSLATIONS = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const MAX_ROOMS = 10;

const MAX_GUESTS = 15;

const CHECK_TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwater`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS_URL_BASE = `http://o0.github.io/assets/images/tokyo/`;

const TITLES_MOCK = [
  `Отличная квартира!`,
  `Сдам срочно!`,
  `Купите, пожалуйста`,
  `Ищу соседа`,
  `Всем привет!`,
  `Сдается произведение искусства`,
  `Золотой дворец и 999 наложниц в придачу`,
  `Чайная церемония в подарок`,
  `Идеальный ретритный центр`
];

const DESCRIPTIONS_MOCK = [
  `В этой квартире жил сам Хидэо Кодзима!`,
  `Вас будут охранять профессиональные охранники Акита и Сиба ину!`,
  `Медитировал в этой квартире 99999999 часов!`,
  `Квартира хорошая! Не звонить! Только текст`,
  `Хорошие соседи и отличный вид из окна!`,
  `Минималистичная квартира для людей, заботящихся о своем пространстве`
];

const MIN_OFFER_PRICE = 10000;
const MAX_OFFER_PRICE = 100000000;

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;

const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 3;

const getElementWidth = (element) => {
  return element.clientWidth;
};

const getRandomNumberInRange = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomItemFromArray = (array) => {
  return array[getRandomNumberInRange(0, array.length - 1)];
};

const getRandomItemsFromArray = (array) => {
  return array.filter(() => getRandomNumberInRange(0, 1));
};

const createAscendingArray = (length, start = 0) => {
  return Array.from(Array(length).keys()).map((id) => id + start);
};

const generateRandomPhotoArray = () => {
  const count = getRandomNumberInRange(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
  const photosArray = createAscendingArray(count, 1);
  return photosArray.map((id) => `${PHOTOS_URL_BASE}hotel${id}.jpg`);
};

const generateOffer = (index) => {
  const avatar = `img/avatars/user0${index + 1}.png`;
  const title = TITLES_MOCK[index];
  const location = [
    getRandomNumberInRange(MIN_LOCATION_X, MAX_LOCATION_X),
    getRandomNumberInRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
  ];
  const price = getRandomNumberInRange(MIN_OFFER_PRICE, MAX_OFFER_PRICE);
  const type = getRandomItemFromArray(TYPES);
  const rooms = getRandomNumberInRange(1, MAX_ROOMS);
  const guests = getRandomNumberInRange(1, MAX_GUESTS);
  const checkin = getRandomItemFromArray(CHECK_TIMES);
  const checkout = getRandomItemFromArray(CHECK_TIMES);
  const features = getRandomItemsFromArray(FEATURES);
  const description = getRandomItemFromArray(DESCRIPTIONS_MOCK);
  const photos = generateRandomPhotoArray();

  return {
    author: {
      avatar
    },
    offer: {
      title,
      address: location.join(`, `),
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    },
    location: {
      x: location[0],
      y: location[1]
    }
  };
};

const generateOffers = (count) => {
  const offers = [];

  for (let i = 0; i < count; i++) {
    const offer = generateOffer(i);
    offers.push(offer);
  }

  return offers;
};

const getPinTemplate = () => {
  return document
    .querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
};

const generatePinElement = (offer) => {
  const pinTemplate = getPinTemplate();

  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${offer.location.x - getElementWidth(pinElement) / 2}px`;
  pinElement.style.top = `${offer.location.y - getElementWidth(pinElement) / 2}px`;

  const pinImage = pinElement.querySelector(`img`);
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;

  return pinElement;
};

const renderPinElements = (offers) => {
  const fragment = document.createDocumentFragment();
  const mapPins = document.querySelector(`.map__pins`);
  const pinElements = [];

  offers.forEach((offer) => {
    const pinElement = generatePinElement(offer);
    pinElements.push(pinElement);
  });

  fragment.append(...pinElements);
  mapPins.append(fragment);
};

const getCardTemplate = () => {
  return document
    .querySelector(`#card`)
    .content
    .querySelector(`.popup`);
};

const getTypeTranslation = (type) => {
  return TYPES_TRANSLATIONS.hasOwnProperty(type) ? TYPES_TRANSLATIONS[type] : null;
};

const removeElement = (element) => {
  element.remove();
};

const fillFeatureElement = (element, features) => {
  const featuresItems = element.children;

  for (let i = 0; i < featuresItems.length; i++) {
    const featureItem = featuresItems[i];
    const featureClasses = featureItem.className;

    if (features.every((feature) => !featureClasses.includes(feature))) {
      featureItem.remove();
    }
  }
};

const fillPhotosElement = (element, photos) => {
  const photoElement = element.querySelector(`.popup__photo`);

  const photoElements = photos.map((photo) => {
    const newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.src = photo;

    return newPhotoElement;
  });

  photoElement.remove();
  element.append(...photoElements);
};

const createCardElement = (cardTemplate, data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {author, offer} = data;

  const title = cardElement.querySelector(`.popup__title`);
  if (offer.title) {
    title.textContent = offer.title;
  } else {
    removeElement(title);
  }

  const address = cardElement.querySelector(`.popup__text--address`);
  if (offer.address) {
    address.textContent = offer.address;
  } else {
    removeElement(address);
  }

  const price = cardElement.querySelector(`.popup__text--price`);
  if (offer.price) {
    price.textContent = `${offer.price}₽/ночь`;
  } else {
    removeElement(price);
  }

  const type = cardElement.querySelector(`.popup__type`);
  if (offer.type) {
    type.textContent = getTypeTranslation(type);
  } else {
    removeElement(type);
  }

  const capacity = cardElement.querySelector(`.popup__text--capacity`);
  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    removeElement(type);
  }

  const time = cardElement.querySelector(`.popup__text--time`);
  if (offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin},  выезд до ${offer.checkout}`;
  } else {
    removeElement(time);
  }

  const features = cardElement.querySelector(`.popup__features`);
  if (offer.features) {
    fillFeatureElement(features, offer.features);
  } else {
    removeElement(features);
  }

  const description = cardElement.querySelector(`.popup__description`);
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    removeElement(description);
  }

  const photos = cardElement.querySelector(`.popup__photos`);
  if (offer.photos) {
    fillPhotosElement(photos, offer.photos);
  } else {
    removeElement(photos);
  }

  const avatar = cardElement.querySelector(`.popup__avatar`);
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    removeElement(avatar);
  }

  return cardElement;
};

const renderCardElement = (mapElement, mapFilterContainerElement, cardElement) => {
  mapElement.insertBefore(cardElement, mapFilterContainerElement);
};

const mapElement = document.querySelector(`.map`);
const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

const offers = generateOffers(OFFERS_COUNT);

mapElement.classList.remove(`map--faded`);

renderPinElements(offers);

const cardTemplate = getCardTemplate();
const cardElement = createCardElement(cardTemplate, offers[0]);


renderCardElement(mapElement, mapFilterContainerElement, cardElement);
