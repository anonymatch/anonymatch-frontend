"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MoreVertical, Mic, Smile, Send } from "lucide-react";
import { useRouter } from "next/navigation"; // Usage: App router
import BackButton from "@/components/BackButton";

export default function Component() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dorian",
      content: "Hey, looking forward to our date!",
      timestamp: "12:30 PM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Me too! Can't wait to see you.",
      timestamp: "12:31 PM",
      isMe: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "Me",
          content: message,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: true,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* BACK BUTTON */}
            <BackButton />
            <span className="font-semibold">Chat</span>
          </div>
          <button className="p-2">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white px-4 py-6 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="/assets/users/dorian.webp"
              alt="Dorian"
            />
            <AvatarFallback>EJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">Dorian</h1>
            <p className="text-sm text-gray-500">@dorian</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className="flex gap-2 max-w-[80%]">
              {!msg.isMe && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={msg.sender}
                  />
                  <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.isMe
                    ? "bg-[#FF4081] text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.isMe ? "text-pink-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
              {msg.isMe && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Me"
                  />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-gray-500"
          >
            <Mic className="h-6 w-6" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 rounded-full bg-gray-100 border-0"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-gray-500"
          >
            <Smile className="h-6 w-6" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="bg-[#FF4081] hover:bg-[#FF6B6B] text-white rounded-full"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
