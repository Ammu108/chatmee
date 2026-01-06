const UserChatSpace = () => {
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

  return (
    <div className="bg-black h-screen flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
