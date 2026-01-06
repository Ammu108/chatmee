import { IconSettingsFilled, IconUserCircle } from "@tabler/icons-react";

const UserChatNavbar = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-dark-100 py-2 px-8">
      <div className="flex-row flex items-center gap-2">
        <IconUserCircle className="text-gray-400" size="46" />
        <div>
          <p className="font-medium text-base text-gray-200">Stefan Salvatore</p>
          <p className="font-medium text-xs text-green-500">Online</p>
        </div>
      </div>
      <div>
        <IconSettingsFilled className="text-gray-400" size="28" />
      </div>
    </div>
  );
};

export default UserChatNavbar;
