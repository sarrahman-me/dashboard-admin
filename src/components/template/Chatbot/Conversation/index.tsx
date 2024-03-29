"use client";
import { Button, CardProduct } from "@/src/components";
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
  const [contextMap, setContextMap] = useState<any>({});
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
        context: contextMap,
      }
    );

    const { message, data, context } = responseApi.data;

    setContextMap(context);

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

    // Jika ada data produk, tambahkan data produk ke dalam chatHistory sebagai referensi
    if (data.length > 0) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          parts: JSON.stringify(data),
        },
      ]);
    }

    setInputMessage("");
    setLoading(false);
  };

  const formatText = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split(boldRegex).map((part, index) => {
      return index % 2 === 0 ? (
        <span key={index}>{part}</span>
      ) : (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      );
    });
  };

  function isJSON(str: string) {
    try {
      JSON.stringify(JSON.parse(str));
      return true;
    } catch (e) {
      return false;
    }
  }

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
                  ? "bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-white"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-white"
              } my-5`}
            >
              <div className={`py-2 pl-2 rounded`}>
                <p>
                  {isJSON(message.parts) ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {JSON.parse(message.parts).map((item: any, i: any) => (
                        <div key={i}>
                          <CardProduct product={item} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    message.parts.split("\n\n").map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-4">
                        {section.split("\n").map((row, rowIndex) => (
                          <div key={rowIndex} className="mb-2">
                            {row.trim() &&
                              (row.includes("**") ? (
                                // Teks cetak tebal di antara dua **
                                <>{formatText(row)}</>
                              ) : (
                                // Teks biasa
                                <span>{row}</span>
                              ))}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="my-3"></div>
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
