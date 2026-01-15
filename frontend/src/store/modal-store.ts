import { create } from "zustand";

// ==================== Open Dialog Box To Search ====================

interface ModalState {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));

// ==================== Open SideBar Sheet ====================

interface SheetState {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export const useSheetStore = create<SheetState>((set) => ({
  isSheetOpen: false,
  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
}));
