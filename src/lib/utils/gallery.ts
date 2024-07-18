import {random} from '.';
import {TPostMedia} from '@/types';

const MIN_PAD = 10;
const MAX_PAD = 100;
const MIN_WIDTH = 160;
const MIN_HEIGHT = 125;
const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

type TPlacementArgs = {
  image: HTMLImageElement;
  containerWidth: number;
  containerHeight: number;
}
export const place = ({ image, containerWidth, containerHeight }: TPlacementArgs) => {
  const pad = random(MIN_PAD, MAX_PAD);
  // const padTop = random(MIN_PAD, MAX_PAD);
  const width = random(MIN_WIDTH, MAX_WIDTH);
  const scale = width / image.naturalWidth;
  const height = image.naturalHeight * scale;
  const left = random(pad, containerWidth - (width + pad));
  const top = random(pad, containerHeight - (height + pad));
  // const right = left + width;
  // const bottom = top + height;

  return {
    pad,
    style: {
      width: `${width}px`,
      left: `${left}px`,
      top: `${top}px`,
      // right,
      // bottom,
      // height,
    }
  }
}

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

export const createGallery = async (el: HTMLDivElement) => {
  const images = [...el.getElementsByTagName('img')];
  if (!images.length) return;
  images.forEach((image: HTMLImageElement) => {
    console.log(image.naturalWidth);
  })

  const galleryWidth = el.getBoundingClientRect().width;
  const galleryHeight = el.getBoundingClientRect().height;

  const loadedImages = await Promise.all(images.map(isImageLoaded));
  loadedImages.forEach((image: HTMLImageElement) => {
    image.style.display = 'none';
  })
  const placedImages: HTMLImageElement[] = [];
  let tries = 0;
  const maxTries = 100;
  while (loadedImages.length) {
    tries++;
    const [image] = loadedImages;
    const {style, pad } = place({
      image,
      containerWidth: galleryWidth,
      containerHeight: galleryHeight,
    })
    image.style.top = style.top;
    image.style.left = style.left;
    image.style.width = style.width;
    image.style.height = 'auto';
    image.style.display = 'block';

    const coordinates1 = getCoordinates(image);


    const isIntersecting = placedImages.some(placedImage => {
      const coordinates2 = getCoordinates(placedImage);
      return contains(coordinates1, coordinates2) || overlaps(coordinates1, coordinates2, pad);
    });

    if (!isIntersecting) {
      loadedImages.splice(loadedImages.indexOf(image), 1);
      placedImages.push(image);
    }

    if (tries === maxTries) {
      break;
    }
  }

}
