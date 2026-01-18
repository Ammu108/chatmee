import { IconMenu2, IconSettingsFilled, IconUserCircle, IconX } from "@tabler/icons-react";
import { useAuthState } from "../../store/auth-store";
import { useSheetStore } from "../../store/modal-store";

interface ReceiverDataProps {
  username: string;
  receiverId: string;
}

const ChatHeader = ({ username, receiverId }: ReceiverDataProps) => {
  const { openSheet, isSheetOpen } = useSheetStore();
  const onlineUsers = useAuthState((s) => s.onlineUsers);

  return (
    <div className="flex flex-row items-center justify-between bg-dark-100 py-2 px-2 lg:px-8 sticky top-0 z-50">
      <div className="flex-row flex items-center gap-2">
        <IconUserCircle className="text-gray-400" size="42" />
        <div>
          <p className="font-medium text-base text-gray-200">{username}</p>
          {onlineUsers?.includes(receiverId) && (
            <p className="font-medium text-sm text-green-400">Online</p>
          )}
        </div>
      </div>
      <div className="flex-row flex items-center gap-2">
        <IconSettingsFilled className="text-gray-400" size="28" />
        {/* Mobile Menu Toggle Button */}
        <button type="button" onClick={openSheet} className="flex md:hidden">
          {isSheetOpen ? (
            <IconX className="text-gray-400" size={28} />
          ) : (
            <IconMenu2 className="text-gray-400" size={28} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
