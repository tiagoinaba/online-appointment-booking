import { type Tabs } from "@/components/admin/SideNav";
import { create } from "zustand";

type useActiveTabStoreTypes = {
  active: Tabs | null;
  setActive: (active: Tabs | null) => void;
};

export const useActiveTabStore = create<useActiveTabStoreTypes>((set) => ({
  active: null,
  setActive: (active) => set((state) => ({ ...state, active })),
}));
