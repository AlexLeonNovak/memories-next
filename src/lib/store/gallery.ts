import {create} from 'zustand';

type GalleryState = {
  hoveredCategories: string[];
  categorySelected: string | null;
}

type GalleryAction = {
  setHoveredCategories: (itemHovered: string[]) => void;
  setCategorySelected: (categorySelected: string | null) => void;
}

export const useGalleryStore = create<GalleryState & GalleryAction>((set, get) => ({
  hoveredCategories: [],
  categorySelected: null,
  setCategorySelected: (categorySelected: string | null) => set(() => ({categorySelected})),
  setHoveredCategories: (hoveredCategories: string[]) => set(() => ({hoveredCategories})),
}));
