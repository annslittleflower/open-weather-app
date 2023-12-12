import { IconX } from '@tabler/icons-react';
import { Button } from '@/common/ui';

type Props = {
  city: string;
  setCity: (city: string) => void;
  deleteCity: (city: string) => void;
};

const HistoryItem = ({ city, setCity, deleteCity }: Props) => {
  const updateURL = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('city', city);
    window.history.pushState({}, '', url);

    setCity(city);
  };

  return (
    <div
      role="button"
      onKeyDown={updateURL}
      tabIndex={0}
      onClick={updateURL}
      className="cursor-pointer bg-blue-200  hover:bg-blue-400 hover:text-gray-200 min-w-[10rem] max-w-[16rem] rounded-2xl border-2 border-gray-300 flex justify-center flex-row-reverse lg:flex-col p-2 lg:p-4"
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteCity(city);
        }}
        className="text-right p-0 border-0 self-end ml-1 lg:ml-0 lg:mb-4"
        title="delete search item "
      >
        <IconX className="h-6 w-6 hover:ring-2" />
      </Button>
      {city}
    </div>
  );
};

export default HistoryItem;
