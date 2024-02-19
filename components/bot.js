import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Loader from "./loader";

const Message = ({ text, from }) => (
  <div className={`mb-4 flex ${from === "bot" ? "justify-start" : "justify-end"}`}>
    {from === "bot" && (
      <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-yellow-300 rounded-xl mr-2"></div>
    )}
    <div className={`p-3 rounded-xl ${from === "bot" ? "bg-gray-200" : "bg-blue-200"} text-black max-w-xl`}>
      {from === "bot" && <strong>Bot: </strong>}
      {text}
    </div>
  </div>
);


export default function Bot({ conversationId,message="" }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load initial message from endpoint
    const initialMessage =
      "Hello, I'm [Agent Name], and I specialize in recruitment at [Company Name]. I understand you're looking to draft a job description for a new role in your team. Could we start by discussing the Job Title?";
    setMessages([{ text: initialMessage, from: "bot" }]);
    if (message!=="") {
      setMessages([{ text: message, from: "bot" }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Update messages state using functional form to ensure latest state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, from: "user" },
    ]);
    setInputMessage("");
    setLoading(true);
    const url = `https://talentai-service-5oyupglq2q-uc.a.run.app/ask-job-description-agent?conversation_id=${conversationId}&query=${inputMessage}`;
    try{
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json", // Add accept header
      },
      body: JSON.stringify({}), // Empty body as per API documentation
    });
    const data = await response.json();
    console.log(data);
    const botResponse = data.response;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, from: "bot" },
    ]);
    setLoading(false);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    console.log("Next step");
    router.push(`/jobDescription/${conversationId}`);
  };

  return (
    <>
      {conversationId ? (
        <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <div className="overflow-y-scroll h-80 flex-col">
            {messages.map((message, index) => (
              <Message key={index} text={message.text} from={message.from} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border rounded-md px-3 py-2"
            />
            <div className="flex space-x-5 mt-4 justify-end">
              <button
                onClick={handleSendMessage}
                className=" bg-yellow-300 px-8 py-2 rounded-full font-bold"
              >
                {loading ? <Loader height={10} /> : "Send"}
              </button>
              <button
                onClick={handleNextStep}
                className=" bg-yellow-300 px-8 py-2 rounded-full font-bold"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
