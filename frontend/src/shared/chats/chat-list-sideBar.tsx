import { IconUserCircle } from "@tabler/icons-react";
import { DUMMY_USER_DATA } from "../../lib/constant";

const ChatListItems = () => {
  return (
    <div className="bg-dark-100 p-4 space-y-3 overflow-y-auto h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {DUMMY_USER_DATA.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-row items-center justify-between p-3 rounded-lg hover:bg-dark-200 cursor-pointer transition-colors duration-200"
        >
          <div className="flex flex-row gap-3 items-center flex-1 min-w-0">
            <div>
              <IconUserCircle className="text-gray-400 flex-shrink-0" size="46" />
            </div>
            <div className="flex flex-col items-start justify-center min-w-0 flex-1">
              <h4 className="font-semibold text-lg text-gray-200 truncate">{item.name}</h4>
              <p className="font-regular text-sm text-gray-400 truncate">{item.message}</p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <p className="text-xs font-regular text-gray-400 whitespace-nowrap">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListItems;
