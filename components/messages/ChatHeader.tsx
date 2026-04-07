import { Conversation } from "@/components/messages/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ChatHeaderProps = {
  conversation: any;
  onClose: () => void;
};

export function ChatHeader({ conversation, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback>
            {conversation.image ? (
              <img
                src={conversation.image}
                alt={conversation.providerName}
                className="size-full object-cover rounded-full"
              />
            ) : (
              conversation.avatarInitials
            )}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-base font-medium">{conversation.providerName}</p>
          <p className="text-muted-foreground text-sm">
            {conversation.specialty}
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-muted-foreground xl:hidden"
      >
        <X className="size-5" />
      </Button>
    </div>
  );
}
