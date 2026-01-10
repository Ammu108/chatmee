import { IconPencilPlus, IconSearch, IconUserCircle, IconX } from "@tabler/icons-react";
import { useState } from "react";
import ModalOverlayItems from "../../components/modal-list-items";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Sheet, SheetContent, SheetHeader } from "../../components/ui/sheet";
import { Spinner } from "../../components/ui/spinner";
import { useLogout } from "../../hooks/auth-hook";
import { useFindUserByUsername } from "../../hooks/user-hook";
import { useAuthState } from "../../store/auth-store";

interface ResponsiveChatSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ResponsiveChatSidebar = ({ isOpen, setIsOpen }: ResponsiveChatSidebarProps) => {
  const { logout } = useLogout();
  const user = useAuthState((s) => s.user);
  const [searchQuery, setSearchQuery] = useState("");
  const { findUserByUsername, data, loading, error } = useFindUserByUsername();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await findUserByUsername(searchQuery);
    } catch (error) {
      console.log("failed to get user!", error);
    }
  };

  const renderChatList = () => {
    if (loading) {
      return (
        <div className="flex h-full items-start mt-10 justify-center">
          <Spinner className="text-gray-300 h-12 w-12" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-full items-start mt-6 justify-center">
          <div className="bg-dark-40 p-3 w-full m-4 rounded-md">
            <p className="font-medium text-gray-400 text-center">
              {error ?? "Failed to fetch users"}
            </p>
          </div>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
          No chats found
        </div>
      );
    }

    return <ModalOverlayItems data={data} onSelectUser={() => setOpenDialog(false)} />;
  };

  const clearInputField = () => {
    setSearchQuery("");
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ screens */}
      <div className="hidden md:flex md:w-[400px] lg:w-[450px] h-screen border-r border-gray-700 flex-col bg-dark-100">
        {/* Header Section */}
        <div className="flex flex-col py-2 px-4 gap-4 border-b border-gray-700">
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
                      className="text-yellow-100 hover:text-yellow-100/80 transition-all ease-in-out active:scale-75"
                      size="24"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSearchQuery} className="relative w-full mb-2">
            <IconSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Search users..."
              readOnly={true}
              onClick={() => setOpenDialog(true)}
              className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
            />
          </form>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {renderChatList()}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                  className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:ring-0"
                />
                {searchQuery.length > 0 && (
                  <IconX
                    onClick={clearInputField}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
                  />
                )}
              </div>
            </SheetHeader>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderChatList()}
            </div>
          </SheetContent>
        </Sheet>

        {/* Profile Icon - Always visible on mobile */}
        <div className="fixed top-4 right-4 z-40">
          <IconUserCircle className="text-gray-400" size="46" />
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-dark-100 border-none"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-300">Find Users</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSearchQuery} className="flex-1 overflow-hidden flex flex-col">
            <div className="relative mb-6">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search users..."
                name="text"
                type="text"
                value={searchQuery}
                onChange={onchangeHandler}
                className="bg-dark-40 py-5 pl-11 border-none text-gray-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {renderChatList()}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResponsiveChatSidebar;
