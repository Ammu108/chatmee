import { useState } from "react";
import ResponsiveChatSidebar from "../../shared/chats/responsive-chat-sidebar";
import UserChatInput from "../../shared/chats/user-chat-input";
import UserChatNavbar from "../../shared/chats/user-chat-navbar";
import UserChatSpace from "../../shared/chats/user-chat-space";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      {/* Responsive Chat Sidebar */}
      <ResponsiveChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="z-50 sticky top-0">
          <UserChatNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <UserChatSpace />
        </div>
        <div className="z-50 sticky bottom-0 left-0 w-full">
          <UserChatInput />
        </div>
      </div>
    </div>
  );
};

export default Index;
