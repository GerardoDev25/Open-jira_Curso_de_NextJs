import { createContext } from 'react';

export interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;

  isAddingEntry: boolean;
  setIsAddingEntry: (isAdding: boolean) => void;

  isDraging: boolean;
  startDraging: () => void;
  endtDraging: () => void;
}

export const UIContext = createContext({} as ContextProps);
