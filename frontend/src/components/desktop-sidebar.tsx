import { IconPencilPlus, IconSearch, IconUserCircle } from "@tabler/icons-react";
import { useLogout } from "../hooks/use-auth";
import { useAuthState } from "../store/auth-store";
import { useModalStore } from "../store/modal-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const DesktopSidebar = () => {
  const user = useAuthState((s) => s.user);
  const openSearch = useModalStore((s) => s.openSearch);

  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="hidden md:flex md:w-[400px] lg:w-[450px] h-screen border-r border-gray-700 flex-col bg-dark-100">
      {/* Header Section */}
      <div className="flex flex-col py-2 px-4 gap-4 border-b border-gray-700">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <IconUserCircle className="text-gray-400" size="46" />
            <div>
              <p className="font-medium text-lg text-gray-200">{user?.username}</p>
            </div>
          </div>
          <div>
            {user?.id && (
              <div className="flex flex-row gap-4 items-center justify-center">
                <div>
                  <Button variant={"secondary"} onClick={handleLogout} size="sm">
                    Logout
                  </Button>
                </div>
                <div className="hover:cursor-pointer">
                  <IconPencilPlus
                    className="text-yellow-100 hover:text-yellow-100/80 transition-all ease-in-out active:scale-75"
                    size="24"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <form className="relative w-full mb-2">
          <IconSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search users..."
            onClick={openSearch}
            readOnly={true}
            className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
          />
        </form>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* {renderChatList()} */}
      </div>
    </div>
  );
};

export default DesktopSidebar;
