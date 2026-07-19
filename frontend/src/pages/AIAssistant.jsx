import { useState } from "react";
import { FaRobot, FaPaperPlane, FaMicrophoneAlt, FaLightbulb } from "react-icons/fa";
import "./AIAssistant.css";
import aiResponses from "../Data/aiResponses";

const initialMessages = [
  { id: 1, sender: "assistant", text: "Welcome to the AI Health Assistant. Ask anything about appointments, doctors, or patient care." },
];

function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = input.trim();

  const ai = getAIResponse(userMessage);

  const aiText = `
${ai.title}

${ai.message}

Recommended Doctor: ${ai.doctor}

Tips:
• ${ai.tips.join("\n• ")}
`;

  const nextMessages = [
    ...messages,
    {
      id: Date.now(),
      sender: "user",
      text: userMessage,
    },
    {
      id: Date.now() + 1,
      sender: "assistant",
      text: aiText,
    },
  ];

  setMessages(nextMessages);
  setInput("");
};

  const getAIResponse = (message) => {
  const text = message.toLowerCase();

  for (const item of aiResponses) {
    if (item.keywords.some(keyword => text.includes(keyword))) {
      return item.response;
    }
  }

  return {
    title: "General Recommendation",
    message:
      "I'm sorry. I couldn't understand your symptoms. Please describe them in more detail or consult a General Physician.",
    doctor: "General Physician",
    tips: [
      "Provide more information.",
      "Visit a nearby hospital if symptoms are severe.",
      "Book an appointment for further evaluation."
    ]
  };
};

  return (
    <div className="assistant-page">
      <div className="assistant-hero glass-card">
        <div>
          <p className="eyebrow">AI Support</p>
          <h1>Health assistant</h1>
          <p>Use the intelligent chat assistant for quick guidance on scheduling, medical workflows, or hospital operations.</p>
        </div>
        <div className="assistant-helper">
          <FaRobot className="assistant-icon" />
          <div>
            <h2>Ask a clinical question</h2>
            <p>AI can help summarize patient steps, appointment options, and staff coordination.</p>
          </div>
        </div>
      </div>

      <div className="assistant-chat">
        <div className="assistant-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.sender}`}>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        <div className="assistant-input-row">
          <button className="icon-btn">
            <FaMicrophoneAlt />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant..."
          />
          <button className="send-btn" onClick={sendMessage}>
            <FaPaperPlane /> Send
          </button>
        </div>
      </div>

      <div className="assistant-quickcards">
        <div className="quick-card glass-card">
          <FaLightbulb className="quick-icon" />
          <h3>Appointment tips</h3>
          <p>Ask how to prioritize appointments and reduce patient wait time.</p>
        </div>
        <div className="quick-card glass-card">
          <FaLightbulb className="quick-icon" />
          <h3>Doctor availability</h3>
          <p>Get quick advice on matching specialists with patient conditions.</p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
