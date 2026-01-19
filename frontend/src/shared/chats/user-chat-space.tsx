import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ChatHeader from "../../components/chat/chat-header";
import ChatMessagesList from "../../components/chat/chat-messages-list";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  NoChatsSelected,
} from "../../components/common/state-components";
import { Spinner } from "../../components/ui/spinner";
import { useFetchMessages, useReceiverDetails } from "../../hooks/use-user";
import UserChatInput from "./user-chat-input";

const UserChatSpace = () => {
  const {
    getReceiverDetails,
    data: dataReceiver,
    loading: dataLoading,
    error: dataError,
  } = useReceiverDetails();
  const {
    fetchMessages,
    data: dataMessages,
    loading: loadingMessages,
    error: MessagesError,
  } = useFetchMessages();

  const [searchParams] = useSearchParams();
  const selectedChat = searchParams.get("chat");

  useEffect(() => {
    if (selectedChat) {
      getReceiverDetails(selectedChat);
      fetchMessages(selectedChat);
    }
  }, [selectedChat, getReceiverDetails, fetchMessages]);

  if (!selectedChat) {
    return <NoChatsSelected />;
  }

  if (dataLoading) {
    return <LoadingState />;
  }

  if (dataError) {
    return <ErrorState dataError={dataError ?? "Failed to fetch users"} />;
  }

  if (!dataReceiver?.receiverData?.id) {
    return <EmptyState message="No receiver data available!" />;
  }

  if (!dataReceiver) {
    return <EmptyState message="No Chats found!" />;
  }

  return (
    <div className="bg-black h-screen relative flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* chat inbox header */}
      <ChatHeader username={dataReceiver.receiverData.username} />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {dataMessages?.conversationId ? (
          <ChatMessagesList chatMessages={dataMessages.messages} />
        ) : (
          <div>
            <p className="text-white">no chats found</p>
          </div>
        )}

        {loadingMessages && (
          <div className="flex items-center mt-10 justify-center bg-black h-screen">
            <Spinner className="text-gray-300 h-12 w-12" />
          </div>
        )}

        {MessagesError && (
          <div className="flex h-full items-start mt-6 justify-center">
            <div className="bg-dark-40 p-3 w-full m-4 rounded-md">
              <p className="font-medium text-gray-400 text-center">
                {dataError ?? "Failed to fetch users"}
              </p>
            </div>
          </div>
        )}

        {!dataMessages && (
          <div>
            <p className="text-white">nothing found</p>
          </div>
        )}
      </div>

      {/* user chat input field */}
      <div className="w-full bg-dark-100 sticky bottom-0 z-50">
        <UserChatInput receiverId={dataReceiver.receiverData.id} />
      </div>
    </div>
  );
};

export default UserChatSpace;
