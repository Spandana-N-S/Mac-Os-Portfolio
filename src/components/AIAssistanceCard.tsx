import { useState, useEffect, useRef } from "react";
import { Bot, Sparkles, X } from "lucide-react";

export const AIAssistanceCard = () => {
  const [showChat, setShowChat] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);



  return (
    <>
      <div 
        className="h-full flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setShowChat(true)}
      >
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-2">
                <Bot className="w-4 h-4 text-white" />
              </div>
<h2 className="text-lg font-bold text-foreground">Spandana Assistant</h2>
            </div>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-foreground/80 text-center">
              Ask anything about this portfolio & projects
            </p>
          </div>
          
          <button 
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Chat with Spandana
          </button>
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-border bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
<h2 className="text-xl font-bold text-foreground">Spandana Personal Assistant</h2>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Container */}
            <div className="flex-1 overflow-hidden">
              <div 
                ref={chatContainerRef}
                id="easy-peasy-bot-container" 
                className="w-full h-full"
              >
                {/* The chatbot will be embedded here */}
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-foreground">Loading Spandana Assistant...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};