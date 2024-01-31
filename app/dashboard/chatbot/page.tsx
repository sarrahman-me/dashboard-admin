"use client";
import { Button } from "@/src/components";
import { ChatbotConversation } from "@/src/components/template";
import { PostDataApi } from "@/src/utils";
import React, { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";

const Chatbot: React.FC = () => {
  const [generatedData, setGeneratedData] = useState<{
    input: string;
    output: string;
  }>({ input: "", output: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendGenerated = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (generatedData.input.trim() === "") return;

    const responseApi = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/tilebot/generate-text`,
      {
        message: generatedData.input,
      }
    );

    setGeneratedData({
      input: generatedData.input,
      output: responseApi.jawaban,
    });
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

  return (
    <div className="space-y-2">
      {/* conversation */}
      <ChatbotConversation />

      <div className="dark:bg-gray-800 bg-white p-4 border rounded shadow">
        <div className="mb-4">
          <p className="text-lg font-bold">Sarrahman Generated</p>
        </div>

        {/* modified output */}
        <div className="border-t border-b border-gray-300 py-4 max-h-screen overflow-y-auto">
          {generatedData.output.split("\n\n").map((section, sectionIndex) => (
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
          ))}
        </div>

        <form onSubmit={handleSendGenerated} className="mt-4 flex">
          <input
            type="text"
            value={generatedData.input}
            onChange={(e) =>
              setGeneratedData({
                input: e.target.value,
                output: generatedData.output,
              })
            }
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

export default Chatbot;
