import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDraging: false,
};

interface Props {
  children: React.ReactNode;
}

export const UIProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const startDraging = () => dispatch({ type: 'UI - Start Draging' });

  const endtDraging = () => dispatch({ type: 'UI - End Draging' });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: 'UI - Adding entry', payload: isAdding });

  return (
    <UIContext.Provider
      value={{
        ...state,

        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,

        startDraging,
        endtDraging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
