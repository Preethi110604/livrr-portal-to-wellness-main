import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { Send, Bot, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Client } from "@gradio/client";

const API_URL = "ruslanmv/Medical-Llama3-v2";

const Longi = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Livrr AI, your Restorative assistant focused on longevity and wellness. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const client = await Client.connect(API_URL);
      const result = await client.predict("/chat", {
        message: inputMessage.trim(),
        system_message: "You are a Medical AI Assistant. Please be thorough and provide an informative answer. If you don't know the answer to a specific medical inquiry, advise seeking professional help.",
        max_tokens: 512,
        temperature: 0.8,
        top_p: 0.9
      });
      
      const aiMessage = {
        role: 'assistant',
        content: String(result.data) || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      toast({
        title: "Medical Insight",
        description: "New health information available!",
        variant: "default",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-livrr-beige/10">
      <CustomCursor />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-4">
              Livrr AI - Restorative Assistant
            </h1>
            <p className="text-livrr-gray-dark max-w-2xl mx-auto">
              Get personalized medical answers about health, longevity, nutrition, and fitness from our specialized healthcare AI.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-gradient-to-r from-livrr-green/10 to-livrr-blue/10">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-livrr-green to-livrr-blue w-10 h-10 rounded-full flex items-center justify-center text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-livrr-green-dark">Livrr AI - Restorative Assistant</h3>
                  <p className="text-xs text-livrr-gray-dark">Powered by advanced medical knowledge</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 ${message.role === 'user' ? 'bg-livrr-green text-white' : 'bg-gray-100 text-livrr-gray-dark'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a medical question about health and wellness..."
                  className="flex-1 p-3 rounded-lg border border-gray-200"
                  disabled={isLoading}
                />
                <button type="submit"  aria-label="Send Message" className="bg-livrr-green text-white p-3 rounded-lg hover:opacity-90" disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <strong>Note:</strong> The responses provided by Livrr AI are machine-generated and based on trained medical data. These suggestions and recommendations are not reviewed by medical professionals. Always consult a certified healthcare provider for professional medical advice.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Longi;
