import ChatListNavbar from "../../shared/chats/chat-list-navbar";
import ChatListSideBar from "../../shared/chats/chat-list-sideBar";
import UserChatInput from "../../shared/chats/user-chat-input";
import UserChatNavbar from "../../shared/chats/user-chat-navbar";
import UserChatSpace from "../../shared/chats/user-chat-space";

const Index = () => {
  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex flex-col h-screen">
        <div className="z-50">
          <ChatListNavbar />
        </div>
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <ChatListSideBar />
        </div>
      </div>
      <div className="w-full flex flex-col h-screen">
        <div className="z-50 sticky top-0">
          <UserChatNavbar />
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
