import { IconUserCircle } from "@tabler/icons-react";
import type { UserData } from "../../hooks/user-hook";

interface ChatListItemsProps {
  data: UserData | null;
}

const ChatListItems = ({ data }: ChatListItemsProps) => {
  return (
    <div className="bg-dark-100 p-4 space-y-3 overflow-y-auto h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-row items-center justify-between p-3 rounded-lg hover:bg-dark-40 cursor-pointer transition-colors duration-200">
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
        <div className="flex-shrink-0 ml-2">
          {/* <p className="text-xs font-regular text-gray-400 whitespace-nowrap">
              {item.time}
            </p> */}
        </div>
      </div>
    </div>
  );
};

export default ChatListItems;
