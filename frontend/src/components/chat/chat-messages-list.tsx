import { useAuthState } from "../../store/auth-store";

interface ChatMessagesProps {
  chatMessages: {
    id: string;
    sender_id: string;
    content: string;
    createdAt: string;
    conversation_id: string;
    // isRead: boolean;
  }[];
}

const ChatMessagesList = ({ chatMessages }: ChatMessagesProps) => {
  const user = useAuthState((s) => s.user);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
      {chatMessages.map((message) => {
        const isMine = user?.id === message.sender_id;

        return (
          <div
            key={message.id}
            className={`flex gap-3 ${isMine ? "flex-row-reverse" : "justify-start"}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
            <div
              className={`chat-bubble max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                isMine
                  ? "bg-primary-100/50 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessagesList;
