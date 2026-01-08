import { IconMenu2, IconSettingsFilled, IconUserCircle, IconX } from "@tabler/icons-react";

interface UserChatNavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const UserChatNavbar = ({ isOpen, setIsOpen }: UserChatNavbarProps) => {
  return (
    <div className="flex flex-row items-center justify-between bg-dark-100 py-2 px-2 lg:px-8">
      <div className="flex-row flex items-center gap-2">
        <IconUserCircle className="text-gray-400" size="42" />
        <div>
          <p className="font-medium text-base text-gray-200">Stefan Salvatore</p>
          <p className="font-medium text-xs text-green-500">Online</p>
        </div>
      </div>
      <div className="flex-row flex items-center gap-2">
        <IconSettingsFilled className="text-gray-400" size="28" />
        {/* Mobile Menu Toggle Button */}
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex md:hidden">
          {isOpen ? (
            <IconX className="text-gray-400" size={28} />
          ) : (
            <IconMenu2 className="text-gray-400" size={28} />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserChatNavbar;
