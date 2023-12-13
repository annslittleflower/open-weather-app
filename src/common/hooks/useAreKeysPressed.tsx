import { useState, useEffect } from 'react';
import KEY_CODES from '@/common/constants/keys';
import { twoArraysAreEqual } from '@/common/utils/arrays';

type Props = {
  watchKeys: (keyof typeof KEY_CODES)[] | string[];
  // TODO for exercising make string[] as single char[]
  callback: () => void
};

const useAreKeysPressed = (watchKeys: Props['watchKeys'], callback: Props['callback']) => {
  const [arePressed, setArePressed] = useState<string[]>([]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const setOfPressed = new Set([...arePressed, event.key]);
      const newPressed = Array.from(setOfPressed);

      setArePressed(newPressed);

      if (twoArraysAreEqual(watchKeys, newPressed)) {
        callback();
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      setArePressed((prev) => prev.filter((el) => el !== event.key));
    };

    document.addEventListener('keyup', handleKeyup);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [watchKeys, arePressed, setArePressed, callback]);
};

export default useAreKeysPressed;
