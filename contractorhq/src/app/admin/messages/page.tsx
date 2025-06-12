// app/admin/messages/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";

interface Message {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/contact/messages");
        const data = await res.json();
        setMessages(data.reverse());
      } catch (err) {
        console.error("Error fetching messages", err);
        toast.error("Failed to load messages"); // Error toast
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleRefresh = () => {
    toast.loading("Refreshing messages..."); // Loading toast
    window.location.reload();
  };

  return (
    <div className="bg-light p-8 rounded-xl shadow-sm border border-light">
      <div className="flex justify-between items-center">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <FiMail className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-dark">Contact Messages</h1>
          </div>
          <p className="text-gray-five">View and manage customer inquiries</p>
        </div>
        
        <Button variant="ghost" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-five">No messages found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, i) => (
            <li
              key={i}
              className="p-6 border border-gray-light rounded-lg hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-dark">
                    {msg.name}
                  </h2>
                  <p className="text-sm text-primary-dark mb-2">{msg.email}</p>
                  <p className="text-gray-7 whitespace-pre-line max-w-[800px]">
                    {msg.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
