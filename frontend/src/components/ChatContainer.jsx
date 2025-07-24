import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  // Auto scroll when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div key={messages._id} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || "/avatar.png"
                      : selectedUser.profilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              {/* <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time> */}
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        {/* 👇 place the ref here */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
