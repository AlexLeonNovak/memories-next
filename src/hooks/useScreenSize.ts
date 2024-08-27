'use client';

import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleWindowSizeChange);
    handleWindowSizeChange();

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return { width, height };
};
