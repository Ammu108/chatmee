import { IconUserCircle } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import type { UserData } from "../hooks/user-hook";

interface ChatListItemsProps {
  data: UserData | null;
  onSelectUser?: () => void;
}

const ModalOverlayItems = ({ data, onSelectUser }: ChatListItemsProps) => {
  const [, setSearchParams] = useSearchParams();

  const updateParams = () => {
    const userId = data?.searchedUser?.id;
    if (!userId) return;

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("chat", userId);
        return params;
      },
      {
        replace: true,
        preventScrollReset: true,
      },
    );
    // Call the callback to close the modal
    onSelectUser?.();
  };

  return (
    <div className="overflow-y-auto space-y-3 pr-2">
      <button
        type="button"
        onClick={updateParams}
        className="flex w-full flex-row items-center justify-between p-3 rounded-lg hover:bg-dark-40 cursor-pointer transition-colors duration-200"
      >
        <div className="flex flex-row gap-3 items-center flex-1 min-w-0">
          <div>
            <IconUserCircle className="text-gray-400 flex-shrink-0" size="46" />
          </div>
          <div className="flex flex-col items-start justify-center min-w-0 flex-1">
            <h4 className="font-semibold text-lg text-gray-200 truncate">
              {data?.searchedUser?.username || "no user"}
            </h4>
            <p className="font-medium text-sm text-gray-400 truncate">
              {data?.searchedUser?.email || "no user"}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ModalOverlayItems;
