import React, { useState } from "react";
import ChatbotHeaderCard from "./components/ChatbotHeaderCard";
import ChatbotMessagesCard from "./components/ChatbotMesagesCard";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      message: `
      Selamat datang di Perpustakaan! 👋
      <ul>
        <li>Saya siap membantu Anda mencari buku, jurnal, dan skripsi.</li>
        <li>Mulai dengan bertanya, rekomendasiin aku buku dong!</li>
      </ul>
      Silakan ketik pertanyaan Anda!`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const sentRequestToChatBotAI = async (userMessage, histories) => {
    try {
      setLoading(true);
      const lowerCaseMessage = userMessage.toLowerCase();
      console.log(lowerCaseMessage, "<----sentRequestToChatBotAI");
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messageRequestFromClient: lowerCaseMessage,
          history: histories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (!response.ok) {
        console.log(responseJson.message || "Error occurred");
      }

      console.log(response, "response from api/chatbot");

      setLoading(false);
      return responseJson; // Assuming the API returns a 'reply' field
    } catch (error) {
      console.log(error, "<--- sentRequestToApiChatbot");
      setLoading(false);
      return "An error occurred"; // Return a fallback message
    }
  };

  const handleTagClick = (tagText) => {
    setInputMessage(tagText);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
    if (!agreePrivacy) {
      alert(
        "Anda harus menyetujui kebijakan privasi untuk menggunakan fitur chat."
      );
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      message: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    console.log(newMessage, "<-----sendMessage");
    // array messages baru dan messages sebelumnya
    const bulkMessages = [...messages, newMessage];
    const formattedHistory = bulkMessages.map((message) => {
      if (message.sender === "bot") {
        return { role: "model", parts: [{ text: message.message }] };
      } else {
        return { role: "user", parts: [{ text: message.message }] };
      }
    });
    console.log(formattedHistory, "histories");

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    // setTimeout(async () => {
    const botReply = await sentRequestToChatBotAI(
      newMessage.message,
      JSON.stringify(formattedHistory)
    );
    console.log(botReply, "botReply");

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: "bot",
        message:
          botReply &&
          botReply.response &&
          typeof botReply.response.message === "string"
            ? botReply.response.message
            : botReply && typeof botReply.response === "string"
            ? botReply.response
            : "Harap ulangi beberapa saat lagi, reload browser jika perlu",
        results:
          botReply &&
          botReply.response &&
          Array.isArray(botReply.response.result)
            ? botReply.response.result
            : [],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type:
          botReply &&
          botReply.response &&
          typeof botReply.response.type === "string"
            ? botReply.response.type
            : "unidentified",
      },
    ]);

    // }, 1000);
  };

  return (
    <div className="w-full">
      <ChatbotHeaderCard onTagClick={handleTagClick} />

      <ChatbotMessagesCard
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        agreePrivacy={agreePrivacy}
        setAgreePrivacy={setAgreePrivacy}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
};

export default App;
