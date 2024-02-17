import React, { useState } from "react";
import Form from "../form";
import Bot from "../bot";

export default function Dashboard() {
    const [showForm, setShowForm] = useState(null);

    const handleFormOption = () => {
        setShowForm(true);
    };

    const handleBotOption = () => {
        setShowForm(false);
    };

    return (
        <div className="hero h-full">
            <div className="front-hero h-full flex flex-col items-center justify-center">
                {showForm === true && <Form />}
                {showForm === false && (
                    <div >
                        <Bot />
                    </div>
                )}
                {showForm === null && (
                    <div className="flex space-x-10">
                        <button 
                        className="p-4 rounded-full bg-yellow-300 text-xl font-bold"
                        onClick={handleFormOption}>Enter Required Info</button>
                        <button
                        className="p-4 rounded-full bg-yellow-300 text-xl font-bold"
                        onClick={handleBotOption}>Interact with Bot</button>
                    </div>
                )}
            </div>
        </div>
    );
}
