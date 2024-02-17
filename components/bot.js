import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const Message = ({ text, from }) => (
  <div className={`mb-2 ${from === 'bot' ? 'text-gray-700' : 'text-blue-700 text-right'}`}>
    {text}
  </div>
);

export default function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load initial message from endpoint
    const initialMessage = "Hello, I'm [Agent Name], and I specialize in recruitment at [Company Name]. I understand you're looking to draft a job description for a new role in your team. Could we start by discussing the Job Title?";
    setMessages([{ text: initialMessage, from: 'bot' }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
  
    // Update messages state using functional form to ensure latest state
    setMessages((prevMessages) => [...prevMessages, { text: inputMessage, from: 'user' }]);
    setInputMessage('');
  
    // Simulate bot response
    setTimeout(() => {
      const botResponse = "Great! Let's move on to the next step.";
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, from: 'bot' }]);
    }, 500);
  };
  

  const handleNextStep = () => {
    console.log('Next step');
    router.push('/jobDescription');
  };

  return (
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
        <div className='flex space-x-5 mt-4 justify-end'>
          <button onClick={handleSendMessage} className=" bg-yellow-300 px-8 py-2 rounded-full font-bold">Send</button>
          <button onClick={handleNextStep} className=" bg-yellow-300 px-8 py-2 rounded-full font-bold">Next Step</button>
        </div>
      </div>
    </div>
  );
}
