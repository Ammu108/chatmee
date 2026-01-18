import { useEffect } from "react";
import { useLogout } from "../hooks/use-auth";
import { useFetchConversation } from "../hooks/use-user";
import { useAuthState } from "../store/auth-store";
import { useModalStore } from "../store/modal-store";
import { EmptyState, ErrorState, LoadingState } from "./common/state-components";
import ConversatinCard from "./conversation-card";
import SideBarHeader from "./sidebar/sidebar-header";

const DesktopSidebar = () => {
  const user = useAuthState((s) => s.user);
  const openSearch = useModalStore((s) => s.openSearch);

  const { logout } = useLogout();
  const { fetchConversation, data, loading, error } = useFetchConversation();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (user && data.length === 0) {
      fetchConversation();
    }
  }, [fetchConversation, user, data]);

  const onlineUsers = useAuthState((s) => s.onlineUsers);

  // console.log("Online users are: ", onlineUsers);

  const renderConversationList = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState dataError={error ?? "Failed to load conversations."} />;
    }

    if (data.length === 0) {
      return <EmptyState message="No Chats found." />;
    }

    return <ConversatinCard data={data} onlineUsers={onlineUsers} />;
  };

  return (
    <div className="hidden md:flex md:w-[400px] lg:w-[450px] h-screen border-r border-gray-700 flex-col bg-dark-100">
      {/* Header Section */}
      <SideBarHeader
        userId={user?.id || ""}
        username={user?.username || ""}
        handleLogout={handleLogout}
        openSearch={openSearch}
      />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {renderConversationList()}
      </div>
    </div>
  );
};

export default DesktopSidebar;
