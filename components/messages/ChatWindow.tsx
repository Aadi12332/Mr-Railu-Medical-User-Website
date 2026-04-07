import { Conversation } from "@/components/messages/types";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { ChatMessages } from "@/components/messages/ChatMessages";
import { MessageComposer } from "@/components/messages/MessageComposer";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { settingApi } from "@/api/setting.api";

type ChatWindowProps = {
  activeConversation?: Conversation;
  onCloseConversation: () => void;
  chatId?: string;
};

export function ChatWindow({
  activeConversation,
  onCloseConversation,
  chatId
}: ChatWindowProps) {
  if (!activeConversation) {
    return (
      <section className="flex h-full min-h-155 items-center justify-center rounded-xl border bg-card p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MessageSquare className="text-muted-foreground size-14" />
          </div>
          <p className="text-base font-medium">Select a conversation</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Choose a therapist from the list to start messaging
          </p>
        </div>
      </section>
    );
  }

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const fetchMessages = async () => {
  if (!chatId) return;

  try {
    setLoading(true);
    setError("");

    const res = await settingApi.getChatMessage("patient", chatId);

    const messagesData = res?.data?.data?.chat?.messages || [];
setMessages(messagesData);
    console.log({messages})
  } catch (err: any) {
    console.error("Get messages error:", err);
    setError("Failed to load messages");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);


  return (
    <section className="w-full flex h-full min-h-[620px] flex-col rounded-xl border bg-card">
      <ChatHeader
        conversation={activeConversation}
        onClose={onCloseConversation}
      />
      <ChatMessages messages={messages} />
      <MessageComposer chatId={activeConversation.id} />
    </section>
  );
}
