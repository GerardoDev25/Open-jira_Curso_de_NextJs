import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Adding entry'; payload: boolean }
  | { type: 'UI - Start Draging' }
  | { type: 'UI - End Draging' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return { ...state, sidemenuOpen: true };
    case 'UI - Close Sidebar':
      return { ...state, sidemenuOpen: false };
    case 'UI - Adding entry':
      return { ...state, isAddingEntry: action.payload };
    case 'UI - Start Draging':
      return { ...state, isDraging: true };
    case 'UI - End Draging':
      return { ...state, isDraging: false };
    default:
      return state;
  }
};
