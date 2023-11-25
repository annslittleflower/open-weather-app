import { Button } from "@/ui";

const HistoryItem = () => {
  return (
    <div className="min-w-[4rem] rounded-2xl border-2 border-gray-300 flex flex-col p-2 ">
      <Button
        onClick={() => console.log("remove item")}
        className="text-right text-4xl p-0 border-0 leading-[2.25rem] self-end"
      >
        x
      </Button>
      <div>history item</div>
    </div>
  );
};

export default HistoryItem;
