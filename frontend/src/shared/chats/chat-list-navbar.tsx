import { IconPencilPlus, IconSearch, IconUserCircle } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useLogout } from "../../hooks/auth-hook";
import { useAuthState } from "../../store/auth-store";

const ChatListNavbar = () => {
  const { logout } = useLogout();
  const user = useAuthState((s) => s.user);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col bg-dark-100 py-2 px-4 gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconUserCircle className="text-gray-400" size="46" />
          <div>
            <p className="font-medium text-lg text-gray-200">Chats</p>
          </div>
        </div>
        <div>
          {user?.id && (
            <div className="flex flex-row gap-4 items-center justify-center">
              <div>
                <Button variant={"secondary"} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className="hover:cursor-pointer">
                <IconPencilPlus
                  className="text-yellow-100 hover:text-yellow-100/80 transition-all ease-in-out active:scale-50"
                  size="22"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative w-full">
        {/* Icon */}
        <IconSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        {/* Input */}
        <Input
          placeholder="Search contacts or messages"
          className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:ring-0"
        />
      </div>
    </div>
  );
};

export default ChatListNavbar;
