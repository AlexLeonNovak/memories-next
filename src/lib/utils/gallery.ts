import {random} from '.';
import {TPostMedia} from '@/types';
import {CSSProperties, JSX} from 'react';
import {async} from '@firebase/util';

const MIN_PAD = 5;
const MAX_PAD = 15;
const MIN_WIDTH = 160;
const MIN_HEIGHT = 125;
const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

type TPlacementArgs = {
  item: Element;
  containerWidth: number;
  containerHeight: number;
}

const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
export const createDiv = (container: HTMLDivElement) => {
  const containerWidth = container.getBoundingClientRect().width;
  const containerHeight = container.getBoundingClientRect().height;
  const pad = random(MIN_PAD, MAX_PAD);
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
  //
  divEl.style.background = randomColor();

  container.appendChild(divEl);
  return {
    element: divEl,
    pad,
    width,
    height,
    left,
    top,
  };
}

export const randomSize = () => ({
  width: random(MIN_WIDTH, MAX_WIDTH),
  height: random(MIN_HEIGHT, MAX_HEIGHT),
})

type TCoordinatesArgs = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type TImageCoords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
export const getCoordinates = ({ x, y, width, height }: TCoordinatesArgs): TImageCoords => ({
  x1: x,
  x2: x + width,
  y1: y,
  y2: y + height
})

export const contains = (img1: TImageCoords, img2: TImageCoords) => {
  return !(
    img2.x1 < img1.x1 ||
    img2.y1 < img1.y1 ||
    img2.x2 > img1.x2 ||
    img2.y2 > img1.y2
  )
}

export const overlaps = (img1: TImageCoords, img2: TImageCoords, offset: number) => {
  if (img1.x1 >= img2.x2 + offset || img2.x1 >= img1.x2 + offset) return false
  if (img1.y1 >= img2.y2 + offset || img2.y1 >= img1.y2 + offset) return false

  return true
}

const isImageLoaded = (image: HTMLImageElement): Promise<HTMLImageElement> => new Promise(resolve => image.onload = () => resolve(image));

export const checkPlacement = ({
                                 item,
                                 placedItems,
 // galleryWidth,
 // galleryHeight,
 offset = 0
}: {
  item: HTMLDivElement,
  placedItems: HTMLDivElement[],
  // galleryWidth: number,
  // galleryHeight: number,
  offset?: number,
}) => {
  const coordinates1 = getCoordinates(item.getBoundingClientRect())

  // if (isOffCanvas(coordinates1, galleryWidth, galleryHeight)) return false

  return !(placedItems.some((placedItem) => {
    const coordinates2 = getCoordinates(placedItem.getBoundingClientRect())

    return contains(coordinates1, coordinates2) || overlaps(coordinates1, coordinates2, offset)
  }))
}



type TPlaceItem = {
  item: any,
  position: {
    pad: number;
    width: number;
    height: number;
    left: number;
    top: number;
  },
}

type TPlacement = {
  placedItems: TPlaceItem[],
  unplacedItems: any[],
}

const getPlacement = (el: HTMLDivElement, items: any[] = []) => {
  const placedDivs: HTMLDivElement[] = [];
  const placedItems: TPlaceItem[] = [];
  let tries = 0;
  const maxTries = 100;
  while (items.length) {
    tries++;
    const [item] = items;
    const { element, ...position} = createDiv(el);
    const goodPlacement = checkPlacement({
      item: element,
      placedItems: placedDivs,
      offset: position.pad
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

  placedDivs.forEach(placedDiv => placedDiv.remove());

  return {
    placedItems,
    unplacedItems: items,
  }
}

export type TGalleryItemsWithLevel = {
  level: number;
  placedItems: TPlaceItem[];
}

export type TGallery = {
  itemsWithLevels: TGalleryItemsWithLevel[];
  unplacedItems: any[];
}

export const createGallery = (el: HTMLDivElement, items: any[] = [], levels = 3):TGallery => {
  let level = 1;
  let itemsToPlace = [...items];
  const itemsWithLevels: { level: number; placedItems: TPlaceItem[]; }[] = [];
  do {
    const { placedItems, unplacedItems } = getPlacement(el, itemsToPlace);
    itemsWithLevels.push({
      level,
      placedItems,
    });
    itemsToPlace = unplacedItems;
    level++;
  } while (!!itemsToPlace.length && level <= levels);


  return {
    itemsWithLevels,
    unplacedItems: itemsToPlace,
  }
}


export const randomPlaceItem = (item: JSX.Element, items: JSX.Element[]) => {
  // for (const item of items) {
  //   console.log(item.props);
  // }
  const pad = random(MIN_PAD, MAX_PAD);
  const { width, height } = item.props.style;
  item.props.style.left = random(pad, (width + pad));
  item.props.style.top = random(pad, (height + pad));

  //
  // return {
  //   pad,
  //   style: {
  //     width,
  //     left,
  //     top,
  //     // right,
  //     // bottom,
  //     // height,
  //   }
  // }
}
