import React, { useState } from 'react';

import { LoadingOverlayContext } from './loading-overlay-context';

export const LoadingOverlayProvider = (props: React.PropsWithChildren<{}>) => {

  const [isActivity, setIsActivity] = useState<boolean>(false);
  const [overlayText, setOverlayText] = useState<string>('');

  return (
    <LoadingOverlayContext.Provider value={{
        isActivity: isActivity,
        overlayText: overlayText,
        setIsActivity: setIsActivity,
        setOverlayText: setOverlayText,
    }}>
      { props.children }
    </LoadingOverlayContext.Provider>
  );

}
