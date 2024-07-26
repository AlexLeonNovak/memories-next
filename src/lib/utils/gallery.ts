import { random } from '.';

const MIN_PAD = -50;
const MAX_PAD = -10;
const MIN_WIDTH = 160;
const MIN_HEIGHT = 125;
const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

type TPlacementArgs = {
  item: Element;
  containerWidth: number;
  containerHeight: number;
};

// const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
export const createDiv = (container: HTMLDivElement) => {
  const containerWidth = container.getBoundingClientRect().width;
  const containerHeight = container.getBoundingClientRect().height;
  const pad = MIN_PAD; //random(MIN_PAD, MAX_PAD);
  const width = random(MIN_WIDTH, MAX_WIDTH);
  const height = random(MIN_HEIGHT, MAX_HEIGHT);
  const left = random(pad, containerWidth - (width + pad));
  const top = random(pad, containerHeight - (height + pad));
  const divEl = document.createElement('div');
  divEl.style.width = `${width}px`;
  divEl.style.height = `${height}px`;
  divEl.style.left = `${left}px`;
  divEl.style.top = `${top}px`;
  divEl.style.position = 'absolute';

  container.appendChild(divEl);
  return {
    element: divEl,
    pad,
    width,
    height,
    left,
    top,
  };
};

type TCoordinatesArgs = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TImageCoords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
export const getCoordinates = ({ x, y, width, height }: TCoordinatesArgs): TImageCoords => ({
  x1: x,
  x2: x + width,
  y1: y,
  y2: y + height,
});

export const contains = (img1: TImageCoords, img2: TImageCoords) => {
  return !(img2.x1 < img1.x1 || img2.y1 < img1.y1 || img2.x2 > img1.x2 || img2.y2 > img1.y2);
};

export const overlaps = (img1: TImageCoords, img2: TImageCoords, offset: number) => {
  if (img1.x1 >= img2.x2 + offset || img2.x1 >= img1.x2 + offset) return false;
  if (img1.y1 >= img2.y2 + offset || img2.y1 >= img1.y2 + offset) return false;

  return true;
};

export const checkPlacement = ({
  item,
  placedItems,
  offset = 0,
}: {
  item: HTMLDivElement;
  placedItems: HTMLDivElement[];
  offset?: number;
}) => {
  const coordinates1 = getCoordinates(item.getBoundingClientRect());

  // if (isOffCanvas(coordinates1, galleryWidth, galleryHeight)) return false

  return !placedItems.some((placedItem) => {
    const coordinates2 = getCoordinates(placedItem.getBoundingClientRect());

    return contains(coordinates1, coordinates2) || overlaps(coordinates1, coordinates2, offset);
  });
};

type TPlaceItem<T> = {
  item: T;
  position: {
    pad: number;
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

type TPlacement<T> = {
  placedItems: TPlaceItem<T>[];
  unplacedItems: any[];
};

const getPlacement = <T>(el: HTMLDivElement, items: T[] = []) => {
  const placedDivs: HTMLDivElement[] = [];
  const placedItems: TPlaceItem<T>[] = [];
  let tries = 0;
  const maxTries = 1000;
  while (items.length) {
    tries++;
    const [item] = items;
    const { element, ...position } = createDiv(el);
    const goodPlacement = checkPlacement({
      item: element,
      placedItems: placedDivs,
      offset: position.pad,
    });

    if (goodPlacement) {
      placedDivs.push(element);
      placedItems.push({ item, position });
      items.splice(items.indexOf(item), 1);
      tries = 0;
      continue;
    }
    element.remove();
    if (tries === maxTries) {
      break;
    }
  }

  placedDivs.forEach((placedDiv) => placedDiv.remove());

  return {
    placedItems,
    unplacedItems: items,
  };
};

export type TGalleryItemsWithLevel<T> = {
  level: number;
  placedItems: TPlaceItem<T>[];
};

export type TGallery<T> = {
  itemsWithLevels: TGalleryItemsWithLevel<T>[];
  unplacedItems: T[];
};

export const createGallery = <T = any>(el: HTMLDivElement, items: T[] = [], levels = 3): TGallery<T> => {
  let level = 1;
  let itemsToPlace = [...items];
  const itemsWithLevels: TGalleryItemsWithLevel<T>[] = [];
  // const allPlacedItems: TPlaceItem[] = [];
  do {
    const { placedItems, unplacedItems } = getPlacement<T>(el, itemsToPlace);
    itemsWithLevels.push({
      level,
      placedItems,
    });
    // allPlacedItems.push(...placedItems);
    itemsToPlace = unplacedItems;
    level++;
  } while (!!itemsToPlace.length && level <= levels);

  return {
    itemsWithLevels,
    unplacedItems: itemsToPlace,
  };
};
