import { IconPencilPlus, IconSearch, IconUserCircle } from "@tabler/icons-react";
import { useLogout } from "../hooks/use-auth";
import { useAuthState } from "../store/auth-store";
import { useModalStore, useSheetStore } from "../store/modal-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";

const MobileSideBar = () => {
  const { logout } = useLogout();
  const user = useAuthState((s) => s.user);
  const { openSearch } = useModalStore();
  const { isSheetOpen, closeSheet } = useSheetStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent
          side="left"
          className="w-[85vw] sm:w-[400px] p-0 bg-dark-100 border-dark-200 flex flex-col"
        >
          <SheetHeader className="flex flex-col py-2 px-4 gap-2 border-b border-gray-700">
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
                      <Button variant={"secondary"} onClick={handleLogout} size="sm">
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
            <div className="relative w-full pb-2">
              <IconSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search contacts or messages"
                readOnly={true}
                onClick={openSearch}
                className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>
          </SheetHeader>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* {renderChatList()} */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Profile Icon - Always visible on mobile */}
      <div className="fixed top-4 right-4 z-40">
        <IconUserCircle className="text-gray-400" size="46" />
      </div>
    </div>
  );
};

export default MobileSideBar;
