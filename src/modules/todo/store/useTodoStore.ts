import { create } from "zustand";

type Filter = "all" | "active" | "completed";

type Store = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const useTodoStore = create<Store>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));