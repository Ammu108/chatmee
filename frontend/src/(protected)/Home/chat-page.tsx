import ResponsiveChatSidebar from "../../shared/chats/responsive-chat-sidebar";
import UserChatSpace from "../../shared/chats/user-chat-space";

const Index = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      {/* Responsive Chat Sidebar */}
      <ResponsiveChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <UserChatSpace />
        </div>
      </div>
    </div>
  );
};

export default Index;
