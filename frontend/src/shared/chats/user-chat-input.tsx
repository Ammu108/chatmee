import { IconSend2 } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const UserChatInput = () => {
  return (
    <div className="w-full p-6 bg-dark-100">
      <div className="flex flex-row w-full gap-4">
        <Input placeholder="Type a messages" className="flex-1 h-auto text-white" />
        <Button variant="secondary" size="icon" className="opacity-50">
          <IconSend2 className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default UserChatInput;
