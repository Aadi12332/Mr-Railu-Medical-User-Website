"use client";

import { useMemo, useState } from "react";
import { ChatWindow } from "@/components/messages/ChatWindow";
import { MessagesSidebar } from "@/components/messages/MessagesSidebar";
import { conversations } from "@/components/messages/messages-data";

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >(undefined);

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeConversationId),
    [activeConversationId],
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-medium">Messages</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Secure communication with your therapists
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* sidebar should be hidden on small screens when a convo is active */}
        <div
          className={`${activeConversationId ? "hidden" : "block"} xl:block`}
        >
          <MessagesSidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onConversationSelect={setActiveConversationId}
          />
        </div>

        {/* chat window takes full width on mobile when open, otherwise hide until a convo is selected */}
        <div
          className={`${activeConversationId ? "block" : "hidden"} xl:block`}
        >
          <ChatWindow
            activeConversation={activeConversation}
            onCloseConversation={() => setActiveConversationId(undefined)}
          />
        </div>
      </div>
    </div>
  );
}
