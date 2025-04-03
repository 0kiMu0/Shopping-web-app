import { create } from "zustand";

type Item = {
  id: number;
  name: string;
  description: string;
};

type StoreState = {
  items: Item[];
  addItem: (item: Item) => void;
  editItem: (item: Item) => void;
  deleteItem: (id: number) => void;
  getItem: (id: number) => Item | undefined;
};

export const useStore = create<StoreState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  editItem: (item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),

  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  getItem: (id) => {
    const state = get();  
    return state.items.find((item) => item.id === id);
  },
}));
