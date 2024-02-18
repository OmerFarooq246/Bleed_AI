import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Form from "../form";
import Bot from "../bot";

export default function Dashboard() {
  const session = useSession();
  const [showForm, setShowForm] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initializeAgent = async () => {
      const response = await fetch(
        "https://talentai-service-5oyupglq2q-uc.a.run.app/initialize-job-description-agent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setConversationId(data.conversation_id);
    };
    initializeAgent();
  }, []);

  const handleFormOption = () => {
    setShowForm(true);
  };

  const handleBotOption = () => {
    setShowForm(false);
  };

  return (
    <div className=" h-full">
      <div className=" h-full flex flex-col items-center justify-center">
        {showForm === true && <Form conversationId={conversationId} />}
        {showForm === false && (
          <div>
            <Bot conversationId={conversationId} />
          </div>
        )}
        {showForm === null && (
          <div className="flex space-x-10">
            <button
              className="p-4 rounded-full bg-yellow-300 text-xl font-bold"
              onClick={handleFormOption}
            >
              Enter Required Info
            </button>
            <button
              className="p-4 rounded-full bg-yellow-300 text-xl font-bold"
              onClick={handleBotOption}
            >
              Interact with Bot
            </button>
            <h3 className="bg-gray-100">ABC: {session.status}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
