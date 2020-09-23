'use strict';

const OFFERS_COUNT = 8;
const AVATARS_COUNT = 8;

const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

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
let maxLocationX = 630;

const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const MIN_PHOTOS_COUNT = 3;
const MAX_PHOTOS_COUNT = 10;

const getElementWidth = (element) => {
  return element.clientWidth;
};

const getRandomNumberInRange = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomFromArray = (array) => {
  return array[getRandomNumberInRange(0, array.length - 1)];
};

const getRandomItemsFromArray = (array) => {
  return array.filter(() => Math.round(Math.random()));
};

const createAscendingArray = (length, start = 0) => {
  return Array.from(Array(length).keys()).map((id) => id + start);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateRandomPhotoArray = () => {
  const count = getRandomNumberInRange(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
  const photosArray = createAscendingArray(count, 1);
  return photosArray.map((id) => `${PHOTOS_URL_BASE}hotel${id}.jpg)`);
};

const createRandomGenerator = (array) => {
  const generatorArray = [...array];
  shuffle(generatorArray);

  return function* () {
    for (let i = 0; i < generatorArray.length; i++) {
      yield generatorArray[i];
    }
  };
};

const createAvatarsGenerator = () => {
  return createRandomGenerator(createAscendingArray(AVATARS_COUNT, 1))();
};

const createTitlesGenerator = () => {
  return createRandomGenerator(TITLES_MOCK)();
};

const generateOffer = (
    {
      avatarGenerator = createAvatarsGenerator(),
      titleGenerator = createTitlesGenerator()
    }
) => {
  const avatarId = avatarGenerator.next().value;
  const title = titleGenerator.next().value;
  const location = [
    getRandomNumberInRange(MIN_LOCATION_X, maxLocationX),
    getRandomNumberInRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
  ];
  const price = getRandomNumberInRange(MIN_OFFER_PRICE, MAX_OFFER_PRICE);
  const type = getRandomFromArray(TYPES);
  const rooms = getRandomNumberInRange(1, MAX_ROOMS);
  const guests = getRandomNumberInRange(1, MAX_GUESTS);
  const checkin = getRandomFromArray(CHECK_TIMES);
  const checkout = getRandomFromArray(CHECK_TIMES);
  const features = getRandomItemsFromArray(FEATURES);
  const description = getRandomFromArray(DESCRIPTIONS_MOCK);
  const photos = generateRandomPhotoArray();

  return {
    author: {
      avatar: `img/avatars/user0${avatarId}.png`
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
  const avatarGenerator = createAvatarsGenerator();
  const titleGenerator = createTitlesGenerator();
  let offers = [];

  for (let i = 0; i < count; i++) {
    offers = [...offers, generateOffer({avatarGenerator, titleGenerator})];
  }

  return offers;
};

const getPinTemplate = () => {
  return document
    .querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
};

const generatePin = (offer) => {
  const pinTemplate = getPinTemplate();
  const fragment = document.createDocumentFragment();

  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${offer.location.x - getElementWidth(pinElement) / 2}px`;
  pinElement.style.top = `${offer.location.y - getElementWidth(pinElement) / 2}px`;

  const pinImage = pinElement.querySelector(`img`);
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;

  fragment.append(pinElement);
  return fragment;
};

const generatePins = (offers) => {
  let pinElements = [];

  offers.forEach((offer) => {
    const pinElement = generatePin(offer);
    pinElements = [...pinElements, pinElement];
  });

  return pinElements;
};

const renderPins = (pins) => {
  const mapPins = document.querySelector(`.map__pins`);
  mapPins.append(...pins);
};

const mapElement = document.querySelector(`.map`);
maxLocationX = getElementWidth(mapElement);

const offers = generateOffers(OFFERS_COUNT);

mapElement.classList.remove(`map--faded`);

const pins = generatePins(offers);

renderPins(pins);
