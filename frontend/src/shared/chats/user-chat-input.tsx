import { IconSend2 } from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useSendMessages } from "../../hooks/user-hook";
import type { Message } from "../../types/message";

interface UserChatInputProps {
  receiverId: string;
  onMessageSent?: (message: Message) => void;
}

const UserChatInput = ({ receiverId, onMessageSent }: UserChatInputProps) => {
  const [message, setMessage] = useState("");

  const { sendMessage, loading, error } = useSendMessages();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const res = await sendMessage(receiverId, message);

    console.log("result", res);

    if (res) {
      onMessageSent?.(res.data);
      setMessage("");
    }
  };

  return (
    <div className="w-full p-6 bg-dark-100">
      <div className="flex flex-row w-full gap-4">
        <Input
          name="message"
          type="text"
          value={message}
          onChange={handleChange}
          disabled={loading}
          placeholder="Type a messages"
          className="flex-1 h-auto text-white"
        />
        <Button
          variant="secondary"
          size="icon"
          onClick={handleSend}
          disabled={loading || !message.trim()}
        >
          <IconSend2 className="text-white" />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UserChatInput;
