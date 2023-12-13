/* eslint-disable import/prefer-default-export */
export const twoArraysAreEqual = (
  array1: string[] | number[],
  array2: string[] | number[]
) : boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((element: string | number, index: number) => element === array2[index]);
};
