import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
};

interface Props {
  children: React.ReactNode;
}

export const UIProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: 'UI - Adding entry', payload: isAdding });

  return (
    <UIContext.Provider
      value={{
        ...state,

        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
