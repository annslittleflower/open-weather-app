import { createPortal } from "react-dom";
// import { useEffect, useState, Fragment } from "react";
import { Button } from "..";
import { TimeoutDelete } from "@/components";

type Props = {
  citiesForDeletion: string[];
  handleUndo: (c: string) => void;
};

const PopupWrapper = ({ citiesForDeletion = [], handleUndo }: Props) => {
  return createPortal(
    <div className="fixed bottom-2 left-4 overflow-auto max-w-[20rem] max-h-[80%]">
      {citiesForDeletion.map((city) => (
        <TimeoutDelete key={city}>
          <div className="bg-gray-50 p-4 flex items-center justify-between">
            {city} removed
            <Button
              onClick={() => handleUndo(city)}
              className="p-1 ml-4 hover:bg-blue-400 hover:hover:text-gray-200"
            >
              undo
            </Button>
          </div>
        </TimeoutDelete>
      ))}
    </div>,
    document.body
  );
};

export default PopupWrapper;
