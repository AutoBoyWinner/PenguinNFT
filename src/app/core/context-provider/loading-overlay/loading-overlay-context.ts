import { createContext, useContext } from 'react';

export type LoadingOverLayType = {
  isActivity: boolean,
  overlayText: string
  setIsActivity: (isActivity: boolean) => void;
  setOverlayText: (overlayText: string) => void;
}

export const LoadingOverlayContext = createContext<LoadingOverLayType>({
  isActivity: false,
  overlayText: '',
  setIsActivity: (isActivity: boolean) => {},
  setOverlayText: (overlayText: string) => {},
});

export const useOverlay = () => useContext(LoadingOverlayContext);