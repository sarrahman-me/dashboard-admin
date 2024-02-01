"use client";
import { Button } from "@/src/components";
import { PostDataApi } from "@/src/utils";
import React, { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface Message {
  role: string;
  parts: string;
}

const ChatbotConversation: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>(
    [] as { role: string; parts: string }[]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (inputMessage.trim() === "") return;

    const responseApi = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/tilebot/conversation`,
      {
        chatHistory,
        message: inputMessage,
      }
    );

    const { message, data } = responseApi.data;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: "user",
        parts: inputMessage,
      },
    ]);

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: "model",
        parts: message,
      },
    ]);

    setInputMessage("");
    setLoading(false);
  };

  return (
    <div>
      {/* conversation */}
      <div className="dark:bg-gray-800 bg-white p-4 border rounded shadow">
        <div className="mb-4 sticky top-0">
          <p className="text-lg font-bold">Sarahman Chat</p>
        </div>
        <div className="border-t border-b border-gray-300 py-4 max-h-screen overflow-y-auto">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role === "user"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-lime-200 text-gray-700"
              } my-5`}
            >
              <span className={` py-2 px-4 rounded`}>{message.parts}</span>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="mt-4 flex sticky bottom-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-2 border rounded text-black bg-white mr-1"
            placeholder="Ketik pesan..."
          />
          <Button
            icon={<FaWandMagicSparkles />}
            loading={loading}
            type="submit"
          >
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotConversation;
