"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Menu, User, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD6Himsr4zJhmU-wFF2KDh9dcoFALQ0GYI');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm JARVIS, your advanced AI assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Try the API call, but if it fails due to model unavailability, use a fallback
      // Create a conversation history for context
      const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      const prompt = `\n\nuser: ${input}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      const aiResponse = {
        role: 'assistant',
        content: text
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
      }
      
      // Check if it's a model not found error and provide a more helpful message
      const errorMessageStr = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessageStr.includes('404') || errorMessageStr.includes('not found')) {
        // Simulate a response for model not found errors
        const simulatedResponses = [
          "I'm JARVIS, your AI assistant. It seems there's an issue with my connection to the AI service. Please make sure the Google Generative Language API is enabled in your Google Cloud project and that your API key has proper permissions.",
          "Hello! I'm JARVIS. Currently experiencing issues connecting to my AI backend. Please check that the Gemini API is properly configured in your Google Cloud project.",
          "I'm your JARVIS assistant. The API connection seems to have an issue. Ensure your Google Cloud project has the Generative Language API enabled.",
          "Greetings! I'm JARVIS. There's a configuration issue with my AI service. Please verify your API key permissions in the Google Cloud Console."
        ];
        
        const aiResponse = {
          role: 'assistant',
          content: simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)]
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorMessageStr}`
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <button className="w-full flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
            <Plus className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-200">New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Today
            </div>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors">
              <div className="text-sm font-medium text-zinc-200 truncate">Current Chat</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
          <div className="flex items-center gap-3">
            <button className="lg:hidden">
              <Menu className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-zinc-100">JARVIS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors">
              Go to Home
            </a>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <User className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-8 ${
                  message.role === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div className={`flex gap-4 max-w-full ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-600'
                      : 'bg-gradient-to-br from-purple-600 to-pink-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-900 text-zinc-100 border border-zinc-800'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-8 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="relative flex items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI Assistant..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none resize-none px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 max-h-32"
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
                  input.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-zinc-600 text-center mt-2">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}