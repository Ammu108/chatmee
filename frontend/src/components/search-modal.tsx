import { IconSearch } from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import { useSearchUsers } from "../hooks/use-user";
import { useModalStore } from "../store/modal-store";
import ModalOverlayItems from "./searched-list";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useModalStore();
  const { searchUsers, data, loading, error } = useSearchUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searchUsers(searchQuery);
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

    if (!data || data.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
          No chats found
        </div>
      );
    }

    return <ModalOverlayItems data={data} onSelectUser={closeSearch} />;
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
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
  );
};

export default SearchModal;
