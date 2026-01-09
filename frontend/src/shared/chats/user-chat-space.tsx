import {
  IconMenu2,
  IconSettingsFilled,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../../components/ui/spinner";
import { useReceiverDetails } from "../../hooks/user-hook";

interface UserChatNavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const UserChatSpace = ({ isOpen, setIsOpen }: UserChatNavbarProps) => {
  const MESSAGES = [
    { id: 1, text: "Hey! How are you doing?", sender: "user" },
    {
      id: 2,
      text: "I'm doing great! How can I help you today?",
      sender: "bot",
    },
    { id: 3, text: "Just wanted to chat and see what's new", sender: "user" },
    {
      id: 4,
      text: "That sounds fun! Feel free to ask me anything.",
      sender: "bot",
    },
  ];

  const { getReceiverDetails, data, loading, error } = useReceiverDetails();

  const [searchParams] = useSearchParams();
  const selectedChat = searchParams.get("chat");

  useEffect(() => {
    if (selectedChat) {
      getReceiverDetails(selectedChat);
    }
  }, [selectedChat, getReceiverDetails]);

  if (!selectedChat) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl font-medium">
          Select a chat to start message.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center mt-10 justify-center bg-black h-screen">
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

  return (
    <div className="bg-black h-screen relative flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* chat inbox header */}
      <div className="flex  flex-row items-center justify-between bg-dark-100 py-2 px-2 lg:px-8 sticky top-0 z-50">
        <div className="flex-row flex items-center gap-2">
          <IconUserCircle className="text-gray-400" size="42" />
          <div>
            <p className="font-medium text-base text-gray-200">
              {data.receiverData?.username}
            </p>
            <p className="font-medium text-xs text-green-500">Online</p>
          </div>
        </div>
        <div className="flex-row flex items-center gap-2">
          <IconSettingsFilled className="text-gray-400" size="28" />
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden"
          >
            {isOpen ? (
              <IconX className="text-gray-400" size={28} />
            ) : (
              <IconMenu2 className="text-gray-400" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {MESSAGES.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : "justify-start"
            }`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
            <div
              className={`chat-bubble max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary-100/50 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChatSpace;
